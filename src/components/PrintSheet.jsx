import styles from "./PrintSheet.module.css";

const MM_TO_PX = 3.78;
const MARGIN_MM = 10;
const GAP_MM = 6;

export function getBestPrintLayout(camera, paperSize) {
  const panel = camera.panels[0];
  const usableWidthMm = paperSize.widthMm - MARGIN_MM * 2;
  const usableHeightMm = paperSize.heightMm - MARGIN_MM * 2;
  const layouts = [false, true].map((rotated) => {
    const widthMm = rotated ? panel.heightMm : panel.widthMm;
    const heightMm = rotated ? panel.widthMm : panel.heightMm;
    const columns = Math.floor((usableWidthMm + GAP_MM) / (widthMm + GAP_MM));
    const rows = Math.floor((usableHeightMm + GAP_MM) / (heightMm + GAP_MM));
    return { rotated, widthMm, heightMm, columns, rows, capacity: columns * rows };
  });

  return layouts.reduce((best, candidate) =>
    candidate.capacity > best.capacity ? candidate : best
  );
}

/**
 * PrintSheet renders a print-ready layout of multiple skin panels on a single
 * sheet of the chosen paper size. Handles multi-row wrapping.
 */
export function PrintSheet({ camera, paperSize, skins }) {
  const usableWidthMm = paperSize.widthMm - MARGIN_MM * 2;
  const layout = getBestPrintLayout(camera, paperSize);
  const patterns = skins.flatMap((skin) =>
    camera.panels.map((item) => ({ skin, panel: item }))
  );
  const pages = Array.from(
    { length: Math.max(1, Math.ceil(patterns.length / layout.capacity)) },
    (_, pageIndex) =>
      patterns.slice(pageIndex * layout.capacity, (pageIndex + 1) * layout.capacity)
  );

  return (
    <div className={styles.pages}>
      <style>{`@page { size: ${paperSize.widthMm}mm ${paperSize.heightMm}mm; margin: 0; }`}</style>
      {pages.map((pagePatterns, pageIndex) => (
        <div
          key={pageIndex}
          className={styles.sheet}
          style={{ width: `${paperSize.widthMm}mm`, height: `${paperSize.heightMm - 0.1}mm` }}
        >
          <div
            className={styles.content}
            style={{
              margin: `${MARGIN_MM}mm`,
              gap: `${GAP_MM}mm`,
              width: `${usableWidthMm}mm`,
              gridTemplateColumns: `repeat(${layout.columns}, ${layout.widthMm}mm)`,
            }}
          >
            {pagePatterns.map(({ panel, skin }, patternIndex) => {
          const pw = panel.widthMm * MM_TO_PX;
          const ph = panel.heightMm * MM_TO_PX;
          const image = skin.image;
          const pos = skin.positions?.[panel.id] ?? { x: 0, y: 0, scale: 1 };
          const imageWidthPx = (image?.width ?? 0) * pos.scale;
          const imageHeightPx = (image?.height ?? 0) * pos.scale;
          const imageX = image?.sourceType === "pattern" ? (pw - imageWidthPx) / 2 + pos.x : pos.x;
          const imageY = image?.sourceType === "pattern" ? (ph - imageHeightPx) / 2 + pos.y : pos.y;
          const shapeId = `print-shape-${camera.id}-${panel.id}-${pageIndex}-${patternIndex}`;

          return (
            <div
              key={`${skin.id}-${panel.id}`}
              className={styles.slot}
              style={{ width: `${layout.widthMm}mm`, height: `${layout.heightMm}mm` }}
            >
              <div
                className={styles.panel}
                style={{
                  width: `${panel.widthMm}mm`,
                  height: `${panel.heightMm}mm`,
                  transform: layout.rotated ? `translateX(${panel.heightMm}mm) rotate(90deg)` : undefined,
                }}
              >
                <svg viewBox={panel.shape?.viewBox ?? `0 0 ${pw} ${ph}`} className={styles.template} aria-label={`${panel.label}: ${image?.name ?? "Empty"}`}>
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
                  {image?.sourceType === "color" && (
                    <rect width="100%" height="100%" fill={image.color} />
                  )}
                  {image && image.sourceType !== "color" && (
                    <image
                      href={image.src}
                      x={imageX / MM_TO_PX * (panel.shape?.width / panel.widthMm || 1)}
                      y={imageY / MM_TO_PX * (panel.shape?.height / panel.heightMm || 1)}
                      width={imageWidthPx / MM_TO_PX * (panel.shape?.width / panel.widthMm || 1)}
                      height={imageHeightPx / MM_TO_PX * (panel.shape?.height / panel.heightMm || 1)}
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
          <div className={styles.printBrand} aria-hidden="true">#KISEKAME</div>
        </div>
      ))}
    </div>
  );
}
