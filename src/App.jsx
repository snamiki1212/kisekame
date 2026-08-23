import { useState } from "react";
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
import styles from "./App.module.css";

const DEFAULT_IMAGE_POS = { x: 0, y: 0, scale: 1 };
const createSkin = () => ({ id: crypto.randomUUID(), assetId: null });
const createInitialSkins = () => Array.from({ length: 3 }, createSkin);

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
  const [cameraId, setCameraId] = useState(CAMERAS[0].id);
  const [paperId, setPaperId] = useState(PAPER_SIZES[0].id);
  const [skins, setSkins] = useState(createInitialSkins);
  const [uploads, setUploads] = useState([]);
  const [customAssets, setCustomAssets] = useState([]);
  const [activeSkinId, setActiveSkinId] = useState(null);
  const [imagePositions, setImagePositions] = useState({});
  const [sourceTab, setSourceTab] = useState("color");
  const [uploadError, setUploadError] = useState("");
  const [customColor, setCustomColor] = useState("#4a90e2");
  const [patternForeground, setPatternForeground] = useState("#5c7cfa");
  const [patternBackground, setPatternBackground] = useState("#f8f9fa");
  const [showPrint, setShowPrint] = useState(false);

  const camera = CAMERAS.find((item) => item.id === cameraId);
  const paperSize = PAPER_SIZES.find((item) => item.id === paperId);
  const printLayout = getBestPrintLayout(camera, paperSize);
  const activeSkin = skins.find((skin) => skin.id === activeSkinId) ?? skins[0];
  const allAssets = [...COLOR_TEMPLATES, ...PATTERN_TEMPLATES, ...customAssets, ...uploads];
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
        panel.id, { ...DEFAULT_IMAGE_POS, imageId: asset.id },
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
    const skin = createSkin();
    setSkins((current) => [...current, skin]);
    setActiveSkinId(skin.id);
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
  };

  const selectedAssetId = activeSkin?.assetId;

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Digicam Skin Designer</h1>
        <p className={styles.subtitle}>Create, preview, and print custom skins for digital cameras</p>
      </header>

      <main className={styles.main}>
        <section className={styles.sidebar}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>📷 Camera</h2>
            <select value={cameraId} onChange={(event) => {
              const nextSkins = createInitialSkins();
              setCameraId(event.target.value);
              setSkins(nextSkins);
              setActiveSkinId(nextSkins[0].id);
              setImagePositions({});
            }} className={styles.select}>
              {CAMERAS.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
            <div className={styles.printSummary}>
              <strong>Skins {skins.length} / {printLayout.capacity}</strong>
              <div className={styles.capacityTrack}><span style={{ width: `${skins.length / printLayout.capacity * 100}%` }} /></div>
              <span>{printLayout.columns} columns × {printLayout.rows} rows{printLayout.rotated ? " · rotated 90°" : ""}</span>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>📄 Paper Size</h2>
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
              <h2 className={styles.cardTitle}>🎨 Selected Skin</h2>
              <div className={styles.sourceTabs}>
                {[["color", "Color"], ["pattern", "Pattern"], ["upload", "Upload"]].map(([id, label]) => (
                  <button key={id} type="button" className={sourceTab === id ? styles.sourceTabActive : styles.sourceTab} onClick={() => setSourceTab(id)}>{label}</button>
                ))}
              </div>

              {sourceTab === "color" && <div className={styles.colorGrid}>
                {COLOR_TEMPLATES.map((asset) => <button key={asset.id} type="button" className={`${styles.colorSwatch} ${selectedAssetId === asset.id ? styles.colorSwatchSelected : ""}`} style={{ background: asset.color }} onClick={() => assignAsset(asset)} aria-label={asset.name} title={asset.name}>{selectedAssetId === asset.id ? "✓" : ""}</button>)}
                <label className={styles.customColor} title="Custom color">
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
                  <label>Pattern <input type="color" value={patternForeground} onChange={(event) => {
                    const color = event.target.value;
                    setPatternForeground(color);
                    const patternId = getAsset(selectedAssetId)?.patternId;
                    if (patternId) assignGeneratedAsset(createPatternAsset(patternId, color, patternBackground));
                  }} /></label>
                  <label>Background <input type="color" value={patternBackground} onChange={(event) => {
                    const color = event.target.value;
                    setPatternBackground(color);
                    const patternId = getAsset(selectedAssetId)?.patternId;
                    if (patternId) assignGeneratedAsset(createPatternAsset(patternId, patternForeground, color));
                  }} /></label>
                </div>
              </>}

              {sourceTab === "upload" && <>
                <ImageUploader onUpload={handleImageUpload} />
                {uploadError && <div className={styles.uploadError} role="alert">{uploadError}</div>}
                <div className={styles.imageList}>
                  {uploads.map((asset) => <div key={asset.id} className={`${styles.imageItem} ${selectedAssetId === asset.id ? styles.imageItemActive : ""}`}>
                    <button type="button" className={styles.imageSelect} onClick={() => assignAsset(asset)}><img src={asset.src} alt={asset.name} className={styles.thumbImg} /><span className={styles.imageName}>{asset.name}</span></button>
                    <button type="button" className={styles.removeImage} onClick={() => removeUpload(asset.id)} aria-label={`Remove ${asset.name}`}>×</button>
                  </div>)}
                </div>
              </>}

              {selectedAssetId && <div className={styles.scaleControl}>
                <label htmlFor="scale-input" className={styles.scaleLabel}>Scale: {((imagePositions[activeSkin.id]?.[camera.panels[0].id]?.scale ?? 1) * 100).toFixed(0)}%</label>
                <input id="scale-input" type="range" min="0.1" max="3" step="0.05" value={imagePositions[activeSkin.id]?.[camera.panels[0].id]?.scale ?? 1} onChange={(event) => handlePosChange(activeSkin.id, camera.panels[0].id, { ...(imagePositions[activeSkin.id]?.[camera.panels[0].id] ?? DEFAULT_IMAGE_POS), imageId: selectedAssetId, scale: Number(event.target.value) })} className={styles.slider} />
              </div>}
            </div>
          )}

          <button className={styles.btnPrint} onClick={handlePrint} disabled={skins.length === 0}>🖨️ Print / Export PDF</button>
        </section>

        <section className={styles.preview}>
          <div className={styles.previewHeading}>
            <h2 className={styles.previewTitle}>Skin previews — {camera.name}</h2>
            <span className={styles.previewCount}>{skins.length} skins</span>
          </div>
          <div className={styles.panelGrid}>
            {skins.map((skin, index) => {
              const asset = getAsset(skin.assetId);
              const panel = camera.panels[0];
              return <div key={skin.id} className={`${styles.panelWrapper} ${activeSkin?.id === skin.id ? styles.panelWrapperActive : ""}`} onMouseDown={() => activateSkin(skin)}>
                <div className={styles.patternHeader}><strong>Skin {String(index + 1).padStart(2, "0")}</strong><button type="button" className={styles.removeSkin} onClick={(event) => { event.stopPropagation(); removeSkin(skin.id); }} aria-label={`Remove Skin ${index + 1}`}>×</button></div>
                <SkinCanvas panel={panel} image={asset} imagePos={imagePositions[skin.id]?.[panel.id] ?? DEFAULT_IMAGE_POS} onImagePosChange={(pos) => handlePosChange(skin.id, panel.id, { ...pos, imageId: skin.assetId })} />
              </div>;
            })}
            <button type="button" className={styles.addSkin} onClick={addSkin} disabled={isFull}><span>＋</span>Add Skin</button>
          </div>

          {showPrint && <div className={styles.printArea}><PrintSheet camera={camera} paperSize={paperSize} skins={skins.map((skin) => ({ ...skin, image: getAsset(skin.assetId), positions: imagePositions[skin.id] }))} /></div>}
        </section>
      </main>
    </div>
  );
}
