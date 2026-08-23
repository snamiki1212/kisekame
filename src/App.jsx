import { Fragment, useEffect, useState } from "react";
import { CAMERAS, PAPER_SIZES } from "./data/cameras";
import {
  COLOR_TEMPLATES,
  createColorAsset,
  createPatternAsset,
  PATTERN_TEMPLATES,
} from "./data/starterPatterns";
import { SkinCanvas } from "./components/SkinCanvas";
import { ImageUploader } from "./components/ImageUploader";
import { getBestPrintLayout, PrintSheet } from "./components/PrintSheet";
import { detectLanguage, SUPPORTED_LANGUAGES, TRANSLATIONS } from "./data/translations";
import styles from "./App.module.css";

const DEFAULT_IMAGE_POS = { x: 0, y: 0, scale: 1, repeat: true };
const DEFAULT_PATTERN_POS = { ...DEFAULT_IMAGE_POS, repeat: false };
const KISEKAME_PINK = "#df4385";
const KISEKAME_LOGO = createPatternAsset("kisekame", KISEKAME_PINK, "#ffe7f1");
const RANDOM_PATTERN_COLORS = ["#df4385", "#97cd3f", "#b82f63", "#3157a4", "#147d74", "#184d3b", "#c6b4e9", "#20263a"];
const RANDOM_PATTERN_BACKGROUNDS = ["#ffe7f1", "#eaf6d5", "#ffc2d1", "#ffe08a", "#86d3e8", "#c6b4e9"];
const RANDOM_PATTERNS = PATTERN_TEMPLATES.filter((asset) => asset.patternId !== "kisekame");
const INFO_PAGES = { about: "About KISEKAME", camera: "About the Optio RS1500", guide: "How to use & print" };
const normalizeInfoPage = (page) => page === "print" ? "guide" : page;
const CAMERA_DETAILS = [
  {
    id: "rs1500", name: "PENTAX Optio RS1500", available: true,
    description: "rs1500Body", specs: "rs1500Specs",
    products: [
      ["rs1500English", "https://www.ricoh-imaging.co.jp/english/products/optio-rs1500/"],
      ["rs1500Japanese", "https://www.ricoh-imaging.co.jp/japan/products/optio-rs1500/"],
    ],
    sheets: [
      ["sheetCollection", "https://www.ricoh-imaging.co.jp/japan/support/download/digital/skin_collection_rs1500.html"],
      ["gloomySheets", "https://www.ricoh-imaging.co.jp/japan/products/optio-rs1500/changestyle_gloomy.html"],
      ["galsSheets", "https://www.ricoh-imaging.co.jp/japan/products/optio-rs1500/changestyle_gals.html"],
    ],
  },
  {
    id: "rs1000", name: "PENTAX Optio RS1000", available: true,
    description: "rs1000Body", specs: "rs1000Specs",
    products: [
      ["rs1000English", "https://www.ricoh-imaging.co.jp/english/products/optio-rs1000/feature.html"],
      ["rs1000Japanese", "https://www.ricoh-imaging.co.jp/japan/products/optio-rs1000/feature.html"],
    ],
    sheets: [
      ["rs1000SheetCollection", "https://www.ricoh-imaging.co.jp/japan/support/download/digital/skin_collection.html"],
      ["rs1000CollaborationSheets", "https://www.ricoh-imaging.co.jp/japan/support/download/digital/skin.html"],
    ],
  },
  {
    id: "ls465", name: "PENTAX Optio LS465", available: true,
    description: "ls465Body", specs: "ls465Specs",
    products: [
      ["ls465English", "https://www.ricoh-imaging.co.jp/english/products/optio-ls465/"],
      ["ls465Japanese", "https://www.ricoh-imaging.co.jp/japan/products/optio-ls465/"],
    ],
    sheets: [
      ["ls465SheetCollection", "https://www.ricoh-imaging.co.jp/japan/support/download/digital/skin_collection_ls465.html"],
    ],
  },
];
const createSkin = (assetId = null) => ({ id: crypto.randomUUID(), assetId });
const randomItem = (items) => items[Math.floor(Math.random() * items.length)];
const shuffled = (items) => [...items].sort(() => Math.random() - 0.5);
const createRandomPatternAsset = (pattern) => {
  const foreground = randomItem(RANDOM_PATTERN_COLORS);
  let background = randomItem(RANDOM_PATTERN_BACKGROUNDS);
  if (background === foreground) background = "#ffe7f1";
  return createPatternAsset(pattern.patternId, foreground, background);
};
const createRandomAsset = () => {
  if (Math.random() < 0.5) return randomItem(COLOR_TEMPLATES);
  return createRandomPatternAsset(randomItem(RANDOM_PATTERNS));
};
const createInitialDesign = (capacity) => {
  const generatedAssets = [];
  let patternPool = shuffled(RANDOM_PATTERNS);
  const skins = Array.from({ length: capacity }, (_, index) => {
    if (index === 0) return createSkin(KISEKAME_LOGO.id);
    if (patternPool.length === 0) patternPool = shuffled(RANDOM_PATTERNS);
    const asset = createRandomPatternAsset(patternPool.pop());
    generatedAssets.push(asset);
    return createSkin(asset.id);
  });
  return { skins, generatedAssets };
};

