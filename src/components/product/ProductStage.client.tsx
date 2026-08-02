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
 * be: reduced motion, Save-Data, a low-memory device, or no WebGL2. In every
 * one of those cases the still is the final state and no copy is lost.
 */

const ProductViewer = dynamic(() => import("./ProductViewer.client"), {
  ssr: false,
});

type NetworkInformation = { saveData?: boolean };

/**
 * Stage WebGL is temporarily disabled: this GLB carries a partial white
 * backdrop shell from its authoring scene, and the head-on stage view keeps
 * catching it (the island chapter's oblique view does not — that scene works
 * and owns the site's 3D). Until the model is re-exported without the shell,
 * the stage ships the still. Tracked as follow-up.
 */
const STAGE_3D_ENABLED = false;

function capable(): boolean {
  if (!STAGE_3D_ENABLED) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return false;

  const nav = navigator as Navigator & {
    connection?: NetworkInformation;
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) return false;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4)
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

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !capable()) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMount(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
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
      className={cn(
        "relative isolate aspect-[4/5] w-full overflow-hidden rounded-lg",
        className,
      )}
    >
      <div aria-hidden className="si-rake absolute inset-0" />

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
          aria-hidden
          className={cn(
            "absolute inset-0 transition-opacity duration-slow ease-si",
            showCanvas ? "opacity-100" : "opacity-0",
          )}
        >
          <ProductViewer onReady={() => setReady(true)} />
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
