"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * The bottle's stage.
 *
 * A fixed-aspect box holding a still and a canvas in the same coordinates, so
 * the crossfade cannot move layout. Three/R3F are behind a dynamic import and
 * are absent from the page's initial bundle.
 *
 * The viewer is never loaded when the visitor's environment says it shouldn't
 * be: Save-Data, a low-memory device, or no WebGL2. In every one of those
 * cases the still is the final state and no copy is lost.
 *
 * Reduced motion does NOT disable it. The jar is the product, and rotating it
 * is a control the visitor operates — the viewer simply stops the idle
 * turntable and the entrance ease instead of refusing to load.
 */

const ProductViewer = dynamic(() => import("./ProductViewer.client"), {
  ssr: false,
});

type NetworkInformation = { saveData?: boolean };

/**
 * Below this width the still ships instead of the canvas.
 *
 * Measured, not assumed: on Lighthouse's throttled mobile profile the viewer
 * cost 5,640ms of Total Blocking Time and took /sauce from 92 to 62. The model
 * is Draco-compressed, so a phone pays for a decoder fetch, a wasm decode and
 * the three.js parse before it can draw anything — and it pays that on the
 * weakest CPU in the range. A phone also cannot hover, and a horizontal drag
 * on a narrow screen fights the page scroll.
 *
 * The still shows the same jar, so no information is lost by not shipping it.
 */
const MIN_WIDTH_FOR_3D = 768;

function capable(): boolean {
  const nav = navigator as Navigator & {
    connection?: NetworkInformation;
    deviceMemory?: number;
    hardwareConcurrency?: number;
  };
  if (window.innerWidth < MIN_WIDTH_FOR_3D) return false;
  if (nav.connection?.saveData) return false;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4)
    return false;
  if (
    typeof nav.hardwareConcurrency === "number" &&
    nav.hardwareConcurrency < 4
  )
    return false;

  try {
    const c = document.createElement("canvas");
    if (!c.getContext("webgl2")) return false;
  } catch {
    return false;
  }
  return true;
}

export function ProductStage({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  /** Read by the render loop. A ref, so toggling it never re-renders React. */
  const spin = useRef(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !capable()) return;

    // One observer does both jobs: mount the chunk as the stage approaches,
    // and run the turntable only while it is actually on screen. A product
    // viewer quietly spinning three screens above you is wasted battery.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMount(true);
        spin.current = entry.isIntersecting;
      },
      { rootMargin: "200px", threshold: 0 },
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  // A lost context is permanent here — fall back to the still and stay there.
  useEffect(() => {
    if (!mount) return;
    const onLost = () => {
      setFailed(true);
      setReady(false);
    };
    window.addEventListener("webglcontextlost", onLost);
    return () => window.removeEventListener("webglcontextlost", onLost);
  }, [mount]);

  const showCanvas = mount && ready && !failed;

  return (
    <div
      ref={hostRef}
      className={cn("relative isolate aspect-[4/5] w-full", className)}
    >
      {/* A spotlight, not a panel. `si-rake` was used here and it reached
          `transparent` at 70% of the box, so the box's own edges showed as a
          hard-lit rectangle floating in the section. This ellipse is fully
          transparent well before any edge, and is allowed to bleed outside the
          stage — so the jar sits in light with no container around it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-[18%] -inset-y-[10%] bg-[radial-gradient(closest-side,rgb(var(--si-gold)/0.16),rgb(var(--si-ember)/0.06)_46%,transparent_76%)]"
      />

      {/* Still: first paint, and the permanent fallback. */}
      <Image
        src="/brand/label-badge-crop.webp"
        alt="Sunny Island Pepper Sauce — the flame and palm badge over the wordmark."
        fill
        sizes="(max-width: 1024px) 88vw, 460px"
        priority={false}
        className={cn(
          "object-contain p-6 transition-opacity duration-slow ease-si",
          showCanvas ? "opacity-0" : "opacity-100",
        )}
      />

      {mount && !failed ? (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-slow ease-si",
            showCanvas ? "opacity-100" : "opacity-0",
          )}
        >
          <ProductViewer onReady={() => setReady(true)} spin={spin} />
        </div>
      ) : null}

      {showCanvas ? (
        <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center font-body text-eyebrow uppercase text-on-ink-muted">
          Drag to rotate
        </p>
      ) : null}
    </div>
  );
}