const getDefaultImagePos = (asset) => asset?.sourceType === "pattern"
  ? DEFAULT_PATTERN_POS
  : DEFAULT_IMAGE_POS;

const initialCamera = CAMERAS[0];
const initialPaper = PAPER_SIZES[0];
const initialSkinCapacity = getBestPrintLayout(initialCamera, initialPaper).capacity;

const readBlob = (blob, name) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const preview = new Image();
      preview.onerror = reject;
      preview.onload = () => resolve({
        id: crypto.randomUUID(), name, src: reader.result,
        width: preview.naturalWidth, height: preview.naturalHeight,
        sourceType: "upload",
      });
      preview.src = reader.result;
    };
    reader.readAsDataURL(blob);
  });

const readImageFile = async (file) => {
  const looksLikeHeic = /\.hei[cf]$/i.test(file.name) || /image\/hei[cf]/i.test(file.type);
  if (!looksLikeHeic) return readBlob(file, file.name);

  const { heicTo, isHeic } = await import("heic-to");
  if (!(await isHeic(file))) throw new Error("This HEIC/HEIF file could not be decoded.");
  const jpeg = await heicTo({ blob: file, type: "image/jpeg", quality: 0.92 });
  return readBlob(jpeg, file.name.replace(/\.hei[cf]$/i, ".jpg"));
};

