"use client";

import { createElement, useRef } from "react";

import { cn } from "@/lib/cn";
import { useLazyMotion } from "@/lib/motion-lazy";

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

  useLazyMotion(ref, ({ reduced, gsap }, root) => {
    if (reduced) return;
    const items = [...root.querySelectorAll(":scope > [data-formation-item]")];
    if (!items.length) return;

    gsap.from(items, {
      y: 14,
      autoAlpha: 0.01,
      duration: 0.8,
      ease: "power2.out",
      stagger: { grid: "auto", from: "center", amount: 0.42 },
      onStart: () => gsap.set(items, { willChange: "transform, opacity" }),
      onComplete: () => gsap.set(items, { clearProps: "willChange" }),
      scrollTrigger: { trigger: root, start: "top 84%", once: true },
    });
  });

  return createElement(
    as,
    { ref, className: cn(className), "data-motion": "formation" },
    children,
  );
}
