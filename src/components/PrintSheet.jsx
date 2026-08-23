import styles from "./PrintSheet.module.css";

const MM_TO_PX = 3.78;
const MARGIN_MM = 10;
const GAP_MM = 6;

/**
 * PrintSheet renders a print-ready layout of multiple skin panels on a single
 * sheet of the chosen paper size. Handles multi-row wrapping.
 */
export function PrintSheet({ camera, paperSize, images, imagePositions }) {
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
          const image = images.find((item) => item.id === pos.imageId);
          const shapeId = `print-shape-${camera.id}-${panel.id}`;

          return (
            <div
              key={panel.id}
              className={styles.panel}
              style={{ width: pw, height: ph }}
            >
              <svg
                viewBox={panel.shape?.viewBox ?? `0 0 ${pw} ${ph}`}
                className={styles.template}
                aria-label={panel.label}
              >
                <defs>
                  <clipPath id={shapeId} clipPathUnits="userSpaceOnUse">
                    <path
                      d={panel.shape?.path ?? `M0 0 H${pw} V${ph} H0 Z`}
                      fillRule={panel.shape?.fillRule}
                      clipRule={panel.shape?.fillRule}
                    />
                  </clipPath>
                </defs>
                <g clipPath={`url(#${shapeId})`}>
                  <rect width="100%" height="100%" fill="#fff" />
                  {image && (
                    <image
                      href={image.src}
                      x={pos.x / MM_TO_PX * (panel.shape?.width / panel.widthMm || 1)}
                      y={pos.y / MM_TO_PX * (panel.shape?.height / panel.heightMm || 1)}
                      width={image.width * pos.scale / MM_TO_PX * (panel.shape?.width / panel.widthMm || 1)}
                      height={image.height * pos.scale / MM_TO_PX * (panel.shape?.height / panel.heightMm || 1)}
                      preserveAspectRatio="none"
                    />
                  )}
                </g>
                <path
                  d={panel.shape?.path ?? `M0 0 H${pw} V${ph} H0 Z`}
                  fill="none"
                  stroke="#555"
                  strokeWidth="0.35"
                  fillRule={panel.shape?.fillRule}
                />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
}
