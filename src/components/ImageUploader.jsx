import { useRef, useState } from "react";
import styles from "./ImageUploader.module.css";

/**
 * ImageUploader handles drag-and-drop and file input upload.
 * Calls onUpload(dataUrl) when an image is selected.
 */
export function ImageUploader({ onUpload }) {
  const [draggingOver, setDraggingOver] = useState(false);
  const inputRef = useRef(null);

  const readFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => onUpload(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDraggingOver(false);
    const file = e.dataTransfer.files[0];
    readFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    readFile(file);
  };

  return (
    <div
      className={`${styles.dropzone} ${draggingOver ? styles.active : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDraggingOver(true);
      }}
      onDragLeave={() => setDraggingOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      aria-label="Upload image"
    >
      <span className={styles.icon}>📷</span>
      <p className={styles.text}>
        {draggingOver
          ? "Drop image here"
          : "Drag & drop an image or click to upload"}
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className={styles.hidden}
      />
    </div>
  );
}
