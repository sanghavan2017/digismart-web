"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);

  function prev() {
    setIndex(i => (i - 1 + images.length) % images.length);
  }
  function next() {
    setIndex(i => (i + 1) % images.length);
  }

  return (
    <div style={{ position: "relative" }}>
      <Image src={images[index]} alt={alt} width={500} height={500} style={{ width: "100%", height: "auto", display: "block" }} />
      {images.length > 1 && (
        <>
          <button onClick={prev} aria-label="Ảnh trước"
            style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.85)", border: "1px solid var(--border)", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
            ‹
          </button>
          <button onClick={next} aria-label="Ảnh sau"
            style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.85)", border: "1px solid var(--border)", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
            ›
          </button>
          <div style={{ position: "absolute", bottom: 10, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6 }}>
            {images.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} aria-label={`Ảnh ${i + 1}`}
                style={{ width: 8, height: 8, borderRadius: "50%", border: "none", padding: 0, cursor: "pointer", background: i === index ? "var(--brand)" : "rgba(0,0,0,0.2)" }} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
