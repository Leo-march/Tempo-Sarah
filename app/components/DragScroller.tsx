"use client";
import React, { useRef, useEffect, useState } from "react";
import FinalScreen from "./FinalScreen";

const MESSAGES = [
  {
    title: "Nosso Início",
    text: "Meu amor, cada dia com você é um presente.",
    detail: "Desde o primeiro momento, soube que você era especial. Sua risada ilumina meus dias mais difíceis.",
    emoji: "💕"
  },
  {
    title: "Memórias Preciosas",
    text: "Lembro do nosso primeiro encontro como se fosse hoje.",
    detail: "Cada conversa, cada olhar, cada momento ao seu lado ficou guardado no meu coração para sempre.",
    emoji: "✨"
  },
  {
    title: "Nossa Jornada",
    text: "Rimos, choramos e crescemos juntos.",
    detail: "Em cada desafio, você esteve ao meu lado. Em cada conquista, você foi minha maior torcedora. Construímos algo lindo juntos.",
    emoji: "🌸"
  },
  {
    title: "Meu Porto Seguro",
    text: "Você é meu porto seguro e minha maior alegria.",
    detail: "Nos seus braços encontro paz. No seu olhar encontro lar. Com você, aprendi o verdadeiro significado de amor.",
    emoji: "💖"
  },
  {
    title: "Nosso Futuro",
    text: "Segure minha mão e continue comigo.",
    detail: "Quero viver cada momento ao seu lado. Quero criar mais memórias, mais sorrisos, mais amor. Para sempre.",
    emoji: "🌹"
  },
];

export default function DragScroller({ images }: { images: string[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const startY = useRef(0);
  const startScroll = useRef(0);
  const [isAtEnd, setIsAtEnd] = useState(false);

  function onPointerDown(e: React.PointerEvent) {
    const el = scrollerRef.current;
    if (!el) return;
    // don't start dragging when interacting with UI elements (like the spotify player)
    const tgt = e.target as Element | null;
    if (tgt && tgt.closest && tgt.closest('.spotify-player')) return;
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
    const h = window.innerHeight || document.documentElement.clientHeight;
    const idx = Math.round(el.scrollTop / h);
    el.scrollTo({ top: idx * h, behavior: "smooth" });
    // after smooth snap, re-evaluate position (small delay)
    setTimeout(() => {
      checkScroll();
    }, 500);
  }

  function checkScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    const h = window.innerHeight || document.documentElement.clientHeight;
    const sections = el.querySelectorAll('.page-section').length || (MESSAGES.length + 1);
    const idx = Math.round(el.scrollTop / h);
    setIsAtEnd(idx >= Math.max(0, sections - 1));
  }

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll);
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <div
      className="scroller-root"
      ref={scrollerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <header className={`hint ${isAtEnd ? 'hidden' : ''}`}>Arraste para baixo</header>

      <div className="sections">
        {MESSAGES.map((m, i) => (
          <section key={i} className="page-section">
            <div className="message-card">
              <div className="message-title">{m.title}</div>
              <div className="message-text">{m.text}</div>
              <span className="message-emoji">{m.emoji}</span>
              <div className="message-detail">{m.detail}</div>
            </div>
          </section>
        ))}

        <section className="page-section">
          <FinalScreen images={images} isAtEnd={isAtEnd} />
        </section>
      </div>
    </div>
  );
}