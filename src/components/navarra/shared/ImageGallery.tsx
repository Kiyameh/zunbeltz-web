import { useState } from "react";
import type { ImageAsset } from "@/types/navarra/shared.types";
import styles from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: ImageAsset[];
  columns?: 2 | 3 | 4;
}

export default function ImageGallery({
  images,
  columns = 3,
}: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "ArrowLeft") goToPrevious();
  };

  return (
    <>
      <div className={`${styles.gallery} ${styles[`columns-${columns}`]}`}>
        {images.map((image, index) => (
          <button
            key={index}
            className={styles.thumbnail}
            onClick={() => openLightbox(index)}
            aria-label={`Ver imagen: ${image.alt}`}
          >
            <img src={image.url} alt={image.alt} loading="lazy" />
            {image.caption && (
              <span className={styles.caption}>{image.caption}</span>
            )}
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <div
          className={styles.lightbox}
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
          <button
            className={styles.closeButton}
            onClick={closeLightbox}
            aria-label="Cerrar galería"
          >
            ✕
          </button>

          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            aria-label="Imagen anterior"
          >
            ‹
          </button>

          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              className={styles.lightboxImage}
            />
            {images[currentIndex].caption && (
              <div className={styles.lightboxCaption}>
                {images[currentIndex].caption}
              </div>
            )}
            {images[currentIndex].photographer && (
              <div className={styles.photographer}>
                Foto: {images[currentIndex].photographer}
              </div>
            )}
          </div>

          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Imagen siguiente"
          >
            ›
          </button>

          <div className={styles.counter}>
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
