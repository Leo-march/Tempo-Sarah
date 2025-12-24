"use client";
import React from "react";

export default function HeartBackground() {
  return (
    <div className="hearts">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className={`heart h-${i}`} />
      ))}
    </div>
  );
}
