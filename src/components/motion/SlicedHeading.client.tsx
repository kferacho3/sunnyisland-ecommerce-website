"use client";

import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";

import { DUR, EASE, withMotion } from "@/lib/motion";

const SLICE_COUNT = 5;

/**
 * Reduced-motion final state: all five slices are in register and read as one
 * complete COOK IT THE TRINI WAY. headline.
 */
export function SlicedHeading({ children }: { children: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const innerRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let alive = true;
    const measure = () => {
      const root = rootRef.current;
      if (!root || !alive) return;
      const width = root.getBoundingClientRect().width;
      innerRefs.current.forEach((inner) => {
        if (inner) inner.style.width = `${width}px`;
      });
      const computedWidth = innerRefs.current[0]
        ? Number.parseFloat(getComputedStyle(innerRefs.current[0]).width)
        : width;
      innerRefs.current.forEach((inner, index) => {
        if (!inner) return;
        inner.style.left = `${-(computedWidth / SLICE_COUNT) * index}px`;
      });
    };

    void document.fonts.ready.then(measure);
    const observer = new ResizeObserver(measure);
    if (rootRef.current) observer.observe(rootRef.current);
    return () => {
      alive = false;
      observer.disconnect();
    };
  }, []);

  useGSAP(
    () =>
      withMotion(rootRef.current, ({ reduced, gsap }) => {
        const root = rootRef.current;
        if (!root || reduced) return;
        const inners = innerRefs.current.filter(
          (inner): inner is HTMLSpanElement => Boolean(inner),
        );
        if (!inners.length) return;

        gsap.fromTo(
          inners,
          {
            xPercent: (index) =>
              index < inners.length / 2
                ? -13 * (index + 1)
                : 13 * (inners.length - index),
          },
          {
            xPercent: 0,
            duration: DUR.reveal,
            ease: EASE,
            stagger: { amount: 0.14, from: "center" },
            onStart: () => gsap.set(inners, { willChange: "transform" }),
            onComplete: () => gsap.set(inners, { clearProps: "willChange" }),
            scrollTrigger: {
              trigger: root,
              start: "top 82%",
              once: true,
            },
          },
        );
      }),
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} data-motion="sliced-heading" className="w-full">
      <h2 className="sr-only">{children}</h2>
      <div aria-hidden className="flex w-full overflow-hidden">
        {Array.from({ length: SLICE_COUNT }, (_, index) => (
          <span
            key={index}
            className="relative mr-[-0.5px] block min-w-0 overflow-hidden [flex:0_0_calc(20%+0.5px)]"
          >
            <span
              ref={(element) => {
                innerRefs.current[index] = element;
              }}
              className="relative block whitespace-nowrap text-center font-display text-[clamp(1.65rem,6.8vw,6rem)] uppercase leading-[0.9] tracking-[-0.045em] text-on-cream"
            >
              {children}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
