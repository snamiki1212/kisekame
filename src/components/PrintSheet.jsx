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
  const usableWidthMm = paperSize.widthMm - MARGIN_MM * 2;
  const usableHeightMm = paperSize.heightMm - MARGIN_MM * 2;
  const usableWidth = usableWidthMm * MM_TO_PX;
  const marginPx = MARGIN_MM * MM_TO_PX;
  const gapPx = GAP_MM * MM_TO_PX;
  const panel = camera.panels[0];

  const layouts = [false, true].map((rotated) => {
    const widthMm = rotated ? panel.heightMm : panel.widthMm;
    const heightMm = rotated ? panel.widthMm : panel.heightMm;
    const columns = Math.floor((usableWidthMm + GAP_MM) / (widthMm + GAP_MM));
    const rows = Math.floor((usableHeightMm + GAP_MM) / (heightMm + GAP_MM));
    return { rotated, widthMm, heightMm, columns, rows, capacity: columns * rows };
  });
  const layout = layouts.reduce((best, candidate) =>
    candidate.capacity > best.capacity ? candidate : best
  );
  const patterns = images.flatMap((image) =>
    camera.panels.map((item) => ({ image, panel: item }))
  );
  const pages = Array.from(
    { length: Math.max(1, Math.ceil(patterns.length / layout.capacity)) },
    (_, pageIndex) =>
      patterns.slice(pageIndex * layout.capacity, (pageIndex + 1) * layout.capacity)
  );

  return (
    <div className={styles.pages}>
      {pages.map((pagePatterns, pageIndex) => (
        <div
          key={pageIndex}
          className={styles.sheet}
          style={{ width: sheetWidth, height: sheetHeight }}
        >
          <div
            className={styles.content}
            style={{
              margin: marginPx,
              gap: gapPx,
              width: usableWidth,
              gridTemplateColumns: `repeat(${layout.columns}, ${layout.widthMm * MM_TO_PX}px)`,
            }}
          >
            {pagePatterns.map(({ panel, image }, patternIndex) => {
          const pw = panel.widthMm * MM_TO_PX;
          const ph = panel.heightMm * MM_TO_PX;
          const pos = imagePositions?.[image.id]?.[panel.id] ?? { x: 0, y: 0, scale: 1 };
          const shapeId = `print-shape-${camera.id}-${panel.id}-${pageIndex}-${patternIndex}`;

          return (
            <div
              key={`${image.id}-${panel.id}`}
              className={styles.slot}
              style={{ width: layout.widthMm * MM_TO_PX, height: layout.heightMm * MM_TO_PX }}
            >
              <div
                className={styles.panel}
                style={{
                  width: pw,
                  height: ph,
                  transform: layout.rotated ? `translateX(${ph}px) rotate(90deg)` : undefined,
                }}
              >
                <svg viewBox={panel.shape?.viewBox ?? `0 0 ${pw} ${ph}`} className={styles.template} aria-label={`${panel.label}: ${image.name}`}>
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
            </div>
          );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
