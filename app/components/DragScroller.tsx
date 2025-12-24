"use client";
import React, { useRef } from "react";
import FinalScreen from "./FinalScreen";

const MESSAGES = [
  "Meu amor, cada dia com você é um presente.",
  "Lembro do nosso primeiro encontro como se fosse hoje.",
  "Rimos, choramos e crescemos juntos.",
  "Você é meu porto seguro e minha maior alegria.",
  "Segure minha mão e continue comigo.",
];

export default function DragScroller({ images }: { images: string[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const startY = useRef(0);
  const startScroll = useRef(0);

  function onPointerDown(e: React.PointerEvent) {
    const el = scrollerRef.current;
    if (!el) return;
    dragging.current = true;
    startY.current = e.clientY;
    startScroll.current = el.scrollTop;
    (e.target as Element).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    const el = scrollerRef.current;
    if (!el || !dragging.current) return;
    const dy = e.clientY - startY.current;
    el.scrollTop = startScroll.current - dy;
  }

  function onPointerUp(e: React.PointerEvent) {
    const el = scrollerRef.current;
    dragging.current = false;
    try {
      (e.target as Element).releasePointerCapture(e.pointerId);
    } catch (err) {}
    if (!el) return;
    // Snap to nearest full viewport section
    const h = window.innerHeight || document.documentElement.clientHeight;
    const idx = Math.round(el.scrollTop / h);
    el.scrollTo({ top: idx * h, behavior: "smooth" });
  }

  return (
    <div
      className="scroller-root"
      ref={scrollerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <header className="hint">Arraste para baixo</header>

      <div className="sections">
        {MESSAGES.map((m, i) => (
          <section key={i} className="page-section">
            <div className="message-card">
              <p>{m}</p>
            </div>
          </section>
        ))}

        <section className="page-section">
          <FinalScreen images={images} />
        </section>
      </div>
    </div>
  );
}
