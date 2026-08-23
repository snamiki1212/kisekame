import { useState } from "react";
import { CAMERAS, PAPER_SIZES } from "./data/cameras";
import { STARTER_PATTERNS } from "./data/starterPatterns";
import { SkinCanvas } from "./components/SkinCanvas";
import { ImageUploader } from "./components/ImageUploader";
import { getBestPrintLayout, PrintSheet } from "./components/PrintSheet";
import styles from "./App.module.css";

const DEFAULT_IMAGE_POS = { x: 0, y: 0, scale: 1 };

const createStarterPositions = (camera) =>
  Object.fromEntries(
    STARTER_PATTERNS.map((image) => [
      image.id,
      Object.fromEntries(
        camera.panels.map((panel) => [
          panel.id,
          { ...DEFAULT_IMAGE_POS, imageId: image.id },
        ])
      ),
    ])
  );

const readImageFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const preview = new Image();
      preview.onerror = reject;
      preview.onload = () =>
        resolve({
          id: crypto.randomUUID(),
          name: file.name,
          src: reader.result,
          width: preview.naturalWidth,
          height: preview.naturalHeight,
        });
      preview.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

export default function App() {
  const [cameraId, setCameraId] = useState(CAMERAS[0].id);
  const [paperId, setPaperId] = useState(PAPER_SIZES[0].id);
  const [images, setImages] = useState(STARTER_PATTERNS);
  const [activeImageId, setActiveImageId] = useState(STARTER_PATTERNS[0].id);
  // imagePositions: { [imageId]: { [panelId]: { x, y, scale, imageId } } }
  const [imagePositions, setImagePositions] = useState(() =>
    createStarterPositions(CAMERAS[0])
  );
  const [activePanelId, setActivePanelId] = useState(CAMERAS[0].panels[0].id);
  const [showPrint, setShowPrint] = useState(false);

  const camera = CAMERAS.find((c) => c.id === cameraId);
  const paperSize = PAPER_SIZES.find((p) => p.id === paperId);
  const printLayout = getBestPrintLayout(camera, paperSize);
  const patternCount = images.length * camera.panels.length;
  const pageCount = Math.max(1, Math.ceil(patternCount / printLayout.capacity));

  const handleImageUpload = async (files) => {
    const uploaded = await Promise.all(files.map(readImageFile));
    setImages((current) => [...current, ...uploaded]);
    setActiveImageId(uploaded[0].id);
    const panelId = activePanelId ?? camera.panels[0].id;
    setActivePanelId(panelId);
    setImagePositions((current) => ({
      ...current,
      ...Object.fromEntries(
        uploaded.map((image) => [
          image.id,
          Object.fromEntries(
            camera.panels.map((panel) => [
              panel.id,
              { ...DEFAULT_IMAGE_POS, imageId: image.id },
            ])
          ),
        ])
      ),
    }));
  };

  const removeImage = (imageId) => {
    setImages((current) => {
      const next = current.filter((image) => image.id !== imageId);
      setActiveImageId((activeId) =>
        activeId === imageId ? (next[0]?.id ?? null) : activeId
      );
      return next;
    });
    setImagePositions((current) => {
      const next = { ...current };
      delete next[imageId];
      return next;
    });
  };

  const handlePosChange = (imageId, panelId, pos) => {
    setImagePositions((prev) => ({
      ...prev,
      [imageId]: {
        ...prev[imageId],
        [panelId]: { ...pos, imageId },
      },
    }));
  };

  const handlePrint = () => {
    setShowPrint(true);
    setTimeout(() => {
      window.print();
      setShowPrint(false);
    }, 300);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>PENTAX Optio RS1500 Skin Designer</h1>
        <p className={styles.subtitle}>
          Create, preview, and print custom RS1500 front skins
        </p>
      </header>

      <main className={styles.main}>
        {/* --- Settings Panel --- */}
        <section className={styles.sidebar}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>📷 Camera</h2>
            <select
              value={cameraId}
              onChange={(e) => {
                const nextCamera = CAMERAS.find((c) => c.id === e.target.value);
                setCameraId(e.target.value);
                setImagePositions(createStarterPositions(nextCamera));
                setImages(STARTER_PATTERNS);
                setActiveImageId(STARTER_PATTERNS[0].id);
                setActivePanelId(nextCamera.panels[0].id);
              }}
              className={styles.select}
            >
              {CAMERAS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <div className={styles.printSummary}>
              <strong>Up to {printLayout.capacity} skins per page</strong>
              <span>
                {patternCount} skins · {pageCount} {pageCount === 1 ? "page" : "pages"}
              </span>
              <span>{printLayout.columns} columns × {printLayout.rows} rows{printLayout.rotated ? " · rotated 90°" : ""}</span>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>📄 Paper Size</h2>
            <select
              value={paperId}
              onChange={(e) => setPaperId(e.target.value)}
              className={styles.select}
            >
              {PAPER_SIZES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label} ({p.widthMm}×{p.heightMm}mm)
                </option>
              ))}
            </select>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>🖼️ Image Upload</h2>
            <ImageUploader onUpload={handleImageUpload} />
            {images.length > 0 && (
              <div className={styles.imageList} aria-label="Uploaded images">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className={`${styles.imageItem} ${
                      activeImageId === image.id ? styles.imageItemActive : ""
                    }`}
                  >
                    <button
                      type="button"
                      className={styles.imageSelect}
                      onClick={() => setActiveImageId(image.id)}
                      title={image.name}
                    >
                      <img src={image.src} alt={image.name} className={styles.thumbImg} />
                      <span className={styles.imageName}>{image.name}</span>
                    </button>
                    <button
                      type="button"
                      className={styles.removeImage}
                      onClick={() => removeImage(image.id)}
                      aria-label={`Remove ${image.name}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {images.length > 0 && (
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>🎯 Selected Skin</h2>
              <div className={styles.panelPicker}>
                {camera.panels.map((p) => (
                  <button
                    key={p.id}
                    className={`${styles.panelBtn} ${
                      activePanelId === p.id ? styles.panelBtnActive : ""
                    }`}
                    onClick={() => setActivePanelId(p.id)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              {activePanelId && (
                <div className={styles.scaleControl}>
                  <label htmlFor="scale-input" className={styles.scaleLabel}>
                    Scale:{" "}
                    {((imagePositions[activeImageId]?.[activePanelId]?.scale ?? 1) * 100).toFixed(
                      0
                    )}
                    %
                  </label>
                  <input
                    id="scale-input"
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.05"
                    value={imagePositions[activeImageId]?.[activePanelId]?.scale ?? 1}
                    onChange={(e) =>
                      handlePosChange(activeImageId, activePanelId, {
                        ...(imagePositions[activeImageId]?.[activePanelId] ?? DEFAULT_IMAGE_POS),
                        scale: parseFloat(e.target.value),
                      })
                    }
                    className={styles.slider}
                  />
                </div>
              )}
            </div>
          )}

          <button className={styles.btnPrint} onClick={handlePrint}>
            🖨️ Print / Export PDF
          </button>
        </section>

        {/* --- Preview Area --- */}
        <section className={styles.preview}>
          <div className={styles.previewHeading}>
            <h2 className={styles.previewTitle}>Front skin previews — {camera.name}</h2>
            <span className={styles.previewCount}>{patternCount} patterns</span>
          </div>
          <div className={styles.panelGrid}>
            {images.flatMap((image) => camera.panels.map((panel) => (
              <div
                key={`${image.id}-${panel.id}`}
                className={`${styles.panelWrapper} ${
                  activePanelId === panel.id && activeImageId === image.id
                    ? styles.panelWrapperActive
                    : ""
                }`}
                onMouseDown={() => {
                  setActiveImageId(image.id);
                  setActivePanelId(panel.id);
                }}
              >
                <div className={styles.patternName} title={image.name}>{image.name}</div>
                <SkinCanvas
                  panel={panel}
                  image={image}
                  imagePos={
                    imagePositions[image.id]?.[panel.id] ?? DEFAULT_IMAGE_POS
                  }
                  onImagePosChange={(pos) => handlePosChange(image.id, panel.id, pos)}
                />
              </div>
            )))}
            {images.length === 0 && (
              <div className={styles.emptyPreview}>Upload images to preview every front skin here.</div>
            )}
          </div>

          {/* Print layout preview (shown only during print) */}
          {showPrint && (
            <div className={styles.printArea}>
              <PrintSheet
                camera={camera}
                paperSize={paperSize}
                images={images}
                imagePositions={imagePositions}
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
