import React from "react";
import { ImageCardGallery } from "./ImageCardGallery";

export default function App() {
  return (
    <div style={pageStyles.wrap}>
      <div style={pageStyles.header}>
        <div style={pageStyles.title}>Image Card Gallery</div>
        <div style={pageStyles.subtitle}>
          Large image + 4 small (first is map placeholder) + overlay for remaining.
        </div>
      </div>

      <ImageCardGallery
        mapPlaceholderUrl="https://via.placeholder.com/200x200?text=Map"
        images={[
          "https://picsum.photos/id/1015/800/600",
          "https://picsum.photos/id/1016/800/600",
          "https://picsum.photos/id/1018/800/600",
          "https://picsum.photos/id/1020/800/600",
          "https://picsum.photos/id/1024/800/600",
        ]}
      />
    </div>
  );
}

const pageStyles: Record<string, React.CSSProperties> = {
  wrap: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 24,
    gap: 16,
  },
  header: {
    width: 420,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: "#6b7280",
  },
};
