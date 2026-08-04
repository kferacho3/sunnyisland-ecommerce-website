"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import { SCRUB, withMotion } from "@/lib/motion";

/** Compact family-archive stamp: image texture lives inside fixed Archivo
 * outlines; the surrounding ledger labels provide context without turning
 * the mechanic into a full-viewport demo. */
export function ClipHeadline() {
  const rootRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<SVGGElement>(null);

  useGSAP(
    () =>
      withMotion(rootRef.current, ({ reduced, wide, gsap }) => {
        const image = imageRef.current;
        const root = rootRef.current;
        if (!image || !root || reduced || !wide) return;

        const tween = gsap.fromTo(
          image,
          { xPercent: -2.5, yPercent: -1.5 },
          {
            xPercent: 2.5,
            yPercent: 1.5,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: SCRUB,
              invalidateOnRefresh: true,
              onToggle: (self) =>
                gsap.set(image, {
                  willChange: self.isActive ? "transform" : "auto",
                }),
            },
          },
        );
        return () => tween.kill();
      }),
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      data-motion="clip-headline"
      className="si-clip-headline relative aspect-[16/7] w-full overflow-hidden border-y border-cream-line bg-cream-sunk"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 pt-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-gold-deep sm:px-6 sm:pt-4">
        <span>Family archive</span>
        <span>Est. early 1900s</span>
      </div>
      <svg
        aria-hidden
        viewBox="0 0 1200 520"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
      >
        <g ref={imageRef}>
          <image
            href="/brand/concept/texture-tile.webp"
            x="-72"
            y="-32"
            width="1344"
            height="584"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#si-origin-window)"
          />
        </g>
      </svg>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center gap-3 px-4 pb-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-on-cream-muted sm:px-6 sm:pb-4">
        <span>STV</span>
        <span aria-hidden className="h-px flex-1 bg-cream-line" />
        <span>TTO</span>
        <span aria-hidden className="h-px flex-1 bg-cream-line" />
        <span>USA</span>
      </div>

      <p
        aria-hidden
        className="si-clip-headline__fallback si-hollow hidden px-gutter py-section-tight font-display text-display tracking-display"
      >
        Five generations
      </p>
    </div>
  );
}
