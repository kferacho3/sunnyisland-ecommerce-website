"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { useLazyMotion } from "@/lib/motion-lazy";
import { allowsRichVisuals } from "@/lib/tier";

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

function capable(): boolean {
  // The island is the one WebGL context on the site. Its 768px gate matches
  // the measured ProductStage precedent: no Draco decode or 260svh pin on the
  // weakest mobile CPUs, and no second canvas is ever introduced for the hero.
  if (!allowsRichVisuals(768)) return false;
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
  const spacerRef = useRef<HTMLDivElement>(null);
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

  // skipIfVisible is FALSE here, unlike the one-shot entrances. This is a
  // persistent pinned scene, not an entrance: arriving while it is on screen
  // is normal, ScrollTrigger resolves its own progress from the scroll
  // position, and skipping would leave all three captions stacked at full
  // opacity because the gsap.set below would never run.
  useLazyMotion(
    wrapRef,
    ({ reduced, gsap }, wrap, { ScrollTrigger }) => {
      const spacer = spacerRef.current;
      const stage = stageRef.current;
      if (!spacer || !stage) return;

      if (reduced || mode !== "scene") {
        // Static world: no pin, captions all visible in flow (CSS handles it).
        return;
      }

      const captions = captionRefs.current.filter(
        (caption): caption is HTMLDivElement => Boolean(caption),
      );
      gsap.set(captions, { opacity: 0, y: 14, pointerEvents: "none" });

      const pin = ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: () => `+=${window.innerHeight * 2.6}`,
        pin: stage,
        pinSpacer: spacer,
        scrub: 0.5,
        refreshPriority: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progress.current = self.progress;
          invalidateRef.current();
        },
      });

      const captionTriggers = CAPTIONS.flatMap((caption, index) => {
        const element = captions[index];
        if (!element) return [];
        return [
          ScrollTrigger.create({
            trigger: wrap,
            start: () => `top+=${window.innerHeight * 2.6 * caption.at} top`,
            end: () => `top+=${window.innerHeight * 2.6 * caption.until} top`,
            invalidateOnRefresh: true,
            onToggle: (self) => {
              gsap.to(element, {
                opacity: self.isActive ? 1 : 0,
                y: self.isActive ? 0 : 14,
                pointerEvents: "none",
                duration: 0.35,
                ease: "power2.out",
                overwrite: "auto",
              });
            },
          }),
        ];
      });

      return () => {
        pin.kill();
        captionTriggers.forEach((trigger) => trigger.kill());
        gsap.killTweensOf(captions);
      };
    },
    { skipIfVisible: false, deps: [mode] },
  );

  if (mode === "static") {
    // The same story, no motion: sunset gradient, one line, the CTA.
    return (
      <section
        id="island"
        data-motion="island-static"
        className="si-anvil relative overflow-hidden bg-ink py-section text-center"
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_100%,rgb(var(--si-ember)/0.18),rgb(var(--si-gold)/0.05)_45%,transparent_72%)]"
        />
        <div className="relative mx-auto max-w-narrow px-gutter">
          <p className="font-body text-eyebrow font-semibold uppercase text-gold">
            The island
          </p>
          <h2 className="mt-6 font-display text-display text-on-ink">
            Born on an island. Landed in the jar.
          </h2>
          <Link
            href="/sauce"
            className="mt-10 inline-flex min-h-[3.25rem] items-center bg-gold px-7 font-body font-semibold text-ink"
          >
            Meet the jar
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      id="island"
      ref={wrapRef}
      data-motion="island"
      className="relative bg-ink"
    >
      {/* Hand-rendered pin spacer: ScrollTrigger never injects a sibling into
          React's managed tree. No ancestor of the pinned stage may gain
          transform, filter, perspective, contain, backdrop-filter or
          will-change, or position:fixed pinning silently stops being viewport
          relative. */}
      <div ref={spacerRef}>
        <div
          ref={stageRef}
          data-scroll-pin-stage
          className="relative h-svh overflow-hidden"
        >
          <p className="sr-only">
            An illustrated low-poly Caribbean island at dusk. Scrolling crosses
            the water and lands on the Sunny Island jar standing on the beach.
          </p>
          {/* Forge-dusk sky behind the transparent canvas. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(85%_60%_at_28%_78%,rgb(var(--si-ember)/0.32),rgb(var(--si-maroon)/0.16)_42%,transparent_70%),radial-gradient(60%_45%_at_70%_85%,rgb(var(--si-gold)/0.14),transparent_60%)]"
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
                "pointer-events-none absolute inset-x-0 bottom-[12svh] mx-auto max-w-container px-gutter",
              )}
            >
              <p className="font-body text-eyebrow font-semibold uppercase text-gold">
                {c.eyebrow}
              </p>
              <p className="mt-4 max-w-[18ch] font-display text-title uppercase tracking-display text-on-ink">
                {c.line}
              </p>
            </div>
          ))}

          <p className="pointer-events-none absolute bottom-5 right-6 font-body text-eyebrow uppercase text-on-ink-muted">
            Keep scrolling
          </p>
        </div>
      </div>

      {/* Conversion stays outside the pinned subtree, in normal document
          flow. It is never focusable while visually hidden. */}
      <div className="relative border-y border-ink-line bg-ink py-8 text-center">
        <Link
          href="/sauce"
          className="inline-flex min-h-[3.25rem] items-center bg-gold px-7 font-body font-semibold text-ink transition-colors duration-fast ease-si hover:bg-ember hover:text-on-ink"
        >
          Meet the jar
        </Link>
      </div>
    </section>
  );
}
