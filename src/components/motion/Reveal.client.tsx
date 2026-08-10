"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";
import { loadedMotion, useLazyMotion } from "@/lib/motion-lazy";

/**
 * The house entrances. Two and only two:
 *
 * <Lines>  — Archivo display type entering by line-mask, the Ember Cadence
 *            signature. Real text, never below opacity 0.01 (LCP exclusion).
 * <Settle> — quiet 12px rise for supporting content and plates.
 *
 * Both put their content in final state immediately under reduced motion —
 * which is also, by construction, the server HTML. Neither imports GSAP at
 * module scope; see lib/motion-lazy.ts for why that matters.
 */

export function Lines({
  as: As = "h2",
  className,
  children,
  delay = 0,
}: {
  as?: "h2" | "h3" | "p";
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLazyMotion(ref, ({ reduced, gsap }, root, { splitLines }) => {
    const el = root.firstElementChild;
    if (!el || reduced) return;

    // SplitText resolves after document.fonts.ready, so the ScrollTrigger is
    // created asynchronously and gsap.context cannot collect it. Both the
    // tween and the split are tracked by hand and torn down here instead —
    // otherwise ScrollTrigger.getAll() grows on every client navigation.
    let alive = true;
    let split: Awaited<ReturnType<typeof splitLines>> | null = null;
    let tween: ReturnType<typeof gsap.from> | null = null;

    void splitLines(el).then((created) => {
      if (!alive) {
        created.revert();
        return;
      }
      split = created;
      tween = gsap.from(created.lines, {
        yPercent: 105,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.09,
        delay,
        // See Formation: without this, immediateRender parks every below-fold
        // headline outside its own line-mask for as long as the page is never
        // scrolled that far.
        immediateRender: false,
        onStart: () => gsap.set(created.lines, { willChange: "transform" }),
        onComplete: () => gsap.set(created.lines, { clearProps: "willChange" }),
        scrollTrigger: { trigger: el, start: "top 78%", once: true },
      });
    });

    return () => {
      alive = false;
      tween?.scrollTrigger?.kill();
      tween?.kill();
      split?.revert();
    };
  });

  return (
    <div ref={ref} data-motion="lines">
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

  useLazyMotion(ref, ({ reduced, gsap }, el) => {
    if (reduced) return;
    gsap.from(el, {
      y: 12,
      autoAlpha: 0.01,
      duration: 0.8,
      ease: "power2.out",
      delay,
      // See Formation: no hidden start state until the entrance actually runs.
      immediateRender: false,
      onStart: () => gsap.set(el, { willChange: "transform, opacity" }),
      onComplete: () => gsap.set(el, { clearProps: "willChange" }),
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  });

  return (
    <div ref={ref} data-motion="settle" className={cn(className)}>
      {children}
    </div>
  );
}

/* ClipHandoff lived here: a scrubbed clip-path circle that opened "the next
   world" during the ink->cream handoff. That handoff no longer exists — the
   site is all-dark — and grep found no importer, so it was dead code holding
   one of the page's three scrubbed-ScrollTrigger slots in reserve. Deleted
   rather than kept "just in case": an unused scrub is still a budget line. */

/**
 * Refresh triggers after fonts settle — mounted once per page.
 *
 * Deliberately does NOT pull GSAP in: if nothing has loaded the motion module
 * yet then no trigger exists to re-measure, and forcing the import here would
 * undo the whole point of deferring it. ScrollTrigger.refresh() is a forced
 * synchronous reflow over every trigger, so it must not fire speculatively.
 */
export function MotionRefresh() {
  useEffect(() => {
    void document.fonts.ready.then(() => {
      loadedMotion()?.ScrollTrigger.refresh();
    });
  }, []);
  return null;
}
