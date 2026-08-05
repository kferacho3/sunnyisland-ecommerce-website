import { cn } from "@/lib/cn";

/**
 * The ingredient banner — a drawn frieze of what goes in the jar, with no
 * text at all.
 *
 * Replaces the scrolling word-list that spelled the recipe out in display
 * type across the homepage. The full statement still lives where a buyer
 * genuinely needs it (the label, and /sauce), but the landing page shows
 * rather than recites.
 *
 * Hand-drawn paths rather than an icon set: scotch bonnets are squat and
 * lobed, not the long cayenne silhouette every generic pepper glyph uses,
 * and the difference is the whole point of the product.
 */

function ScotchBonnet({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden
      focusable="false"
    >
      {/* Squat, four-lobed body — the bonnet shape. */}
      <path
        d="M50 30c14 0 24 9 25 22 1 11-4 19-11 24-4 3-7 1-8-2-1 4-4 6-7 6s-6-2-7-6c-1 3-4 5-8 2-7-5-12-13-11-24C24 39 36 30 50 30Z"
        fill="currentColor"
      />
      {/* Shoulder crease. */}
      <path
        d="M31 45c5-5 12-8 19-8s14 3 19 8"
        fill="none"
        stroke="rgb(var(--si-ink))"
        strokeOpacity="0.35"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Stem and calyx. */}
      <path
        d="M50 31c-6 0-11-2-13-5 4-1 9-1 13 0 4-1 9-1 13 0-2 3-7 5-13 5Z"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M50 27V14c0-3 2-5 5-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

function Onion({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden
      focusable="false"
    >
      <path
        d="M50 32c15 0 27 13 27 29 0 14-12 24-27 24s-27-10-27-24c0-16 12-29 27-29Z"
        fill="currentColor"
      />
      {/* Papery lines. */}
      {[-16, -8, 0, 8, 16].map((dx) => (
        <path
          key={dx}
          d={`M${50 + dx} 34c${dx * 0.35} 14 ${dx * 0.35} 30 0 50`}
          fill="none"
          stroke="rgb(var(--si-ink))"
          strokeOpacity="0.28"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
      {/* Neck shoots. */}
      <path
        d="M50 33V18M50 24c-4-4-9-6-13-6M50 24c4-5 9-7 13-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

function Garlic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden
      focusable="false"
    >
      <path
        d="M50 30c13 0 24 14 24 30 0 13-11 22-24 22s-24-9-24-22c0-16 11-30 24-30Z"
        fill="currentColor"
      />
      {/* Clove divisions. */}
      <path
        d="M50 32v50M36 40c-3 12-3 26 0 38M64 40c3 12 3 26 0 38"
        fill="none"
        stroke="rgb(var(--si-ink))"
        strokeOpacity="0.3"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M50 31c-2-6-1-12 0-16 1 4 2 10 0 16Z"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
}

function Papaya({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden
      focusable="false"
    >
      {/* Halved green papaya — the ingredient nobody expects. */}
      <path
        d="M50 18c16 0 27 16 27 36S66 88 50 88 23 74 23 54s11-36 27-36Z"
        fill="currentColor"
      />
      <path
        d="M50 30c9 0 16 10 16 23s-7 22-16 22-16-9-16-22 7-23 16-23Z"
        fill="rgb(var(--si-ink))"
        fillOpacity="0.3"
      />
      {/* Seed cluster. */}
      {[
        [50, 42],
        [45, 50],
        [55, 50],
        [50, 58],
        [45, 64],
        [55, 64],
      ].map(([cx, cy]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="2.6"
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

/**
 * Every glyph is now NAMED. Unlabelled, the frieze answered "SHORT LIST. LONG
 * ANSWER." with eight cartoon vegetables a viewer cannot identify — the green
 * papaya, the differentiator the brand's own copy says "people cannot place",
 * read as a kiwi. Naming them turns decoration into the short list the
 * headline promises, and the names come straight off product.ingredients,
 * which is already approved(), so it costs nothing in content honesty.
 *
 * Garlic was `text-cream-line` — roughly 1.4:1 on this ground, i.e. an
 * ingredient rendered invisible. Every tone here now clears 4.5:1.
 */
const ROW = [
  {
    C: ScotchBonnet,
    tone: "text-ember",
    size: "h-20 sm:h-28",
    label: "Scotch Bonnet",
  },
  { C: Onion, tone: "text-gold-deep", size: "h-16 sm:h-24", label: "Onion" },
  {
    C: Garlic,
    tone: "text-on-cream-muted",
    size: "h-16 sm:h-24",
    label: "Garlic",
  },
  {
    C: Papaya,
    tone: "text-[#9dbc4e]",
    size: "h-16 sm:h-24",
    label: "Green Papaya",
  },
  {
    C: ScotchBonnet,
    tone: "text-gold",
    size: "h-20 sm:h-28",
    label: "Scotch Bonnet",
  },
  { C: Onion, tone: "text-gold-deep", size: "h-16 sm:h-24", label: "Onion" },
] as const;

export function IngredientBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex overflow-hidden border-y border-cream-line py-8 sm:py-10",
        className,
      )}
    >
      {/* Two copies so the loop is seamless; the whole strip is decorative,
          so it is hidden from assistive tech rather than narrated. */}
      <div aria-hidden className="si-marquee flex w-max flex-none items-end">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-end">
            {ROW.map(({ C, tone, size, label }, i) => (
              <span
                key={`${copy}-${i}`}
                className="mx-8 flex flex-none flex-col items-center gap-3 sm:mx-12"
              >
                <span
                  className={cn(
                    tone,
                    i % 3 === 0
                      ? "rotate-[-6deg]"
                      : i % 3 === 1
                        ? "rotate-[4deg]"
                        : "",
                  )}
                >
                  <C className={cn(size, "w-auto")} />
                </span>
                <span className="whitespace-nowrap font-mono text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-on-cream-muted">
                  {label}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Fade the strip into the ground at both edges. Widened from w-24: at
          96px the fade was shorter than the 128px glyphs, so both edge shapes
          were cut mid-body rather than dissolved. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-cream-sunk via-cream-sunk/70 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-cream-sunk via-cream-sunk/70 to-transparent"
      />
    </div>
  );
}
