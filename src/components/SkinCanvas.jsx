import { useRef, useEffect } from "react";
import styles from "./SkinCanvas.module.css";

const MM_TO_PX = 3.78; // 1mm ≈ 3.78px at 96dpi

/**
 * SkinCanvas renders a single skin panel with an optional uploaded image.
 * The image position can be adjusted via drag-and-drop inside the canvas.
 */
export function SkinCanvas({ panel, image, imagePos, onImagePosChange }) {
  const canvasRef = useRef(null);
  const draggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const width = Math.round(panel.widthMm * MM_TO_PX);
  const height = Math.round(panel.heightMm * MM_TO_PX);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let cancelled = false;

    ctx.clearRect(0, 0, width, height);

    const shape = panel.shape
      ? new Path2D(panel.shape.path)
      : new Path2D(`M0 0 H${width} V${height} H0 Z`);
    const scaleX = panel.shape ? width / panel.shape.width : 1;
    const scaleY = panel.shape ? height / panel.shape.height : 1;

    const drawShape = (mode) => {
      ctx.save();
      if (panel.shape) ctx.scale(scaleX, scaleY);
      if (mode === "fill") {
        ctx.fillStyle = "#ffffff";
        ctx.fill(shape, panel.shape?.fillRule ?? "nonzero");
      } else {
        ctx.strokeStyle = "#555";
        ctx.lineWidth = panel.shape ? 1 / scaleX : 1;
        ctx.stroke(shape, panel.shape?.fillRule ?? "nonzero");
      }
      ctx.restore();
    };

    drawShape("fill");

    // Draw uploaded image if present
    if (image) {
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        ctx.clearRect(0, 0, width, height);
        drawShape("fill");
        ctx.save();
        if (panel.shape) ctx.scale(scaleX, scaleY);
        ctx.clip(shape, panel.shape?.fillRule ?? "nonzero");
        if (panel.shape) ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(
          img,
          imagePos.x,
          imagePos.y,
          img.naturalWidth * imagePos.scale,
          img.naturalHeight * imagePos.scale
        );
        ctx.restore();
        drawShape("stroke");
      };
      img.src = image.src;
    }
    drawShape("stroke");

    // Panel label
    ctx.fillStyle = image ? "rgba(0,0,0,0.3)" : "#aaa";
    ctx.font = "11px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (!image) {
      ctx.fillText("Upload artwork", width / 2, height / 2);
    }
    return () => {
      cancelled = true;
    };
  }, [panel, image, imagePos, width, height]);

  // Drag-and-drop to reposition image inside canvas
  const handleMouseDown = (e) => {
    if (!image) return;
    draggingRef.current = true;
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      origX: imagePos.x,
      origY: imagePos.y,
    };
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.mouseX;
    const dy = e.clientY - dragStartRef.current.mouseY;
    onImagePosChange({
      ...imagePos,
      x: dragStartRef.current.origX + dx,
      y: dragStartRef.current.origY + dy,
    });
  };

  const handleMouseUp = () => {
    draggingRef.current = false;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{panel.label}</div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={styles.canvas}
        style={{ cursor: image ? "move" : "default" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      <div className={styles.dimensions}>
        {panel.widthMm}mm × {panel.heightMm}mm (cut size)
      </div>
    </div>
  );
}
