"use client";
import Carousel from "./Carousel";
import dynamic from "next/dynamic";
import TimeTogether from "./TimeTogether";
import SpotifyPlayer from "./SpotifyPlayer";

const HeartBackground = dynamic(() => import("./HeartBackground"), { ssr: false });

export default function FinalScreen({ images, isAtEnd }: { images: string[]; isAtEnd?: boolean }) {
  return (
    <div className="final-root">
      <HeartBackground />
      <div className="final-content">
        <h2 className="final-title">Quanto tempo nós estamos juntos</h2>
        <TimeTogether startDate="2024-03-13T00:00:00" />
        <Carousel images={images} />
        <SpotifyPlayer isAtEnd={!!isAtEnd} />
      </div>
    </div>
  );
}