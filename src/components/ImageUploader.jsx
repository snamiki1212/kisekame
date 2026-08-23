import { useRef, useState } from "react";
import styles from "./ImageUploader.module.css";

/**
 * ImageUploader handles drag-and-drop and file input upload.
 * Calls onUpload(files) when one or more images are selected.
 */
export function ImageUploader({ onUpload, labels, disabled = false }) {
  const [draggingOver, setDraggingOver] = useState(false);
  const inputRef = useRef(null);

  const uploadFiles = (fileList) => {
    const files = Array.from(fileList).filter(
      (file) => file.type.startsWith("image/") || /\.hei[cf]$/i.test(file.name)
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
      className={`${styles.dropzone} ${draggingOver ? styles.active : ""} ${disabled ? styles.disabled : ""}`}
      onDragOver={(e) => {
        if (disabled) return;
        e.preventDefault();
        setDraggingOver(true);
      }}
      onDragLeave={() => setDraggingOver(false)}
      onDrop={(e) => !disabled && handleDrop(e)}
      onClick={() => !disabled && inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => !disabled && e.key === "Enter" && inputRef.current?.click()}
      aria-label={labels.uploadLabel}
    >
      <span className={styles.icon}>📷</span>
      <p className={styles.text}>
        {draggingOver
          ? labels.dropHere
          : labels.dragDrop}
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.heic,.heif"
        multiple
        disabled={disabled}
        onChange={handleChange}
        className={styles.hidden}
      />
    </div>
  );
}
