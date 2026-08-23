import { useEffect, useState } from "react";
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
const INFO_PAGES = { about: "About KISEKAME", guide: "How to use", print: "Print guide" };
const createSkin = (assetId = null) => ({ id: crypto.randomUUID(), assetId });
const randomItem = (items) => items[Math.floor(Math.random() * items.length)];
const createRandomAsset = () => {
  if (Math.random() < 0.5) return randomItem(COLOR_TEMPLATES);
  const pattern = randomItem(RANDOM_PATTERNS);
  const foreground = randomItem(RANDOM_PATTERN_COLORS);
  let background = randomItem(RANDOM_PATTERN_BACKGROUNDS);
  if (background === foreground) background = "#ffe7f1";
  return createPatternAsset(pattern.patternId, foreground, background);
};
const createInitialDesign = (capacity) => {
  const generatedAssets = [];
  const skins = Array.from({ length: capacity }, (_, index) => {
    if (index === 0) return createSkin(KISEKAME_LOGO.id);
    const asset = createRandomAsset();
    if (asset.sourceType === "pattern") generatedAssets.push(asset);
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
    return INFO_PAGES[page] ? page : null;
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
      setInfoPage(INFO_PAGES[page] ? page : null);
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
  const isFull = skins.length >= printLayout.capacity;

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
      setSourceTab("color");
      setCustomColor(asset.color);
      assignAsset(asset);
      return;
    }
    setSourceTab("pattern");
    setPatternForeground(asset.foreground);
    setPatternBackground(asset.background);
    assignGeneratedAsset(asset);
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
    if (isFull) return;
    const asset = createRandomAsset();
    const skin = createSkin(asset.id);
    if (asset.sourceType === "pattern") {
      setCustomAssets((current) => current.some((item) => item.id === asset.id) ? current : [...current, asset]);
    }
    setSkins((current) => [...current, skin]);
    setActiveSkinId(skin.id);
    setSourceTab(asset.sourceType);
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
    if (asset?.sourceType) setSourceTab(asset.sourceType);
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
        <div className={styles.headerActions}>
          <nav className={styles.infoNav} aria-label="Information">
            <button type="button" onClick={() => openInfoPage("about")}>{t("about")}</button>
            <button type="button" onClick={() => openInfoPage("guide")}>{t("guide")}</button>
            <button type="button" onClick={() => openInfoPage("print")}>{t("printGuide")}</button>
          </nav>
          <span className={styles.tagline}>{t("tagline")}</span>
          <select className={styles.languageSelect} value={language} onChange={(event) => {
            const next = event.target.value;
            setLanguage(next);
            localStorage.setItem("kisekame-language", next);
          }} aria-label="Language">
            {SUPPORTED_LANGUAGES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
          <button type="button" className={styles.themeToggle} onClick={toggleTheme} role="switch" aria-label="Dark mode" aria-checked={theme === "dark"}>
            <span className={styles.themeLabel}>{theme === "light" ? t("light") : t("dark")}</span>
            <span className={styles.switchTrack} aria-hidden="true">
              <span className={styles.switchThumb}>{theme === "light" ? "☀" : "☾"}</span>
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
              const nextCapacity = getBestPrintLayout(nextCamera, paperSize).capacity;
              const nextDesign = createInitialDesign(nextCapacity);
              const nextSkins = nextDesign.skins;
              setCameraId(nextCamera.id);
              setSkins(nextSkins);
              setCustomAssets((current) => [...current, ...nextDesign.generatedAssets]);
              setActiveSkinId(nextSkins[0].id);
              setImagePositions({});
            }} className={styles.select}>
              {CAMERAS.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
            <div className={styles.printSummary}>
              <strong>{t("skins")} {skins.length} / {printLayout.capacity}</strong>
              <div className={styles.capacityTrack}><span style={{ width: `${skins.length / printLayout.capacity * 100}%` }} /></div>
              <span>{printLayout.columns} {t("columns")} × {printLayout.rows} {t("rows")}{printLayout.rotated ? ` · ${t("rotated")}` : ""}</span>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>📄 {t("paperSize")}</h2>
            <select value={paperId} onChange={(event) => setPaperId(event.target.value)} className={styles.select}>
              {PAPER_SIZES.map((item) => (
                <option key={item.id} value={item.id} disabled={getBestPrintLayout(camera, item).capacity < skins.length}>
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
                {[["color", t("color")], ["pattern", t("pattern")], ["upload", t("upload")]].map(([id, label]) => (
                  <button key={id} type="button" className={sourceTab === id ? styles.sourceTabActive : styles.sourceTab} onClick={() => setSourceTab(id)}>{label}</button>
                ))}
              </div>

              {sourceTab === "color" && <div className={styles.colorGrid}>
                {COLOR_TEMPLATES.map((asset) => <button key={asset.id} type="button" className={`${styles.colorSwatch} ${selectedAssetId === asset.id ? styles.colorSwatchSelected : ""}`} style={{ background: asset.color }} onClick={() => assignAsset(asset)} aria-label={asset.name} title={asset.name}>{selectedAssetId === asset.id ? "✓" : ""}</button>)}
                <label className={styles.customColor} title={t("customColor")}>
                  <input type="color" value={customColor} onChange={(event) => {
                    setCustomColor(event.target.value);
                    assignGeneratedAsset(createColorAsset(event.target.value));
                  }} />
                  <span>＋</span>
                </label>
              </div>}

              {sourceTab === "pattern" && <>
                <div className={styles.patternGrid}>
                  {PATTERN_TEMPLATES.map((asset) => {
                    const customized = createPatternAsset(asset.patternId, patternForeground, patternBackground);
                    return <button key={asset.id} type="button" className={`${styles.patternChoice} ${getAsset(selectedAssetId)?.patternId === asset.patternId ? styles.patternChoiceSelected : ""}`} onClick={() => assignGeneratedAsset(customized)}><img src={customized.src} alt="" /><span>{asset.name}</span></button>;
                  })}
                </div>
                <div className={styles.patternColors}>
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
                </div>
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

          <button className={styles.btnPrint} onClick={handlePrint} disabled={skins.length === 0}>🖨️ {t("printExport")}</button>
        </section>

        <section className={styles.preview}>
          <div className={styles.previewHeading}>
            <h2 className={styles.previewTitle}>{t("previews")} — {camera.name}</h2>
            <span className={styles.previewCount}>{skins.length} {t("skins")}</span>
          </div>
          <div className={styles.panelGrid}>
            {skins.map((skin, index) => {
              const asset = getAsset(skin.assetId);
              const panel = camera.panels[0];
              const isActive = activeSkin?.id === skin.id;
              return <div key={skin.id} className={`${styles.panelWrapper} ${isActive ? styles.panelWrapperActive : ""}`} onMouseDown={() => activateSkin(skin)} aria-current={isActive ? "true" : undefined}>
                <div className={styles.patternHeader}><strong>{t("skin")} {String(index + 1).padStart(2, "0")} {isActive && <span className={styles.selectedBadge}>{t("selected")}</span>}</strong><button type="button" className={styles.removeSkin} onClick={(event) => { event.stopPropagation(); removeSkin(skin.id); }} aria-label={`Remove Skin ${index + 1}`}>×</button></div>
                <SkinCanvas theme={theme} panel={panel} image={asset} imagePos={imagePositions[skin.id]?.[panel.id] ?? getDefaultImagePos(asset)} onImagePosChange={(pos) => handlePosChange(skin.id, panel.id, { ...pos, imageId: skin.assetId })} />
              </div>;
            })}
            <button type="button" className={styles.addSkin} onClick={addSkin} disabled={isFull}><span>＋</span>{t("addSkin")}</button>
          </div>

          {showPrint && <div className={styles.printArea}><PrintSheet camera={camera} paperSize={paperSize} skins={skins.map((skin) => ({ ...skin, image: getAsset(skin.assetId), positions: imagePositions[skin.id] }))} /></div>}
        </section>
      </main>

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
              <div className={styles.infoCallout}><strong>{t("aboutStrong")}</strong><span>{t("aboutCallout")}</span></div>
              <div className={styles.creatorCard}>
                <img src="/snamiki1212-avatar.jpg" alt="snamiki1212" />
                <div><span>{t("creator")}</span><strong>snamiki1212</strong></div>
                <div className={styles.creatorLinks}>
                  <a href="https://github.com/snamiki1212" target="_blank" rel="noreferrer">{t("github")} ↗</a>
                  <a href="https://twitter.com/snamiki1212" target="_blank" rel="noreferrer">{t("twitter")} ↗</a>
                  <a href="https://github.com/snamiki1212/digicam-skin-designer" target="_blank" rel="noreferrer">{t("repository")} ↗</a>
                </div>
              </div>
            </>}
            {infoPage === "guide" && <ol className={styles.guideSteps}>
              <li><strong>{t("step1Title")}</strong><span>{t("step1Body")}</span></li>
              <li><strong>{t("step2Title")}</strong><span>{t("step2Body")}</span></li>
              <li><strong>{t("step3Title")}</strong><span>{t("step3Body")}</span></li>
              <li><strong>{t("step4Title")}</strong><span>{t("step4Body")}</span></li>
            </ol>}
            {infoPage === "print" && <>
              <p>{t("printBody")}</p>
              <div className={styles.printTips}><span>{t("printTip1", { paper: paperSize.label })}</span><span>{t("printTip2")}</span><span>{t("printTip3")}</span><span>{t("printTip4")}</span></div>
            </>}
          </div>
          <div className={styles.infoModalFooter}>
            {Object.keys(INFO_PAGES).map((id) => <button key={id} type="button" className={infoPage === id ? styles.infoPageActive : ""} onClick={() => openInfoPage(id)}>{t(id === "print" ? "printGuide" : id)}</button>)}
          </div>
        </section>
      </div>}
    </div>
  );
}
