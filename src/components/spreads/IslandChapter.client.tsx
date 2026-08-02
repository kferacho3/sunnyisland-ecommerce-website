"use client";

import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { gsap, ScrollTrigger, withMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * SPREAD II·V — THE ISLAND.
 *
 * The site's one WebGL scene: a low-poly island at forge-dusk, scrubbed by
 * native scroll. The camera crosses the water toward the island and lands on
 * the real jar GLB standing on the beach. Pointer drift adds parallax on fine
 * pointers; every frame is requested, never looped.
 *
 * All Three/R3F code lives in IslandScene.client.tsx behind this dynamic
 * import — the initial bundle carries none of it.
 */

const IslandStage = dynamic(() => import("./IslandScene.client"), {
  ssr: false,
});

/* ------------------------------------------------------------------ gates */

type NetworkInformation = { saveData?: boolean };

function capable(): boolean {
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
    if (!document.createElement("canvas").getContext("webgl2")) return false;
  } catch {
    return false;
  }
  return true;
}

/* --------------------------------------------------------------- chapter */

const CAPTIONS = [
  { at: 0.06, until: 0.34, eyebrow: "The island", line: "Born on an island." },
  {
    at: 0.4,
    until: 0.62,
    eyebrow: "The crossing",
    line: "Carried five generations across the water.",
  },
  {
    at: 0.7,
    until: 1,
    eyebrow: "The landing",
    line: "It all ends up in the jar.",
    cta: true,
  },
] as const;

function useDpr() {
  const [dpr, setDpr] = useState(1);
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setDpr(Math.min(window.devicePixelRatio, coarse ? 1.5 : 2));
  }, []);
  return dpr;
}

export function IslandChapter() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progress = useRef(0);
  const drift = useRef({ x: 0, y: 0 });
  const invalidateRef = useRef<() => void>(() => {});
  const [mode, setMode] = useState<"pending" | "scene" | "static">("pending");
  const [mount, setMount] = useState(false);
  const dpr = useDpr();

  useEffect(() => {
    setMode(capable() ? "scene" : "static");
  }, []);

  // Load the 3D chunk only as the chapter approaches.
  useEffect(() => {
    if (mode !== "scene") return;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setMount(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mode]);

  // A lost context downgrades to the static world, permanently.
  useEffect(() => {
    if (mode !== "scene") return;
    const onLost = () => setMode("static");
    window.addEventListener("webglcontextlost", onLost);
    return () => window.removeEventListener("webglcontextlost", onLost);
  }, [mode]);

  // Pointer drift = cheap interactivity. Each move requests exactly one frame.
  useEffect(() => {
    if (mode !== "scene") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: PointerEvent) => {
      drift.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      drift.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
      invalidateRef.current();
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mode]);

  useGSAP(
    () =>
      withMotion(wrapRef.current, ({ reduced }) => {
        const wrap = wrapRef.current;
        if (!wrap) return;

        if (reduced || mode !== "scene") {
          // Static world: no pin, captions all visible in flow (CSS handles it).
          return;
        }

        const st = ScrollTrigger.create({
          trigger: wrap,
          start: "top top",
          end: "+=260%",
          pin: stageRef.current,
          scrub: 0.5,
          onUpdate: (self) => {
            progress.current = self.progress;
            invalidateRef.current();
            CAPTIONS.forEach((c, i) => {
              const el = captionRefs.current[i];
              if (!el) return;
              const on = self.progress >= c.at && self.progress <= c.until;
              gsap.to(el, {
                autoAlpha: on ? 1 : 0,
                y: on ? 0 : 14,
                duration: 0.35,
                ease: "power2.out",
                overwrite: "auto",
              });
            });
          },
        });
        return () => st.kill();
      }),
    { scope: wrapRef, dependencies: [mode] },
  );

  if (mode === "static") {
    // The same story, no motion: sunset gradient, one line, the CTA.
    return (
      <section
        id="island"
        className="si-anvil relative overflow-hidden bg-ink py-section text-center"
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_100%,rgb(240_84_0/0.18),rgb(252_192_0/0.05)_45%,transparent_72%)]"
        />
        <div className="relative mx-auto max-w-narrow px-gutter">
          <p className="font-body text-eyebrow font-semibold uppercase text-gold">
            The island
          </p>
          <h2 className="mt-6 font-display text-display-xl text-on-ink">
            Born on an island. Landed in the jar.
          </h2>
          <Link
            href="/sauce"
            className="mt-10 inline-flex min-h-[3.25rem] items-center rounded-pill bg-gold px-7 font-body font-semibold text-ink"
          >
            Meet the jar
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="island" ref={wrapRef} className="relative bg-ink">
      <div ref={stageRef} className="relative h-svh overflow-hidden">
        <p className="sr-only">
          An illustrated low-poly Caribbean island at dusk. Scrolling crosses
          the water and lands on the Sunny Island jar standing on the beach.
        </p>
        {/* Forge-dusk sky behind the transparent canvas. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(85%_60%_at_28%_78%,rgb(240_84_0/0.32),rgb(120_0_36/0.16)_42%,transparent_70%),radial-gradient(60%_45%_at_70%_85%,rgb(252_192_0/0.14),transparent_60%)]"
        />

        {mount ? (
          <IslandStage
            progress={progress}
            drift={drift}
            dpr={dpr}
            onReady={(inv) => {
              invalidateRef.current = inv;
            }}
          />
        ) : null}

        {/* Grain + edge vignette over the scene, matching the forge. */}
        <div
          aria-hidden
          className="si-grain pointer-events-none absolute inset-0"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink"
        />

        {/* Captions — swapped by the scrub. */}
        {CAPTIONS.map((c, i) => (
          <div
            key={c.line}
            ref={(el) => {
              captionRefs.current[i] = el;
            }}
            className={cn(
              "absolute inset-x-0 bottom-[12svh] mx-auto max-w-container px-gutter opacity-0",
            )}
          >
            <p className="font-body text-eyebrow font-semibold uppercase text-gold">
              {c.eyebrow}
            </p>
            <p className="mt-4 max-w-[16ch] font-display text-display tracking-display text-on-ink">
              {c.line}
            </p>
            {"cta" in c && c.cta ? (
              <Link
                href="/sauce"
                className="pointer-events-auto mt-8 inline-flex min-h-[3rem] items-center rounded-pill bg-gold px-6 font-body font-semibold text-ink"
              >
                Meet the jar
              </Link>
            ) : null}
          </div>
        ))}

        <p className="pointer-events-none absolute bottom-5 right-6 font-body text-eyebrow uppercase text-on-ink-muted">
          Keep scrolling
        </p>
      </div>
    </section>
  );
}
