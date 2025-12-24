"use client";
import React, { useRef, useState } from "react";

export default function SpotifyPlayer({ isAtEnd }: { isAtEnd?: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      // play() may be blocked by browser autoplay policies; ignore silently
      console.warn('Audio play blocked', err);
    }
  };

  return (
    <div className={`spotify-player ${isAtEnd ? 'player-right' : ''}`}>
      <audio 
        ref={audioRef}
        src="/Aliança.mp3"
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="spotify-header">
        <div className="spotify-info">
          <img 
            src="/Tribalistas_capa.jpg" 
            alt="Tribalistas" 
            className="spotify-artwork"
          />
          <div className="spotify-text">
            <h3>Aliança</h3>
            <p>Tribalistas</p>
          </div>
        </div>
        <svg className="spotify-logo" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      </div>

      <div className="spotify-controls">

        <button className="spotify-btn play-pause" onClick={togglePlay}>
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}