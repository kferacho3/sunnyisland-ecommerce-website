"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Ember Cadence — the site's one motion vocabulary.
 *
 * Registered once, imported by every scene. Native scroll only: no Lenis, no
 * ScrollSmoother — the research adjudication is that a permanent rAF wrapper
 * threatens the inquiry form's INP and breaks position:sticky pinning, and
 * ScrollTrigger runs fine on the native scroller.
 *
 * The reduced-motion contract lives here: every scene registers its animation
 * inside `withMotion`, and the reduce branch receives the same elements to put
 * into their FINAL state immediately. A scene that cannot express its end
 * state without motion is a scene we do not build.
 */

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

/** Reveal ease — the house curve, same as the CSS token --si-ease. */
export const EASE = "power2.out";
/** Reserved for the hero relay settle only. */
export const EASE_SETTLE = "expo.out";

export const DUR = {
  micro: 0.2,
  reveal: 0.8,
  route: 0.6,
} as const;

export interface MotionCtx {
  /** True on the reduced-motion branch — put elements in final state, no tweens. */
  reduced: boolean;
  gsap: typeof gsap;
}

/**
 * Register scene animation under the global reduced-motion gate.
 * Returns the cleanup function for useGSAP's scope.
 */
export function withMotion(
  scope: Element | null,
  build: (ctx: MotionCtx) => void,
): () => void {
  const mm = gsap.matchMedia(scope ?? undefined);

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    build({ reduced: false, gsap });
  });
  mm.add("(prefers-reduced-motion: reduce)", () => {
    build({ reduced: true, gsap });
  });

  return () => mm.revert();
}

/**
 * Line-masked headline reveal — the house entrance for Fraunces display type.
 * Waits for fonts so SplitText measures real glyphs, not fallback metrics.
 */
export async function splitLines(el: Element): Promise<SplitText> {
  await document.fonts.ready;
  return SplitText.create(el, {
    type: "lines",
    mask: "lines",
    linesClass: "si-line",
  });
}
