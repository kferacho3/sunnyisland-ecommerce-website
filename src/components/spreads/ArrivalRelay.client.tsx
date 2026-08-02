"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * SPREAD I — ARRIVAL: the relay.
 *
 * The film and the GLB are the same jar, so the hero can pass the object from
 * cinema to interaction without a seam. Sequence:
 *
 *   1. Server paints ink + headline (the LCP element — real text, never
 *      transparent).
 *   2. The 7.4s film plays behind it, poster-first.
 *   3. While it plays, the GLB downloads silently.
 *   4. At the film's fade-to-black seam — the cut fades out at the loop
 *      point, so the crossfade happens through black — the R3F jar takes
 *      over, settles, and becomes draggable.
 *
 * Every gate from the plain hero still applies: reduced motion or Save-Data →
 * poster only, no film, no 3D. No WebGL2 / low memory → the film simply keeps
 * looping, which is already a premium hero. Context loss → back to the film.
 */

const ProductViewer = dynamic(() => import("../product/ProductViewer.client"), {
  ssr: false,
});

const SRC = {
  poster: "/media/hero.v2.poster.webp",
  webm: "/media/hero.v2.1080.webm",
  mp4: "/media/hero.v2.1080.mp4",
  mobile: "/media/hero.v2.mobile.mp4",
};

type NetworkInformation = { saveData?: boolean };

function heroCapability(): "static" | "film" | "relay" {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return "static";
  const nav = navigator as Navigator & {
    connection?: NetworkInformation;
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) return "static";
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4)
    return "film";
  try {
    if (!document.createElement("canvas").getContext("webgl2")) return "film";
  } catch {
    return "film";
  }
  return "relay";
}

export function ArrivalRelay({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<"static" | "film" | "relay">("static");
  const [filmReady, setFilmReady] = useState(false);
  const [mountJar, setMountJar] = useState(false);
  const [jarReady, setJarReady] = useState(false);
  const [handoff, setHandoff] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    setMode(heroCapability());
  }, []);

  // Relay path: start the 3D chunk once the film is actually playing, and
  // hand off at the loop seam (the cut fades through black there) once the
  // jar is ready.
  useEffect(() => {
    if (mode !== "relay") return;
    const video = videoRef.current;
    if (!video) return;

    const onTime = () => {
      if (!mountJar && video.currentTime > 0.5) setMountJar(true);
      if (
        jarReady &&
        !handoff &&
        video.duration > 0 &&
        video.currentTime > video.duration - 0.45
      ) {
        setHandoff(true);
        // Let the film finish its fade, then release the decoder.
        window.setTimeout(() => video.pause(), 600);
      }
    };
    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, [mode, mountJar, jarReady, handoff]);

  // Context loss anywhere in the subtree → return to the film, permanently.
  useEffect(() => {
    if (mode !== "relay") return;
    const onLost = () => {
      setHandoff(false);
      setMode("film");
      void videoRef.current?.play().catch(() => {});
    };
    window.addEventListener("webglcontextlost", onLost);
    return () => window.removeEventListener("webglcontextlost", onLost);
  }, [mode]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video || handoff) return;
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
            filmReady && !handoff ? "opacity-100" : "opacity-0",
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

      {/* The jar takes the stage through black. */}
      {mountJar && mode === "relay" ? (
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 transition-opacity duration-page ease-si",
            handoff ? "opacity-100" : "opacity-0",
          )}
        >
          <ProductViewer
            onReady={() => setJarReady(true)}
            cameraZ={3.4}
            scale={2.05}
          />
        </div>
      ) : null}

      {/* Scrims — the type column always sits on near-solid ink. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/35 to-ink"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent lg:via-ink/30"
      />

      {handoff ? (
        <p className="pointer-events-none absolute bottom-6 right-6 z-10 font-body text-eyebrow uppercase text-on-ink-muted">
          Drag the jar
        </p>
      ) : showFilm ? (
        <button
          type="button"
          onClick={toggle}
          className="absolute bottom-5 right-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-pill border border-on-ink/25 bg-ink/50 text-on-ink backdrop-blur-sm transition-colors duration-fast ease-si hover:border-gold hover:text-gold"
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
