import { useState } from "react";
import { CAMERAS, PAPER_SIZES } from "./data/cameras";
import { SkinCanvas } from "./components/SkinCanvas";
import { ImageUploader } from "./components/ImageUploader";
import { PrintSheet } from "./components/PrintSheet";
import styles from "./App.module.css";

const DEFAULT_IMAGE_POS = { x: 0, y: 0, scale: 1 };

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
  const [images, setImages] = useState([]);
  const [activeImageId, setActiveImageId] = useState(null);
  // imagePositions: { [imageId]: { [panelId]: { x, y, scale, imageId } } }
  const [imagePositions, setImagePositions] = useState({});
  const [activePanelId, setActivePanelId] = useState(CAMERAS[0].panels[0].id);
  const [showPrint, setShowPrint] = useState(false);

  const camera = CAMERAS.find((c) => c.id === cameraId);
  const paperSize = PAPER_SIZES.find((p) => p.id === paperId);

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

  const applyActiveImage = () => {
    if (!activePanelId || !activeImageId) return;
    setImagePositions((current) => ({
      ...current,
      [activeImageId]: {
        ...current[activeImageId],
        [activePanelId]: { ...DEFAULT_IMAGE_POS, imageId: activeImageId },
      },
    }));
  };

  const removeImage = (imageId) => {
    setImages((current) => current.filter((image) => image.id !== imageId));
    setActiveImageId((current) => (current === imageId ? null : current));
    setImagePositions((current) => {
      const next = { ...current };
      delete next[imageId];
      return next;
    });
  };

  const handlePosChange = (panelId, pos) => {
    if (!activeImageId) return;
    setImagePositions((prev) => ({
      ...prev,
      [activeImageId]: {
        ...prev[activeImageId],
        [panelId]: { ...pos, imageId: activeImageId },
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
        <h1 className={styles.title}>Digicam Skin Designer</h1>
        <p className={styles.subtitle}>
          Design and print custom skins for your digital camera
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
                setImagePositions({});
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
              <h2 className={styles.cardTitle}>🎯 Apply To Skin</h2>
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
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={applyActiveImage}
                disabled={!activeImageId || !activePanelId}
              >
                Apply selected image
              </button>
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
                      handlePosChange(activePanelId, {
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
          <h2 className={styles.previewTitle}>
            Preview — {camera.name}
          </h2>
          <div className={styles.panelGrid}>
            {camera.panels.map((panel) => (
              <div
                key={panel.id}
                className={`${styles.panelWrapper} ${
                  activePanelId === panel.id ? styles.panelWrapperActive : ""
                }`}
                onClick={() => images.length && setActivePanelId(panel.id)}
              >
                <SkinCanvas
                  panel={panel}
                  image={images.find((image) => image.id === activeImageId)}
                  imagePos={
                    imagePositions[activeImageId]?.[panel.id] ?? DEFAULT_IMAGE_POS
                  }
                  onImagePosChange={(pos) => handlePosChange(panel.id, pos)}
                />
              </div>
            ))}
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
