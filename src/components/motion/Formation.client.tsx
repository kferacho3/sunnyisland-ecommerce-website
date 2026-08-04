"use client";

import { useGSAP } from "@gsap/react";
import { createElement, useRef } from "react";

import { cn } from "@/lib/cn";
import { DUR, EASE, withMotion } from "@/lib/motion";

/**
 * One trigger for a whole laid-out group. GSAP reads the real grid positions
 * and orders the entrance geometrically from the centre, replacing a trigger
 * per child without changing the server-rendered final state.
 */
export function Formation({
  as = "div",
  className,
  children,
}: {
  as?: "div" | "ol" | "ul";
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      withMotion(ref.current, ({ reduced, gsap }) => {
        const root = ref.current;
        if (!root || reduced) return;
        const items = [
          ...root.querySelectorAll(":scope > [data-formation-item]"),
        ];
        if (!items.length) return;

        gsap.from(items, {
          y: 14,
          autoAlpha: 0.01,
          duration: DUR.reveal,
          ease: EASE,
          stagger: { grid: "auto", from: "center", amount: 0.42 },
          onStart: () => gsap.set(items, { willChange: "transform, opacity" }),
          onComplete: () => gsap.set(items, { clearProps: "willChange" }),
          scrollTrigger: {
            trigger: root,
            start: "top 84%",
            once: true,
          },
        });
      }),
    { scope: ref },
  );

  return createElement(
    as,
    { ref, className: cn(className), "data-motion": "formation" },
    children,
  );
}
