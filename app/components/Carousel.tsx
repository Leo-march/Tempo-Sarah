"use client";
import React, { useEffect, useState } from "react";

type Props = { images: string[]; intervalMs?: number };

export default function Carousel({ images, intervalMs = 3500 }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  if (images.length === 0) {
    return (
      <div style={{
        margin: '32px auto',
        padding: '40px',
        maxWidth: '480px',
        background: '#ffffff',
        borderRadius: '4px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: '18px', color: '#999' }}>
          Sem imagens
        </div>
      </div>
    );
  }

  return (
    <div style={{
      margin: '0 auto',
      position: 'relative',
      width: '100%',
      maxWidth: '350px',
      background: '#ffffff',
      borderRadius: '4px',
      padding: '16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.08)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{
        width: '100%',
        position: 'relative'
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '125%',
          overflow: 'hidden',
          background: '#f8f8f8',
          borderRadius: '2px'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0
          }}>
            {images.map((src, i) => (
              <div key={src + i} style={{ 
                position: 'absolute',
                inset: 0,
                opacity: i === index ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                zIndex: i === index ? 2 : 1
              }}>
                <img
                  src={src}
                  alt={`slide-${i}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        marginTop: '12px',
        display: 'flex',
        gap: '6px',
        zIndex: 10,
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxHeight: '60px',
        overflow: 'auto'
      }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '999px',
              background: i === index ? 'linear-gradient(135deg, #ff6b9d, #ff8fb3)' : 'rgba(255, 197, 217, 0.5)',
              border: `2px solid ${i === index ? '#ff6b9d' : 'rgba(139, 76, 109, 0.3)'}`,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: i === index ? '0 2px 8px rgba(255, 107, 157, 0.4)' : 'none',
              flexShrink: 0
            }}
          />
        ))}
      </div>
    </div>
  );
}