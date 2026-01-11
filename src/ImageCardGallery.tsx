import React, { useMemo, useState } from "react";
import "./ImageCardGallery.css";

type ImageCardGalleryProps = {
  images: string[];
  mapPlaceholderUrl: string;
  className?: string;
};

export function ImageCardGallery({
  images,
  mapPlaceholderUrl,
  className,
}: ImageCardGalleryProps) {
  const [selection, setSelection] = useState<{ type: "map" } | { type: "image"; index: number }>(
    { type: "image", index: 0 }
  );

  const mainImage = selection.type === "map" ? mapPlaceholderUrl : images[selection.index] ?? "";

  // Slot 1 reserved for map placeholder => remaining 3 slots for images
  const visibleImages = useMemo(() => images.slice(0, 3), [images]);
  const remainingCount = Math.max(0, images.length - 3);

  return (
    <div className={["icg-card", className].filter(Boolean).join(" ")}>
      <div className="icg-main">
        {mainImage ? (
          <img src={mainImage} alt="Selected" className="icg-main-img" />
        ) : (
          <div className="icg-main-placeholder">No image</div>
        )}
      </div>

      <div className="icg-thumbs">
        <button
          type="button"
          className={
            selection.type === "map" ? "icg-thumb-btn icg-thumb--selected" : "icg-thumb-btn"
          }
          aria-label="Map"
          onClick={() => setSelection({ type: "map" })}
        >
          <div className="icg-thumb-wrap">
            <img src={mapPlaceholderUrl} alt="Map" className="icg-thumb-img" />
          </div>
        </button>

        {visibleImages.map((src, i) => {
          const isSelected = selection.type === "image" && selection.index === i;
          const isLastVisibleSlot = i === 2;
          const showOverlay = isLastVisibleSlot && remainingCount > 0;

          return (
            <button
              key={src + i}
              type="button"
              className={isSelected ? "icg-thumb-btn icg-thumb--selected" : "icg-thumb-btn"}
              onClick={() => setSelection({ type: "image", index: i })}
            >
              <div className="icg-thumb-wrap">
                <img src={src} alt={`Thumbnail ${i + 1}`} className="icg-thumb-img" />
                {showOverlay && <div className="icg-overlay">+{remainingCount}</div>}
              </div>
            </button>
          );
        })}

        {Array.from({ length: Math.max(0, 3 - visibleImages.length) }).map((_, idx) => (
          <div key={`empty-${idx}`} className="icg-thumb-empty" />
        ))}
      </div>
    </div>
  );
}
