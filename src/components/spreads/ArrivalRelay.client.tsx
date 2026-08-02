"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * SPREAD I — ARRIVAL. The film panel.
 *
 * This fills its own grid column rather than the whole hero. That is the
 * whole design: the jar and the wordmark are dead-centre in the footage, so
 * any layout that runs type across the film puts the headline on top of the
 * product no matter how hard the scrim is pushed. Giving the film a column
 * makes the overlap structurally impossible instead of merely dark.
 *
 * Consequently there are no scrims here beyond the edge blends that stop the
 * panel from reading as a pasted-in rectangle.
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
    <div className={cn("absolute inset-0 overflow-hidden bg-ink", className)}>
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

      {/* Edge blends only. Each one dissolves a boundary of the panel into the
          ink around it; none of them cross the product. Vertical below the
          lg breakpoint (copy sits under the film), horizontal above it (copy
          sits beside the film). */}
      {/* Multi-stop ramps rather than Tailwind's two-token `from-/to-`
          gradients. The footage's black is a few points lighter than
          `--si-ink`, so a linear fade to transparent lands on a step the eye
          reads as a pasted-in rectangle edge. Easing the falloff out over a
          long tail hides the boundary entirely. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(0deg,rgb(var(--si-ink))_0%,rgb(var(--si-ink)/0.55)_42%,transparent_100%)] xl:h-48"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgb(var(--si-ink)/0.9)_0%,rgb(var(--si-ink)/0.4)_46%,transparent_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[42%] bg-[linear-gradient(90deg,rgb(var(--si-ink))_0%,rgb(var(--si-ink)/0.88)_20%,rgb(var(--si-ink)/0.5)_50%,rgb(var(--si-ink)/0.16)_76%,transparent_100%)] xl:block"
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
