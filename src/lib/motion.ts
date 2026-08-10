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
ScrollTrigger.config({ ignoreMobileResize: true });

declare global {
  interface Window {
    __ST?: typeof ScrollTrigger;
  }
}

if (
  process.env.NEXT_PUBLIC_MOTION_DEBUG === "1" &&
  typeof window !== "undefined"
) {
  window.__ST = ScrollTrigger;
}

export { gsap, ScrollTrigger, SplitText };

/** Reveal ease — the house curve, same as the CSS token --si-ease. */
export const EASE = "power2.out";
/** Reserved for the hero relay settle only. */
export const EASE_SETTLE = "expo.out";
/** Native-scroll damping for every scrubbed scene. */
export const SCRUB = 0.5;

export const DUR = {
  micro: 0.2,
  reveal: 0.8,
  route: 0.6,
} as const;

export interface MotionCtx {
  /** True on the reduced-motion branch — put elements in final state, no tweens. */
  reduced: boolean;
  /** Desktop composition tier. Scrubbed DOM scenes are gated to this tier. */
  wide: boolean;
  gsap: typeof gsap;
}

/**
 * Register scene animation under the global reduced-motion gate.
 * Returns the cleanup function for useGSAP's scope.
 */
export function withMotion(
  scope: Element | null,
  build: (ctx: MotionCtx) => void | (() => void),
): () => void {
  const mm = gsap.matchMedia(scope ?? undefined);

  mm.add(
    {
      reduce: "(prefers-reduced-motion: reduce)",
      wide: "(min-width: 1024px)",
      // `narrow` exists ONLY to make the condition set exhaustive, and it is
      // load-bearing. gsap.matchMedia activates a context when at least one of
      // its named queries matches; with just { reduce, wide }, a phone with no
      // reduced-motion preference matched NEITHER, so the context never
      // activated and `build` was never called. Every scroll entrance on the
      // site — Lines, Settle, Formation, SlicedHeading — was silently dead
      // below 1024px, and the island's pin could not be created there at all.
      // Verified 2026-08-09: ScrollTrigger.getAll() returned 6 at 1440px and 0
      // at 390px, with prefers-reduced-motion false in both.
      narrow: "(max-width: 1023.98px)",
    },
    (context) => {
      const conditions = context.conditions as {
        reduce: boolean;
        wide: boolean;
        narrow: boolean;
      };
      return build({
        reduced: conditions.reduce,
        wide: conditions.wide,
        gsap,
      });
    },
  );

  return () => mm.revert();
}

/**
 * Invariants for every motion scene:
 * - all GSAP work is created inside `withMotion`;
 * - native-scroll scrubs use damping, never `scrub: true`;
 * - function-valued layout reads pair with `invalidateOnRefresh: true`;
 * - any async-created tween must be wrapped in `contextSafe`;
 * - server HTML is the complete reduced-motion final state.
 */

/**
 * Line-masked headline reveal. This is below-fold supporting motion only:
 * `Lines` deliberately cannot render an h1, so the LCP surface cannot be
 * rewritten by SplitText by accident.
 */
export async function splitLines(el: Element): Promise<SplitText> {
  await document.fonts.ready;
  return SplitText.create(el, {
    type: "lines",
    mask: "lines",
    linesClass: "si-line",
  });
}
