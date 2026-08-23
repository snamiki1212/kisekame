import styles from "./PrintSheet.module.css";

const MM_TO_PX = 3.78;
const MARGIN_MM = 10;
const GAP_MM = 6;

/**
 * PrintSheet renders a print-ready layout of multiple skin panels on a single
 * sheet of the chosen paper size. Handles multi-row wrapping.
 */
export function PrintSheet({ camera, paperSize, imageSrc, imagePositions }) {
  const sheetWidth = paperSize.widthMm * MM_TO_PX;
  const sheetHeight = paperSize.heightMm * MM_TO_PX;

  const usableWidth = (paperSize.widthMm - MARGIN_MM * 2) * MM_TO_PX;
  const marginPx = MARGIN_MM * MM_TO_PX;
  const gapPx = GAP_MM * MM_TO_PX;

  // Tile panels across the sheet
  return (
    <div
      className={styles.sheet}
      style={{ width: sheetWidth, height: sheetHeight }}
    >
      <div
        className={styles.content}
        style={{ margin: marginPx, gap: gapPx, maxWidth: usableWidth }}
      >
        {camera.panels.map((panel) => {
          const pw = panel.widthMm * MM_TO_PX;
          const ph = panel.heightMm * MM_TO_PX;
          const pos = imagePositions?.[panel.id] ?? { x: 0, y: 0, scale: 1 };

          return (
            <div
              key={panel.id}
              className={styles.panel}
              style={{ width: pw, height: ph }}
            >
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt=""
                  style={{
                    position: "absolute",
                    left: pos.x,
                    top: pos.y,
                    transform: `scale(${pos.scale})`,
                    transformOrigin: "top left",
                    maxWidth: "none",
                  }}
                />
              )}
              <span className={styles.panelLabel}>{panel.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
