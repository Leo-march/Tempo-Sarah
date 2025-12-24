"use client";
import React, { useEffect, useState } from "react";

type Props = { images: string[]; intervalMs?: number };

export default function Carousel({ images, intervalMs = 3500 }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <div className="carousel">
      <div className="carousel-image-container">
        {images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            className={`carousel-img ${i === index ? "visible" : "hidden"}`}
            alt={`slide-${i}`}
          />
        ))}
      </div>
      <div className="carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}