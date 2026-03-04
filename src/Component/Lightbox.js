import React, { useEffect } from "react";

const Lightbox = ({ images = [], startIndex = 0, onClose }) => {
  const [index, setIndex] = React.useState(startIndex || 0);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, onClose]);

  useEffect(() => setIndex(startIndex), [startIndex]);

  if (!images || images.length === 0) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <button
          className="lightbox-nav prev"
          onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
          aria-label="Previous"
        >
          ‹
        </button>
        <img src={images[index]} alt="" className="lightbox-image" />
        <button
          className="lightbox-nav next"
          onClick={() => setIndex((i) => (i + 1) % images.length)}
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Lightbox;
