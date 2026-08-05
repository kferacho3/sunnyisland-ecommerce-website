"use client";

import { useEffect, type RefObject } from "react";

import type { MotionCtx } from "./motion";

/**
 * Lazy gate in front of the motion vocabulary.
 *
 * gsap + ScrollTrigger + SplitText is ~47 KB gz, and it was in the initial
 * bundle because Reveal/Formation/SlicedHeading/IslandChapter each imported
 * `@/lib/motion` (and `useGSAP`) at module scope. Lighthouse measured that
 * chunk 83% unused at first load: every animation on this site is below the
 * fold, so none of it is needed to paint the hero. Script was 193 KB of a
 * 311 KB page and the LCP image — 8 KB, already downloaded — was waiting
 * behind it, 2.5 s of the 2.9 s LCP being render delay.
 *
 * `import type` above is erased at build, so this module pulls in nothing.
 *
 * THE HAZARD THIS EXISTS TO DEFEND AGAINST: `gsap.from()` has
 * immediateRender, so registering an entrance for an element that is ALREADY
 * on screen snaps it to its start state (usually invisible) and then plays it
 * back in — a visible flash. Deferring the import makes that reachable
 * whenever the fetch loses a race with the scroll. So entrances SKIP
 * themselves if the element is already in view by the time the module lands.
 * That is safe by construction rather than by timing: the server HTML is
 * already the reduced-motion final state, so "no animation" renders exactly
 * the finished design.
 */

type MotionModule = typeof import("./motion");

/** One fetch no matter how many primitives ask for it. */
let pending: Promise<MotionModule> | null = null;
let resolved: MotionModule | null = null;

export function loadMotion(): Promise<MotionModule> {
  pending ??= import("./motion").then((mod) => {
    resolved = mod;
    return mod;
  });
  return pending;
}

/** The module if something has already loaded it, else null. Never fetches. */
export function loadedMotion(): MotionModule | null {
  return resolved;
}

/**
 * FETCHING and REGISTERING are deliberately separate concerns.
 *
 * Registering is per-element and must wait until that element approaches the
 * viewport. Fetching should happen once, as early as possible WITHOUT touching
 * the critical path — because a module that arrives late is the only thing that
 * makes the skip guard below fire, and a skipped entrance is a silently missing
 * animation.
 *
 * requestIdleCallback is exactly that window: after first paint, before the
 * user can plausibly have scrolled anywhere. GSAP stays out of the initial
 * bundle (so it cannot delay LCP) and is still resident by the time any
 * below-fold content is reached.
 */
function preloadWhenIdle(): void {
  if (pending) return;
  const schedule = () => {
    const idle = (
      window as Window & {
        requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void;
      }
    ).requestIdleCallback;
    if (idle) idle(() => void loadMotion(), { timeout: 2500 });
    else window.setTimeout(() => void loadMotion(), 600);
  };
  // Wait for `load` before even queueing the idle callback. Fetching on idle
  // alone still put the 48 KB motion chunk on the wire at ~92 ms, where it
  // competed with the LCP image for bandwidth on a throttled connection.
  // Nothing below the fold can need it before the page has finished loading,
  // and a user who scrolls sooner is covered anyway: the IntersectionObserver
  // path calls loadMotion() directly and does not wait for this.
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
}

export interface LazyMotionOptions {
  /** How far ahead of the viewport to register. */
  rootMargin?: string;
  /**
   * Last-resort flash guard for one-shot entrances. `gsap.from()` has
   * immediateRender, so registering an entrance for an element that is already
   * PAST its own trigger point snaps it to its start state and replays it.
   *
   * The threshold has to sit at or below the earliest `start` any entrance
   * uses ("top 78%"), not above it — an earlier version used 92%, which is
   * LATER than every start, so it skipped animations that had not yet fired
   * and Craft's headline silently stopped splitting. Anything still below 78%
   * of the viewport has not begun and is safe to register.
   *
   * False for persistent scenes (a pin, a scrub) where arriving mid-section is
   * normal and ScrollTrigger resolves its own progress from the scroll offset.
   */
  skipIfVisible?: boolean;
  /** Re-run the registration when these change; the previous run is reverted. */
  deps?: unknown[];
}

/**
 * Register a scene's motion once its element approaches the viewport,
 * importing GSAP at that moment. Mirrors `withMotion`'s contract: the build
 * callback may return a cleanup, and the reduce branch must leave the DOM in
 * its final state.
 */
export function useLazyMotion(
  ref: RefObject<HTMLElement | null>,
  build: (
    ctx: MotionCtx,
    el: HTMLElement,
    mod: MotionModule,
  ) => void | (() => void),
  options: LazyMotionOptions = {},
): void {
  // 700px is deliberate and was measured. Tightening it to 300px to keep the
  // motion chunk off the wire during the LCP window did NOT move LCP (still
  // 2.5s across three runs — the chunk is fetched at ~92ms either way, because
  // `load` fires almost immediately on a warm local server), and it DID cost a
  // real entrance: Craft's headline stopped splitting, because registration
  // then lands close enough to the "top 78%" start that a fast scroll trips
  // the skip guard. Margin buys entrance reliability, and it buys it for free.
  const { rootMargin = "700px 0px", skipIfVisible = true, deps = [] } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    preloadWhenIdle();

    const register = (mod: MotionModule) => {
      const node = ref.current;
      if (cancelled || !node) return;
      if (skipIfVisible) {
        const rect = node.getBoundingClientRect();
        // At or above the earliest entrance start ("top 78%") the animation
        // has already begun; registering now would snap and replay it.
        const alreadyStarted =
          rect.top < window.innerHeight * 0.78 && rect.bottom > 0;
        if (alreadyStarted) return;
      }
      revert = mod.withMotion(node, (ctx) => build(ctx, node, mod));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        // Synchronous when the idle preload already landed, which is the
        // normal case and the one where every entrance plays.
        const ready = loadedMotion();
        if (ready) register(ready);
        else void loadMotion().then(register);
      },
      { rootMargin },
    );
    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
      revert?.();
    };
  }, deps);
}
