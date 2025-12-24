"use client";
import Carousel from "./Carousel";
import dynamic from "next/dynamic";
import TimeTogether from "./TimeTogether";
import SpotifyPlayer from "./SpotifyPlayer";

const HeartBackground = dynamic(() => import("./HeartBackground"), { ssr: false });

export default function FinalScreen({ images, isAtEnd }: { images: string[]; isAtEnd?: boolean }) {
  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          .final-content-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: auto auto !important;
            gap: 30px !important;
            align-items: start !important;
          }
          .time-section {
            grid-column: 1;
            grid-row: 1;
          }
          .carousel-section {
            grid-column: 2;
            grid-row: 1 / 3;
            display: flex;
            align-items: center;
          }
          .spotify-section {
            grid-column: 1;
            grid-row: 2;
          }
        }
      `}</style>
      
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        background: 'linear-gradient(135deg, #ffd4e5 0%, #ffe5f0 50%, #fff5f7 100%)',
        padding: '40px 20px'
      }}>
        <HeartBackground />
        
        <div className="final-content-grid" style={{
          position: 'relative',
          zIndex: 20,
          maxWidth: '900px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center'
        }}>
          {/* Tempo */}
          <div className="time-section" style={{
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '20px 25px',
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(139, 76, 109, 0.15)',
            backdropFilter: 'blur(10px)',
            width: '100%',
            maxWidth: '500px'
          }}>
            <h2 style={{
              fontSize: '1.4rem',
              marginBottom: '12px',
              fontWeight: 400,
              color: '#5a3647',
              letterSpacing: '0.5px',
              textAlign: 'center'
            }}>
              Quanto tempo nós estamos juntos
            </h2>
            <TimeTogether startDate="2024-03-13T00:00:00" />
          </div>

          {/* Carrossel */}
          <div className="carousel-section" style={{ width: '100%', maxWidth: '400px' }}>
            <Carousel images={images} />
          </div>
          
          {/* Spotify */}
          <div className="spotify-section" style={{ width: '100%', maxWidth: '500px' }}>
            <SpotifyPlayer isAtEnd={!!isAtEnd} />
          </div>
        </div>
      </div>
    </>
  );
}