"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * Poster-first hero film.
 *
 * The previous hero pulled a 5.98 MB, 59.5s MP4 with `preload="auto"`, no
 * poster, no source fallback, no pause control, and no reduced-motion path —
 * roughly 6 MB on every visit, mobile and metered included, with a black
 * viewport until first-frame decode.
 *
 * This is a 7.4s black-field cut, 475 KB, and the poster is what paints first.
 * The video only ever loads if the visitor's environment says it should.
 */

const SOURCES = {
  poster: "/media/hero.v2.poster.webp",
  webm: "/media/hero.v2.1080.webm",
  mp4: "/media/hero.v2.1080.mp4",
  mobile: "/media/hero.v2.mobile.mp4",
};

type NetworkInformation = { saveData?: boolean };

export function HeroVideo({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(true);

  // Decide once whether the film is appropriate at all.
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const saveData =
      (navigator as Navigator & { connection?: NetworkInformation }).connection
        ?.saveData === true;
    if (!reduced && !saveData) setEnabled(true);
  }, []);

  // Pause offscreen and when the tab is hidden — never decode unseen frames.
  useEffect(() => {
    if (!enabled) return;
    const el = wrapRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && playing) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.1 },
    );
    io.observe(el);

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else if (playing) void video.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled, playing]);

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

  return (
    <div
      ref={wrapRef}
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      {/* The poster is the dependable first paint and the permanent fallback.
          A plain <img> on purpose: next/image would add a layout wrapper and a
          second request path for an asset that must paint immediately. */}
      <img
        src={SOURCES.poster}
        alt=""
        aria-hidden
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-slow ease-si",
          ready ? "opacity-0" : "opacity-100",
        )}
      />

      {enabled ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={SOURCES.poster}
          onCanPlay={() => setReady(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-slow ease-si",
            // The bottle sits centre-frame; on wide viewports push it right so the
            // headline column keeps clean ink underneath it.
            "object-center lg:object-[72%_center]",
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          {/* Portrait crop first — the media query decides before bytes move. */}
          <source
            src={SOURCES.mobile}
            type="video/mp4"
            media="(max-width: 640px)"
          />
          <source src={SOURCES.webm} type="video/webm" />
          <source src={SOURCES.mp4} type="video/mp4" />
        </video>
      ) : null}

      {/* Scrim. Two gradients: vertical for the header and the section seam,
          horizontal so the headline column always sits on near-solid ink while
          the bottle stays legible in the right of the frame. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/40 to-ink"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent lg:hidden"
      />

      {enabled ? (
        <button
          type="button"
          onClick={toggle}
          className={cn(
            "absolute bottom-5 right-5 z-10 inline-flex h-11 w-11 items-center justify-center",
            "rounded-pill border border-on-ink/25 bg-ink/50 text-on-ink backdrop-blur-sm",
            "transition-colors duration-fast ease-si hover:border-gold hover:text-gold",
          )}
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
