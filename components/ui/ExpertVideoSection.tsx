"use client";

import { useState } from "react";
import { Play } from "lucide-react";

interface ExpertVideoSectionProps {
  videoSrc: string;
  posterSrc: string;
  title: string;
}

export default function ExpertVideoSection({ videoSrc, posterSrc, title }: ExpertVideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-16 bg-[var(--color-bg-soft)]">
      <div className="container-page max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-2 text-center">
          {title}
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-8 text-center">
          Dr. Lisa DeRosimo, MD — Amare Scientific Advisory Board
        </p>
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-lg">
          {isPlaying ? (
            <video
              src={videoSrc}
              controls
              autoPlay
              playsInline
              className="w-full h-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 w-full h-full group"
              aria-label={`Video afspelen: ${title}`}
            >
              <img
                src={posterSrc}
                alt={`${title} — video met Dr. Lisa DeRosimo, Amare Scientific Advisory Board`}
                className="w-full h-full object-cover"
              />
              <span className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <span className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                  <Play size={28} className="text-[var(--color-primary)] ml-1" fill="currentColor" />
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
