import { useRef, useState } from "react";
import styles from "./ImageUploader.module.css";

/**
 * ImageUploader handles drag-and-drop and file input upload.
 * Calls onUpload(files) when one or more images are selected.
 */
export function ImageUploader({ onUpload }) {
  const [draggingOver, setDraggingOver] = useState(false);
  const inputRef = useRef(null);

  const uploadFiles = (fileList) => {
    const files = Array.from(fileList).filter((file) =>
      file.type.startsWith("image/")
    );
    if (files.length) onUpload(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDraggingOver(false);
    uploadFiles(e.dataTransfer.files);
  };

  const handleChange = (e) => {
    uploadFiles(e.target.files);
    e.target.value = "";
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
          ? "Drop images here"
          : "Drag & drop images or click to upload"}
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className={styles.hidden}
      />
    </div>
  );
}
