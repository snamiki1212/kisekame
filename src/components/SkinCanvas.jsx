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

    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Draw uploaded image if present
    if (image) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(
          img,
          imagePos.x,
          imagePos.y,
          img.naturalWidth * imagePos.scale,
          img.naturalHeight * imagePos.scale
        );
        // Redraw border on top
        ctx.strokeStyle = "#555";
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, width, height);
      };
      img.src = image;
    }

    // Border
    ctx.strokeStyle = "#555";
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, width, height);

    // Panel label
    ctx.fillStyle = image ? "rgba(0,0,0,0.3)" : "#aaa";
    ctx.font = "11px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (!image) {
      ctx.fillText(panel.label, width / 2, height / 2);
    }
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
        {panel.widthMm}mm × {panel.heightMm}mm
      </div>
    </div>
  );
}
