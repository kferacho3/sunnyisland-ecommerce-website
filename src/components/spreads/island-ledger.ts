/**
 * THE ISLAND — chapter ledger.
 *
 * The `build-threejs-scroll-worlds` skill's central requirement: store the
 * contract as DATA, not as thresholds scattered through CSS and the render
 * loop. One row per authored state, each naming its beat, its landmark, and —
 * the rule that rejects filler — how its camera composition DIFFERS from the
 * one before it. A chapter that varies only by copy is not a chapter.
 *
 * This module is deliberately free of any `three` import. `IslandChapter`
 * (main bundle) reads it for the DOM captions and pin length; `IslandScene`
 * (deferred 3D chunk) reads it for camera and world state. If a THREE type
 * were used here, three would follow the caption code straight into the
 * initial bundle and undo the dynamic import.
 */

export type Vec3 = readonly [number, number, number];

export interface IslandChapterSpec {
  /** Stable slug — anchors, debugging, analytics. */
  id: string;
  /** Relative dwell. The landing gets more because it is the conversion beat. */
  weight: number;
  /** What the visitor understands here. */
  eyebrow: string;
  line: string;
  /** How this frame differs spatially from the previous one. Not decorative —
   *  it is the field the skill uses to reject a chapter. */
  change: string;
  camera: {
    pos: Vec3;
    target: Vec3;
    fov: number;
    /** Tall, narrow viewports need a pullback and a wider lens, or the authored
     *  composition arrives as an arbitrary centre crop. */
    mobile?: { pos?: Vec3; target?: Vec3; fov?: number };
  };
  /** Authored daylight at this chapter, 0 = night … 1 = full dawn. The arc IS
   *  the brand name: the island starts dark and becomes Sunny Island. */
  day: number;
}

export const ISLAND_CHAPTERS: readonly IslandChapterSpec[] = [
  {
    id: "open-water",
    weight: 1,
    eyebrow: "The island",
    line: "Born on an island.",
    change:
      "Establishing wide, low over open water at night. The island is a silhouette against stars — the only frame where it is small.",
    camera: {
      pos: [-15.5, 2.4, 25],
      target: [0, 2.4, 0],
      fov: 34,
      mobile: { pos: [-13, 3.4, 31], fov: 46 },
    },
    // Not 0. The forge palette bottoms out at rgb(12,8,5), so a literal zero
    // rendered the opening frame as an almost entirely black rectangle — the
    // island silhouette and the starfield both invisible. A sliver of pre-dawn
    // gives the horizon and the volcano a readable edge while still reading
    // unambiguously as night. An establishing shot has to establish something.
    day: 0.12,
  },
  {
    id: "the-crossing",
    weight: 1.15,
    eyebrow: "The crossing",
    line: "Carried five generations across the water.",
    change:
      "Approach. The camera closes across the water and drops toward it, so the sun's path on the sea becomes the leading line. Scale change, not a dolly-in on the same centre.",
    camera: {
      pos: [-5.5, 2.9, 18.5],
      target: [-1.5, 2.2, 0],
      fov: 37,
      mobile: { pos: [-5, 3.8, 23], fov: 48 },
    },
    day: 0.28,
  },
  {
    id: "the-vent",
    weight: 1,
    eyebrow: "The heat",
    line: "Scotch bonnet, straight from the fire.",
    change:
      "Reveal, looking UP for the only time in the journey: the camera rises past the flank to put the crater rim on the skyline with the eruption launching out of it.",
    camera: {
      pos: [4.6, 5.6, 10.5],
      target: [0, 4.1, 0],
      fov: 42,
      mobile: { pos: [4.2, 6.4, 14], fov: 52 },
    },
    day: 0.55,
  },
  {
    id: "the-grove",
    weight: 1,
    eyebrow: "The island grows it",
    line: "Green papaya, sun, and time.",
    change:
      "Passage. The camera descends INTO the grove so trunks pass close on both sides — the first frame with foreground occlusion, which is what sells the island as a place rather than a model.",
    camera: {
      pos: [6.8, 1.9, 9.2],
      target: [1.2, 2.1, 2.2],
      fov: 46,
      mobile: { pos: [6.4, 2.6, 12], fov: 56 },
    },
    day: 0.82,
  },
  {
    id: "the-landing",
    weight: 1.35,
    eyebrow: "The landing",
    line: "It all ends up in the jar.",
    change:
      "Inspection, and the only static hold. The camera settles at eye height on the sand and stops moving so the product — not the world — carries the last frame.",
    camera: {
      // Preserved verbatim from the original hand-placed landing pose. It was
      // composed against the real jar and there is no reason to re-derive it.
      pos: [6.4, 1.35, 7.8],
      target: [3.6, 1.15, 4.6],
      fov: 38,
      mobile: { pos: [6.9, 1.6, 9.1], target: [3.6, 1.05, 4.6], fov: 50 },
    },
    day: 1,
  },
] as const;

