"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * SPREAD I — ARRIVAL. The film hero.
 *
 * Film-only by design: the site allows itself ONE WebGL context, and the
 * island chapter owns it. Poster-first; the film never loads under reduced
 * motion or Save-Data, and pauses offscreen via the browser's own autoplay
 * heuristics plus the visible control.
 */

const SRC = {
  poster: "/media/hero.v2.poster.webp",
  webm: "/media/hero.v2.1080.webm",
  mp4: "/media/hero.v2.1080.mp4",
  mobile: "/media/hero.v2.mobile.mp4",
};

type NetworkInformation = { saveData?: boolean };

function heroCapability(): "static" | "film" {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return "static";
  const nav = navigator as Navigator & {
    connection?: NetworkInformation;
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) return "static";
  return "film";
}

export function ArrivalRelay({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<"static" | "film">("static");
  const [filmReady, setFilmReady] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    setMode(heroCapability());
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => {});
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const showFilm = mode !== "static";

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Poster: first paint and the permanent reduced-motion state. */}
      <img
        src={SRC.poster}
        alt=""
        aria-hidden
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-slow ease-si",
          filmReady && showFilm ? "opacity-0" : "opacity-100",
        )}
      />

      {showFilm ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={SRC.poster}
          onCanPlay={() => setFilmReady(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-slow ease-si",
            "object-center lg:object-[38%_center]",
            filmReady ? "opacity-100" : "opacity-0",
          )}
        >
          <source
            src={SRC.mobile}
            type="video/mp4"
            media="(max-width: 640px)"
          />
          <source src={SRC.webm} type="video/webm" />
          <source src={SRC.mp4} type="video/mp4" />
        </video>
      ) : null}

      {/* Scrims — the type column always sits on near-solid ink. */}
      {/* Scrims. The horizontal one holds the left column at near-solid ink
          so nothing in the film competes with the headline or the form. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink"
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0",
          // Explicit stops, not a three-token gradient: the copy column needs
          // SOLID ink under it, with the film emerging only past the halfway
          // mark. A soft via- ramp leaves the wordmark legible behind the H1.
          "bg-[linear-gradient(90deg,rgb(var(--si-ink))_0%,rgb(var(--si-ink))_30%,rgb(var(--si-ink)/0.82)_52%,rgb(var(--si-ink)/0.25)_78%,transparent_100%)]",
          "lg:bg-[linear-gradient(90deg,rgb(var(--si-ink))_0%,rgb(var(--si-ink))_44%,rgb(var(--si-ink)/0.7)_62%,transparent_88%)]",
        )}
      />

      {showFilm ? (
        <button
          type="button"
          onClick={toggle}
          className="absolute bottom-5 right-5 z-10 inline-flex h-11 w-11 items-center justify-center border border-on-ink/25 bg-ink/50 text-on-ink backdrop-blur-sm transition-colors duration-fast ease-si hover:border-gold hover:text-gold"
        >
          <span className="sr-only">
            {playing ? "Pause background film" : "Play background film"}
          </span>
          <span aria-hidden className="text-xs leading-none">
            {playing ? "❙❙" : "▶"}
          </span>
        </button>
      ) : null}
    </div>
  );
}
