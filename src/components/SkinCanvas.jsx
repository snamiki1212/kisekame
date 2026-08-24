import { memo, useRef, useEffect, useState } from "react";
import styles from "./SkinCanvas.module.css";

const MM_TO_PX = 3.78; // 1mm ≈ 3.78px at 96dpi
const imageCache = new Map();

const getCachedImage = (src) => {
  if (!imageCache.has(src)) {
    const image = new Image();
    image.src = src;
    imageCache.set(src, image);
  }
  return imageCache.get(src);
};

/**
 * SkinCanvas renders a single skin panel with an optional uploaded image.
 * The image position can be adjusted via drag-and-drop inside the canvas.
 */
export const SkinCanvas = memo(function SkinCanvas({ panel, image, imagePos, onImagePosChange, theme = "light" }) {
  const canvasRef = useRef(null);
  const draggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const width = Math.round(panel.widthMm * MM_TO_PX);
  const height = Math.round(panel.heightMm * MM_TO_PX);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let cancelled = false;

    const shape = panel.shape
      ? new Path2D(panel.shape.path)
      : new Path2D(`M0 0 H${width} V${height} H0 Z`);
    const scaleX = panel.shape ? width / panel.shape.width : 1;
    const scaleY = panel.shape ? height / panel.shape.height : 1;

    const drawShape = (mode) => {
      ctx.save();
      if (panel.shape) ctx.scale(scaleX, scaleY);
      if (mode === "fill") {
        ctx.fillStyle = theme === "dark" ? "#102319" : "#ffffff";
        ctx.fill(shape, panel.shape?.fillRule ?? "nonzero");
      } else {
        ctx.strokeStyle = theme === "dark" ? "#547461" : "#555";
        ctx.lineWidth = panel.shape ? 1 / scaleX : 1;
        ctx.stroke(shape, panel.shape?.fillRule ?? "nonzero");
      }
      ctx.restore();
    };

    const draw = (img) => {
        if (cancelled) return;
        ctx.clearRect(0, 0, width, height);
        drawShape("fill");
        if (img) {
          ctx.save();
          if (panel.shape) ctx.scale(scaleX, scaleY);
          ctx.clip(shape, panel.shape?.fillRule ?? "nonzero");
          if (panel.shape) ctx.setTransform(1, 0, 0, 1, 0, 0);
          const renderScale = imagePos.scale;
          const tileWidth = img.naturalWidth * renderScale;
          const tileHeight = img.naturalHeight * renderScale;
          if (imagePos.repeat !== false && tileWidth > 0 && tileHeight > 0) {
            const startX = ((imagePos.x % tileWidth) + tileWidth) % tileWidth - tileWidth;
            const startY = ((imagePos.y % tileHeight) + tileHeight) % tileHeight - tileHeight;
            for (let x = startX; x < width; x += tileWidth) {
              for (let y = startY; y < height; y += tileHeight) {
                ctx.drawImage(img, x, y, tileWidth, tileHeight);
              }
            }
          } else {
            const centeredX = (width - tileWidth) / 2;
            const centeredY = (height - tileHeight) / 2;
            const drawX = image.sourceType === "pattern"
              ? Math.min(0, Math.max(width - tileWidth, centeredX + imagePos.x))
              : imagePos.x;
            const drawY = image.sourceType === "pattern"
              ? Math.min(0, Math.max(height - tileHeight, centeredY + imagePos.y))
              : imagePos.y;
            ctx.drawImage(img, drawX, drawY, tileWidth, tileHeight);
          }
          ctx.restore();
        }
        drawShape("stroke");
    };

    if (!image) {
      draw(null);
    } else {
      const img = getCachedImage(image.src);
      if (img.complete && img.naturalWidth) draw(img);
      else img.addEventListener("load", () => draw(img), { once: true });
    }
    return () => {
      cancelled = true;
    };
  }, [panel, image, imagePos, theme, width, height]);

  // Drag-and-drop to reposition image inside canvas
  const handlePointerDown = (e) => {
    if (!image) return;
    draggingRef.current = true;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      origX: imagePos.x,
      origY: imagePos.y,
    };
    e.preventDefault();
  };

  const handlePointerMove = (e) => {
    if (!draggingRef.current) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const scaleX = width / bounds.width;
    const scaleY = height / bounds.height;
    const dx = (e.clientX - dragStartRef.current.mouseX) * scaleX;
    const dy = (e.clientY - dragStartRef.current.mouseY) * scaleY;
    onImagePosChange({
      ...imagePos,
      x: dragStartRef.current.origX + dx,
      y: dragStartRef.current.origY + dy,
    });
  };

  const handlePointerUp = (e) => {
    draggingRef.current = false;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div className={styles.wrapper}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={styles.canvas}
        style={{ cursor: image ? (isDragging ? "grabbing" : "grab") : "pointer" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />
      <div className={styles.dimensions}>
        {panel.widthMm}mm × {panel.heightMm}mm (cut size)
      </div>
    </div>
  );
}, (previous, next) => (
  previous.panel === next.panel
  && previous.image === next.image
  && previous.imagePos === next.imagePos
  && previous.theme === next.theme
));