export default function App() {
  const [initialDesign] = useState(() => createInitialDesign(initialSkinCapacity));
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("kisekame-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [language, setLanguage] = useState(detectLanguage);
  const [cameraId, setCameraId] = useState(CAMERAS[0].id);
  const [paperId, setPaperId] = useState(PAPER_SIZES[0].id);
  const [skins, setSkins] = useState(initialDesign.skins);
  const [uploads, setUploads] = useState([]);
  const [customAssets, setCustomAssets] = useState(initialDesign.generatedAssets);
  const [activeSkinId, setActiveSkinId] = useState(null);
  const [imagePositions, setImagePositions] = useState({});
  const [sourceTab, setSourceTab] = useState("pattern");
  const [uploadError, setUploadError] = useState("");
  const [customColor, setCustomColor] = useState(KISEKAME_PINK);
  const [patternForeground, setPatternForeground] = useState(KISEKAME_PINK);
  const [patternBackground, setPatternBackground] = useState("#ffe7f1");
  const [showPrint, setShowPrint] = useState(false);
  const [infoPage, setInfoPage] = useState(() => {
    const page = new URLSearchParams(window.location.search).get("page");
    const normalizedPage = normalizeInfoPage(page);
    return INFO_PAGES[normalizedPage] ? normalizedPage : null;
  });
  const t = (key, variables = {}) => Object.entries(variables).reduce(
    (text, [name, value]) => text.replace(`{${name}}`, value),
    TRANSLATIONS[language][key] ?? TRANSLATIONS.en[key] ?? key
  );

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const syncInfoPage = () => {
      const page = new URLSearchParams(window.location.search).get("page");
      const normalizedPage = normalizeInfoPage(page);
      setInfoPage(INFO_PAGES[normalizedPage] ? normalizedPage : null);
    };
    window.addEventListener("popstate", syncInfoPage);
    return () => window.removeEventListener("popstate", syncInfoPage);
  }, []);

  const camera = CAMERAS.find((item) => item.id === cameraId);
  const paperSize = PAPER_SIZES.find((item) => item.id === paperId);
  const printLayout = getBestPrintLayout(camera, paperSize);
  const activeSkin = skins.find((skin) => skin.id === activeSkinId) ?? skins[0];
  const allAssets = [...COLOR_TEMPLATES, ...PATTERN_TEMPLATES, KISEKAME_LOGO, ...customAssets, ...uploads];
  const getAsset = (assetId) => allAssets.find((asset) => asset.id === assetId);
  const pageCount = Math.max(1, Math.ceil(skins.length / printLayout.capacity));
  const currentPageSkinCount = skins.length === 0
    ? 0
    : ((skins.length - 1) % printLayout.capacity) + 1;

  const assignAsset = (asset) => {
    if (!activeSkin) return;
    setSkins((current) => current.map((skin) =>
      skin.id === activeSkin.id ? { ...skin, assetId: asset.id } : skin
    ));
    setImagePositions((current) => ({
      ...current,
      [activeSkin.id]: Object.fromEntries(camera.panels.map((panel) => [
        panel.id, { ...getDefaultImagePos(asset), imageId: asset.id },
      ])),
    }));
  };

  const assignGeneratedAsset = (asset) => {
    setCustomAssets((current) => current.some((item) => item.id === asset.id)
      ? current
      : [...current, asset]
    );
    assignAsset(asset);
  };

  const randomizeActiveSkin = () => {
    const asset = createRandomAsset();
    if (asset.sourceType === "color") {
      setSourceTab("pattern");
      setCustomColor(asset.color);
      assignAsset(asset);
      return;
    }
    setSourceTab("pattern");
    setPatternForeground(asset.foreground);
    setPatternBackground(asset.background);
    assignGeneratedAsset(asset);
  };

  const randomizeAllSkins = () => {
    const generatedAssets = [];
    const assignments = skins.map((skin) => {
      const asset = createRandomAsset();
      if (asset.sourceType === "pattern") generatedAssets.push(asset);
      return { skin, asset };
    });

    setCustomAssets((current) => [
      ...new Map([...current, ...generatedAssets].map((asset) => [asset.id, asset])).values(),
    ]);
    setSkins(assignments.map(({ skin, asset }) => ({ ...skin, assetId: asset.id })));
    setImagePositions(Object.fromEntries(assignments.map(({ skin, asset }) => [
      skin.id,
      Object.fromEntries(camera.panels.map((panel) => [
        panel.id, { ...getDefaultImagePos(asset), imageId: asset.id },
      ])),
    ])));
  };

  const handleImageUpload = async (files) => {
    setUploadError("");
    try {
      const uploaded = await Promise.all(files.map(readImageFile));
      setUploads((current) => [...current, ...uploaded]);
      if (uploaded[0]) assignAsset(uploaded[0]);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "HEIC conversion failed.");
    }
  };

  const addSkin = () => {
    const asset = createRandomAsset();
    const skin = createSkin(asset.id);
    if (asset.sourceType === "pattern") {
      setCustomAssets((current) => current.some((item) => item.id === asset.id) ? current : [...current, asset]);
    }
    setSkins((current) => [...current, skin]);
    setActiveSkinId(skin.id);
    setSourceTab(asset.sourceType === "upload" ? "upload" : "pattern");
  };

  const removeSkin = (skinId) => {
    if (!window.confirm("Remove this skin?")) return;
    setSkins((current) => {
      const next = current.filter((skin) => skin.id !== skinId);
      setActiveSkinId((activeId) => activeId === skinId ? (next[0]?.id ?? null) : activeId);
      return next;
    });
    setImagePositions((current) => {
      const next = { ...current };
      delete next[skinId];
      return next;
    });
  };

  const removeUpload = (assetId) => {
    setUploads((current) => current.filter((asset) => asset.id !== assetId));
    setSkins((current) => current.map((skin) =>
      skin.assetId === assetId ? { ...skin, assetId: null } : skin
    ));
  };

  const handlePosChange = (skinId, panelId, pos) => {
    setImagePositions((current) => ({
      ...current,
      [skinId]: { ...current[skinId], [panelId]: pos },
    }));
  };

  const handlePrint = () => {
    setShowPrint(true);
    setTimeout(() => {
      window.print();
      setShowPrint(false);
    }, 300);
  };

  const activateSkin = (skin) => {
    setActiveSkinId(skin.id);
    const asset = getAsset(skin.assetId);
    if (asset?.sourceType === "color") setCustomColor(asset.color);
    if (asset?.sourceType === "pattern") {
      setPatternForeground(asset.foreground);
      setPatternBackground(asset.background);
    }
    if (asset?.sourceType) setSourceTab(asset.sourceType === "upload" ? "upload" : "pattern");
  };

  const selectedAssetId = activeSkin?.assetId;
  const activeSkinNumber = skins.findIndex((skin) => skin.id === activeSkin?.id) + 1;
  const activeAsset = getAsset(selectedAssetId);

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === "light" ? "dark" : "light";
      localStorage.setItem("kisekame-theme", next);
      return next;
    });
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("page");
    const modelHashtag = camera.name.split(" ").at(-1);
    const intent = new URL("https://twitter.com/intent/tweet");
    intent.searchParams.set("text", t("shareText", { camera: camera.name }));
    intent.searchParams.set("url", url.toString());
    intent.searchParams.set("hashtags", ["KISEKAME", modelHashtag, camera.brand, "Optio"].join(","));
    window.open(intent, "_blank", "noopener,noreferrer");
  };

  const openInfoPage = (page) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", page);
    window.history.pushState({}, "", url);
    setInfoPage(page);
  };

  const closeInfoPage = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("page");
    window.history.pushState({}, "", url);
    setInfoPage(null);
  };

  useEffect(() => {
    if (!infoPage) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") closeInfoPage();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [infoPage]);

  return (
    <div className={styles.app} data-theme={theme}>
      <header className={styles.header}>
        <div className={styles.brandLockup}>
          <h1 className={styles.title}>KISEKAME</h1>
          <p className={styles.subtitle}>Digicam Skin Designer</p>
        </div>
        <section className={styles.headerSeo} aria-labelledby="supported-camera-heading">
          <p>{t("headerDescription")}</p>
          <div className={styles.supportedCameras}>
            <h2 id="supported-camera-heading">{t("supportedCameras")}</h2>
            <ul>
              {CAMERAS.filter((item) => item.available !== false).map((item) => <li key={item.id}>{item.name}</li>)}
            </ul>
          </div>
        </section>
        <div className={styles.headerActions}>
          <nav className={styles.infoNav} aria-label="Information">
            <button type="button" onClick={() => openInfoPage("about")}>{t("about")}</button>
            <button type="button" onClick={() => openInfoPage("camera")}>{t("camera")}</button>
            <button type="button" onClick={() => openInfoPage("guide")}>{t("guide")}</button>
          </nav>
          <button type="button" className={styles.shareButton} onClick={handleShare}>↗ {t("share")}</button>
          <select className={styles.languageSelect} value={language} onChange={(event) => {
            const next = event.target.value;
            setLanguage(next);
            localStorage.setItem("kisekame-language", next);
          }} aria-label="Language">
            {SUPPORTED_LANGUAGES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
          <button type="button" className={styles.themeToggle} onClick={toggleTheme} role="switch" aria-label={t(theme === "light" ? "switchToDark" : "switchToLight")} title={t(theme === "light" ? "switchToDark" : "switchToLight")} aria-checked={theme === "dark"}>
            <span className={styles.switchTrack} aria-hidden="true">
              <span className={styles.switchThumb}>{theme === "light" ? "☀️" : "🌙"}</span>
            </span>
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.sidebar}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>📷 {t("camera")}</h2>
            <select value={cameraId} onChange={(event) => {
              const nextCamera = CAMERAS.find((item) => item.id === event.target.value);
              setCameraId(nextCamera.id);
            }} className={styles.select}>
              {CAMERAS.map((item) => (
                <option key={item.id} value={item.id} disabled={item.available === false}>
                  {item.name}{item.available === false ? ` (${t("comingSoon")})` : ""}
                </option>
              ))}
            </select>
            <div className={styles.printSummary}>
              <strong>{skins.length} {t("skins")} · {pageCount} {t("pages")}</strong>
              <div className={styles.capacityTrack}><span style={{ width: `${currentPageSkinCount / printLayout.capacity * 100}%` }} /></div>
              <span>{printLayout.columns} {t("columns")} × {printLayout.rows} {t("rows")}{printLayout.rotated ? ` · ${t("rotated")}` : ""}</span>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>📄 {t("paperSize")}</h2>
            <select value={paperId} onChange={(event) => setPaperId(event.target.value)} className={styles.select}>
              {PAPER_SIZES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label} ({item.widthMm}×{item.heightMm}mm)
                </option>
              ))}
            </select>
          </div>

          {activeSkin && (
            <div className={styles.card}>
              <div className={styles.selectedSkinHeading}>
                <h2 className={styles.cardTitle}>🎨 {t("selectedSkin")}</h2>
                <strong>{t("skin")} {String(activeSkinNumber).padStart(2, "0")}</strong>
              </div>
              <div className={styles.selectedSkinSummary} aria-live="polite">
                <span className={styles.selectedSkinDot} style={{ background: activeAsset?.color ?? KISEKAME_PINK }} />
                <span>{activeAsset?.name ?? t("blankSkin")}</span>
                <button type="button" className={styles.randomizeButton} onClick={randomizeActiveSkin}>✦ {t("randomize")}</button>
              </div>
              <div className={styles.sourceTabs}>
                {[["pattern", t("pattern")], ["upload", t("upload")]].map(([id, label]) => (
                  <button key={id} type="button" className={sourceTab === id ? styles.sourceTabActive : styles.sourceTab} onClick={() => setSourceTab(id)}>{label}</button>
                ))}
              </div>

              {sourceTab === "pattern" && <>
                <div className={styles.patternGrid}>
                  <button type="button" className={`${styles.patternChoice} ${activeAsset?.sourceType === "color" ? styles.patternChoiceSelected : ""}`} onClick={() => assignGeneratedAsset(createColorAsset(customColor))}>
                    <span className={styles.solidChoicePreview} style={{ background: customColor }} />
                    <span>{t("solid")}</span>
                  </button>
                  {PATTERN_TEMPLATES.map((asset) => {
                    const customized = createPatternAsset(asset.patternId, patternForeground, patternBackground);
                    return <button key={asset.id} type="button" className={`${styles.patternChoice} ${getAsset(selectedAssetId)?.patternId === asset.patternId ? styles.patternChoiceSelected : ""}`} onClick={() => assignGeneratedAsset(customized)}><img src={customized.src} alt="" /><span>{asset.name}</span></button>;
                  })}
                </div>
                {activeAsset?.sourceType === "color" ? <div className={styles.colorGrid}>
                  {COLOR_TEMPLATES.map((asset) => <button key={asset.id} type="button" className={`${styles.colorSwatch} ${selectedAssetId === asset.id ? styles.colorSwatchSelected : ""}`} style={{ background: asset.color }} onClick={() => { setCustomColor(asset.color); assignAsset(asset); }} aria-label={asset.name} title={asset.name}>{selectedAssetId === asset.id ? "✓" : ""}</button>)}
                  <label className={styles.customColor} title={t("customColor")}>
                    <input type="color" value={customColor} onChange={(event) => {
                      setCustomColor(event.target.value);
                      assignGeneratedAsset(createColorAsset(event.target.value));
                    }} />
                    <span>＋</span>
                  </label>
                </div> : <div className={styles.patternColors}>
                  <label>{t("patternColor")} <input type="color" value={patternForeground} onChange={(event) => {
                    const color = event.target.value;
                    setPatternForeground(color);
                    const patternId = getAsset(selectedAssetId)?.patternId;
                    if (patternId) assignGeneratedAsset(createPatternAsset(patternId, color, patternBackground));
                  }} /></label>
                  <label>{t("background")} <input type="color" value={patternBackground} onChange={(event) => {
                    const color = event.target.value;
                    setPatternBackground(color);
                    const patternId = getAsset(selectedAssetId)?.patternId;
                    if (patternId) assignGeneratedAsset(createPatternAsset(patternId, patternForeground, color));
                  }} /></label>
                </div>}
              </>}

              {sourceTab === "upload" && <>
                <ImageUploader onUpload={handleImageUpload} labels={{ uploadLabel: t("uploadLabel"), dropHere: t("dropHere"), dragDrop: t("dragDrop") }} />
                {uploadError && <div className={styles.uploadError} role="alert">{uploadError}</div>}
                <div className={styles.imageList}>
                  {uploads.map((asset) => <div key={asset.id} className={`${styles.imageItem} ${selectedAssetId === asset.id ? styles.imageItemActive : ""}`}>
                    <button type="button" className={styles.imageSelect} onClick={() => assignAsset(asset)}><img src={asset.src} alt={asset.name} className={styles.thumbImg} /><span className={styles.imageName}>{asset.name}</span></button>
                    <button type="button" className={styles.removeImage} onClick={() => removeUpload(asset.id)} aria-label={`Remove ${asset.name}`}>×</button>
                  </div>)}
                </div>
              </>}

              {selectedAssetId && <div className={styles.scaleControl}>
                <label htmlFor="scale-input" className={styles.scaleLabel}>{t("scale")}: {((imagePositions[activeSkin.id]?.[camera.panels[0].id]?.scale ?? 1) * 100).toFixed(0)}%</label>
                <input id="scale-input" type="range" min="0.1" max="3" step="0.05" value={imagePositions[activeSkin.id]?.[camera.panels[0].id]?.scale ?? 1} onChange={(event) => handlePosChange(activeSkin.id, camera.panels[0].id, { ...(imagePositions[activeSkin.id]?.[camera.panels[0].id] ?? getDefaultImagePos(activeAsset)), imageId: selectedAssetId, scale: Number(event.target.value) })} className={styles.slider} />
                {activeAsset?.sourceType === "upload" && <label className={styles.repeatControl}>
                  <span>{t("repeat")}</span>
                  <input type="checkbox" checked={imagePositions[activeSkin.id]?.[camera.panels[0].id]?.repeat !== false} onChange={(event) => handlePosChange(activeSkin.id, camera.panels[0].id, { ...(imagePositions[activeSkin.id]?.[camera.panels[0].id] ?? getDefaultImagePos(activeAsset)), imageId: selectedAssetId, repeat: event.target.checked })} />
                </label>}
              </div>}
            </div>
          )}

          <button className={styles.btnPrint} onClick={handlePrint} disabled={skins.length === 0}>✨ {t("printExport")}</button>
        </section>

        <section className={styles.preview}>
          <div className={styles.previewHeading}>
            <h2 className={styles.previewTitle}>{t("previews")} — {camera.name}</h2>
            <div className={styles.previewActions}>
              <button type="button" className={styles.randomizeAllButton} onClick={randomizeAllSkins} disabled={skins.length === 0}>✦ {t("randomizeAll")}</button>
            </div>
          </div>
          <div className={styles.panelGrid}>
            {skins.map((skin, index) => {
              const asset = getAsset(skin.assetId);
              const panel = camera.panels[0];
              const isActive = activeSkin?.id === skin.id;
              const startsPage = index > 0 && index % printLayout.capacity === 0;
              return <Fragment key={skin.id}>
                {startsPage && <div className={styles.pageDivider}><span>{t("page")} {Math.floor(index / printLayout.capacity) + 1}</span></div>}
                <div className={`${styles.panelWrapper} ${isActive ? styles.panelWrapperActive : ""}`} onMouseDown={() => activateSkin(skin)} aria-current={isActive ? "true" : undefined}>
                  <div className={styles.patternHeader}><strong>{t("skin")} {String(index + 1).padStart(2, "0")} {isActive && <span className={styles.selectedBadge}>{t("selected")}</span>}</strong><button type="button" className={styles.removeSkin} onClick={(event) => { event.stopPropagation(); removeSkin(skin.id); }} aria-label={`Remove Skin ${index + 1}`}>×</button></div>
                  <SkinCanvas theme={theme} panel={panel} image={asset} imagePos={imagePositions[skin.id]?.[panel.id] ?? getDefaultImagePos(asset)} onImagePosChange={(pos) => handlePosChange(skin.id, panel.id, { ...pos, imageId: skin.assetId })} />
                </div>
              </Fragment>;
            })}
            {skins.length > 0 && skins.length % printLayout.capacity === 0 && (
              <div className={styles.pageDivider}><span>{t("page")} {pageCount + 1}</span></div>
            )}
            <button type="button" className={styles.addSkin} onClick={addSkin}><span>＋</span>{t("addSkin")}</button>
          </div>

          {showPrint && <div className={styles.printArea}><PrintSheet camera={camera} paperSize={paperSize} skins={skins.map((skin) => ({ ...skin, image: getAsset(skin.assetId), positions: imagePositions[skin.id] }))} /></div>}
        </section>
      </main>

      <footer className={styles.footer}>© 2026 snamiki1212</footer>

      {infoPage && <div className={styles.modalBackdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) closeInfoPage(); }}>
        <section className={styles.infoModal} role="dialog" aria-modal="true" aria-labelledby="info-modal-title">
          <div className={styles.infoModalHeader}>
            <span>{t("modalGuide")}</span>
            <button type="button" onClick={closeInfoPage} aria-label={t("close")}>×</button>
          </div>
          <div className={styles.infoModalBody}>
            <p className={styles.infoEyebrow}>{t("tagline")}</p>
            <h2 id="info-modal-title">{t(`${infoPage}Title`)}</h2>
            {infoPage === "about" && <>
              <p>{t("aboutBody")}</p>
              <div className={styles.infoCallout}>
                <span className={styles.aboutIcon} aria-hidden="true">🎁</span>
                <div><strong>{t("aboutStrong")}</strong><span>{t("aboutCallout")}</span></div>
              </div>
              <div className={styles.nameOrigin}>
                <span className={styles.aboutIcon} aria-hidden="true">💡</span>
                <div><strong>{t("nameOriginTitle")}</strong><span>{t("nameOriginBody")}</span></div>
              </div>
              <div className={styles.ossCard}>
                <span className={styles.aboutIcon} aria-hidden="true">🧩</span>
                <div><strong>{t("ossTitle")}</strong><span>{t("ossBody")}</span></div>
                <a href="https://github.com/snamiki1212/kisekame" target="_blank" rel="noreferrer">{t("repository")} ↗</a>
              </div>
              <div className={styles.creatorCard}>
                <img src={`${import.meta.env.BASE_URL}snamiki1212-avatar.jpg`} alt="snamiki1212" />
                <div><span>{t("creator")}</span><strong>snamiki1212</strong></div>
                <div className={styles.creatorLinks}>
                  <a href="https://github.com/snamiki1212" target="_blank" rel="noreferrer">{t("github")} ↗</a>
                  <a href="https://twitter.com/snamiki1212" target="_blank" rel="noreferrer">{t("twitter")} ↗</a>
                </div>
              </div>
            </>}
            {infoPage === "guide" && <ol className={styles.guideSteps}>
              <li><strong>{t("step1Title")}</strong><span>{t("step1Body")}</span></li>
              <li><strong>{t("step2Title")}</strong><span>{t("step2Body")}</span></li>
              <li><strong>{t("step3Title")}</strong><span>{t("step3Body")}</span></li>
              <li><strong>{t("step4Title")}</strong><span>{t("step4Body")}</span></li>
            </ol>}
            {infoPage === "camera" && <>
              <p>{t("cameraBody")}</p>
              <div className={styles.cameraInfoList}>
                {CAMERA_DETAILS.map((item) => <article key={item.id} className={styles.cameraInfoCard}>
                  <div className={styles.cameraInfoHeading}>
                    <h3>{item.name}</h3>
                    <span data-available={item.available}>{t(item.available ? "supported" : "comingSoon")}</span>
                  </div>
                  <p>{t(item.description)}</p>
                  <div className={styles.cameraSpecs}>{t(item.specs)}</div>
                  {[["productInfo", item.products], ["skinResources", item.sheets]].map(([heading, links]) => <section key={heading} className={styles.cameraLinkSection}>
                    <h4>{t(heading)}</h4>
                    <div className={styles.cameraLinks}>
                      {links.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noreferrer"><span>{t(label)}</span><span aria-hidden="true">↗</span></a>)}
                    </div>
                  </section>)}
                </article>)}
              </div>
            </>}
            {infoPage === "guide" && <section className={styles.guidePrintSection}>
              <h3>{t("guidePrintTitle")}</h3>
              <p>{t("printBody")}</p>
              <div className={styles.printTips}><span>{t("printTip1")}</span><span>{t("printTip2")}</span><span>{t("printTip3")}</span><span>{t("printTip4")}</span></div>
            </section>}
          </div>
          <div className={styles.infoModalFooter}>
            {Object.keys(INFO_PAGES).map((id) => <button key={id} type="button" className={infoPage === id ? styles.infoPageActive : ""} onClick={() => openInfoPage(id)}>{t(id)}</button>)}
          </div>
        </section>
      </div>}
    </div>
  );
}
