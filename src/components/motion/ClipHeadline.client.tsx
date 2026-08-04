"use client";

import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";

import { SCRUB, withMotion } from "@/lib/motion";

const LINES = [
  {
    id: "si-origin-clip-line-one",
    text: "FIVE",
    y: 352,
    initialSize: 330,
    maxSize: 330,
  },
  {
    id: "si-origin-clip-line-two",
    text: "GENERATIONS",
    y: 636,
    initialSize: 162.85,
    maxSize: 184,
  },
] as const;

/**
 * Reduced-motion final state: FIVE / GENERATIONS fills the fixed 4:3 window,
 * the texture is centred inside the letterforms, and nothing moves.
 */
export function ClipHeadline() {
  const rootRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<SVGGElement>(null);

  useEffect(() => {
    // Scrubbed DOM effects and their post-font measurement are desktop-only.
    // Mobile ships the measured final sizes above in server HTML, avoiding a
    // late below-fold paint becoming the page's LCP candidate.
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    let alive = true;

    const fit = () => {
      if (!alive) return;
      LINES.forEach((line) => {
        const text = document.getElementById(line.id);
        if (!(text instanceof SVGTextElement)) return;
        text.setAttribute("font-size", "100");
        const measured = text.getComputedTextLength();
        if (!measured) return;
        const fitted = Math.min((1152 / measured) * 100, line.maxSize);
        text.setAttribute("font-size", fitted.toFixed(2));
      });
    };

    void document.fonts.ready.then(fit);
    const observer = new ResizeObserver(fit);
    if (rootRef.current) observer.observe(rootRef.current);
    return () => {
      alive = false;
      observer.disconnect();
    };
  }, []);

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
      className="si-clip-headline relative aspect-[4/3] w-full overflow-hidden border-y border-cream-line bg-cream-sunk"
    >
      <h2 className="sr-only">Five generations. One recipe.</h2>
      <svg
        aria-hidden
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
      >
        <g ref={imageRef}>
          <image
            href="/brand/concept/texture-tile.webp"
            x="-96"
            y="-72"
            width="1392"
            height="1044"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#si-origin-window)"
          />
        </g>
      </svg>

      <p
        aria-hidden
        className="si-clip-headline__fallback si-hollow hidden px-gutter py-section-tight font-display text-display tracking-display"
      >
        Five generations
      </p>
    </div>
  );
}
