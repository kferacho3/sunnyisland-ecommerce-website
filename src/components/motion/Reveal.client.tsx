"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import { DUR, EASE, ScrollTrigger, splitLines, withMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * The house entrances. Two and only two:
 *
 * <Lines>  — Fraunces display type entering by line-mask, the Ember Cadence
 *            signature. Real text, never below opacity 0.01 (LCP exclusion).
 * <Settle> — quiet 12px rise for supporting content and plates.
 *
 * Both put their content in final state immediately under reduced motion.
 */

export function Lines({
  as: As = "h2",
  className,
  children,
  delay = 0,
}: {
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () =>
      withMotion(ref.current, ({ reduced, gsap }) => {
        const el = ref.current?.firstElementChild;
        if (!el || reduced) return;

        let split: Awaited<ReturnType<typeof splitLines>> | null = null;
        void splitLines(el).then((s) => {
          split = s;
          gsap.from(s.lines, {
            yPercent: 105,
            duration: DUR.reveal,
            ease: EASE,
            stagger: 0.09,
            delay,
            scrollTrigger: {
              trigger: el,
              start: "top 78%",
              once: true,
            },
          });
        });
        return () => split?.revert();
      }),
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <As className={className}>{children}</As>
    </div>
  );
}

export function Settle({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () =>
      withMotion(ref.current, ({ reduced, gsap }) => {
        const el = ref.current;
        if (!el || reduced) return;
        gsap.from(el, {
          y: 12,
          autoAlpha: 0.01,
          duration: DUR.reveal,
          ease: EASE,
          delay,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      }),
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

/**
 * The signature ink→cream handoff: the next world opens through the badge
 * circle as you scroll. Scrubbed clip-path — transform-free, native scroll.
 */
export function ClipHandoff({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () =>
      withMotion(ref.current, ({ reduced, gsap }) => {
        const el = ref.current;
        if (!el) return;
        if (reduced) {
          el.style.clipPath = "none";
          return;
        }
        gsap.fromTo(
          el,
          { clipPath: "circle(12% at 50% 46%)" },
          {
            clipPath: "circle(142% at 50% 46%)",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              end: "top 22%",
              scrub: 0.6,
            },
          },
        );
      }),
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Refresh triggers after fonts/images settle — mounted once per page. */
export function MotionRefresh() {
  useGSAP(() => {
    void document.fonts.ready.then(() => ScrollTrigger.refresh());
  });
  return null;
}
