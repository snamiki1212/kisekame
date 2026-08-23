import { useState } from "react";
import { CAMERAS, PAPER_SIZES } from "./data/cameras";
import { SkinCanvas } from "./components/SkinCanvas";
import { ImageUploader } from "./components/ImageUploader";
import { PrintSheet } from "./components/PrintSheet";
import styles from "./App.module.css";

const DEFAULT_IMAGE_POS = { x: 0, y: 0, scale: 1 };

export default function App() {
  const [cameraId, setCameraId] = useState(CAMERAS[0].id);
  const [paperId, setPaperId] = useState(PAPER_SIZES[0].id);
  const [uploadedImage, setUploadedImage] = useState(null);
  // imagePositions: { [panelId]: { x, y, scale } }
  const [imagePositions, setImagePositions] = useState({});
  const [activePanelId, setActivePanelId] = useState(null);
  const [showPrint, setShowPrint] = useState(false);

  const camera = CAMERAS.find((c) => c.id === cameraId);
  const paperSize = PAPER_SIZES.find((p) => p.id === paperId);

  const handleImageUpload = (dataUrl) => {
    setUploadedImage(dataUrl);
    // Reset positions for all panels
    const positions = {};
    camera.panels.forEach((p) => {
      positions[p.id] = { ...DEFAULT_IMAGE_POS };
    });
    setImagePositions(positions);
    setActivePanelId(camera.panels[0].id);
  };

  const handlePosChange = (panelId, pos) => {
    setImagePositions((prev) => ({ ...prev, [panelId]: pos }));
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
              onChange={(e) => setCameraId(e.target.value)}
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
            {uploadedImage && (
              <div className={styles.uploadedPreview}>
                <img src={uploadedImage} alt="Uploaded" className={styles.thumbImg} />
                <button
                  className={styles.btnSecondary}
                  onClick={() => {
                    setUploadedImage(null);
                    setImagePositions({});
                    setActivePanelId(null);
                  }}
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {uploadedImage && (
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>🎯 Apply To Panel</h2>
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
                    {((imagePositions[activePanelId]?.scale ?? 1) * 100).toFixed(
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
                    value={imagePositions[activePanelId]?.scale ?? 1}
                    onChange={(e) =>
                      handlePosChange(activePanelId, {
                        ...(imagePositions[activePanelId] ?? DEFAULT_IMAGE_POS),
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
                onClick={() => uploadedImage && setActivePanelId(panel.id)}
              >
                <SkinCanvas
                  panel={panel}
                  image={uploadedImage}
                  imagePos={
                    imagePositions[panel.id] ?? DEFAULT_IMAGE_POS
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
                imageSrc={uploadedImage}
                imagePositions={imagePositions}
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