/**
 * Normalised scroll position of each chapter's keyframe, from the weights.
 * stops[0] === 0 and stops[n-1] === 1 by construction.
 *
 * N chapters make N-1 SPANS, so the weights cannot be used directly as stop
 * offsets: an earlier version accumulated N-1 of them and then overwrote the
 * final entry with 1, which silently discarded the last chapter's weight and
 * stretched the closing span to 42% of the scroll. Each span is weighted by the
 * MEAN of the two chapters it joins, so every declared weight is used and a
 * heavier chapter widens both its approach and its exit.
 */
export const ISLAND_STOPS: readonly number[] = (() => {
  const w = ISLAND_CHAPTERS.map((c) => c.weight);
  const spans = w.slice(0, -1).map((weight, i) => (weight + w[i + 1]) / 2);
  const total = spans.reduce((s, v) => s + v, 0);
  const stops: number[] = [0];
  let acc = 0;
  for (const span of spans) {
    acc += span;
    stops.push(acc / total);
  }
  // Guard against float drift so the last chapter is reachable at exactly 1.
  stops[stops.length - 1] = 1;
  return stops;
})();

/** How many viewport heights the pinned stage spans. */
export const ISLAND_PIN_VIEWPORTS = 4.2;

export interface Segment {
  a: IslandChapterSpec;
  b: IslandChapterSpec;
  /** Eased 0..1 between a and b. */
  t: number;
  /** Index of `a`. */
  index: number;
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Smoothstep — the camera should not arrive at a keyframe at full speed. */
const ease = (t: number) => t * t * (3 - 2 * t);

/**
 * Resolve the two adjacent chapters and the eased blend between them.
 * The same scroll position must produce the same state forwards, backwards,
 * after a fast jump, and after reload — so this is a pure function of `p`.
 */
export function segmentAt(p: number): Segment {
  const clamped = clamp01(p);
  const last = ISLAND_CHAPTERS.length - 1;
  for (let i = 0; i < last; i++) {
    const start = ISLAND_STOPS[i];
    const end = ISLAND_STOPS[i + 1];
    if (clamped <= end || i === last - 1) {
      const span = Math.max(1e-6, end - start);
      return {
        a: ISLAND_CHAPTERS[i],
        b: ISLAND_CHAPTERS[i + 1],
        t: ease(clamp01((clamped - start) / span)),
        index: i,
      };
    }
  }
  return {
    a: ISLAND_CHAPTERS[last],
    b: ISLAND_CHAPTERS[last],
    t: 1,
    index: last,
  };
}

/**
 * The window in normalised progress over which a chapter's caption is on
 * screen. Captions hold around their own keyframe and hand over in the gap,
 * so the reading block stays stable while the camera makes its largest move.
 */
export function captionWindow(index: number): { at: number; until: number } {
  const stop = ISLAND_STOPS[index];
  const prev = index > 0 ? ISLAND_STOPS[index - 1] : 0;
  const next = index < ISLAND_STOPS.length - 1 ? ISLAND_STOPS[index + 1] : 1;
  return {
    at: index === 0 ? 0.02 : stop - (stop - prev) * 0.42,
    until:
      index === ISLAND_CHAPTERS.length - 1 ? 1 : stop + (next - stop) * 0.5,
  };
}
