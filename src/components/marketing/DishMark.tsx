import { cn } from "@/lib/cn";

/**
 * A drawn plate for each house recipe.
 *
 * WHY THIS EXISTS. The recipe surfaces had no imagery of any kind, so six
 * dishes read as six identical rows of large type — a table of contents for a
 * food brand. The obvious fix is photography, and there is none: the legacy
 * library's 150 recipes carried 135 empty image fields and about fifteen
 * hotlinked epicurious.com URLs, all of which now 404. The two "serving
 * suggestion" tiles that briefly stood in were generated mandalas of tacos,
 * carbonara and a cheeseburger ringed by disembodied hands, around a jar that
 * is not the shipping SKU — removed, correctly, for contradicting the words
 * "Cook it the Trini way" printed beside them.
 *
 * So: draw the food. Each mark is the dish's own defining components in the
 * same hand-drawn idiom as IngredientBanner — squat lobed bonnets, not the
 * generic cayenne silhouette every icon set ships. Nothing here depicts a
 * photograph that does not exist, and nothing claims to be one. Per-dish
 * photography stays on the commission list; these slot out without rework.
 *
 * Each dish also carries its own heat temperature, so the six are
 * distinguishable at a glance in an index rather than by reading the words.
 */

export type DishSlug =
  | "doubles-slight-pepper"
  | "curry-chicken-buss-up-shut"
  | "chicken-pelau"
  | "callaloo"
  | "trini-corn-soup"
  | "pepper-shrimp";

/** Ground / body / accent, drawn from the label palette only. */
const TONES: Record<DishSlug, { from: string; to: string; accent: string }> = {
  "doubles-slight-pepper": {
    from: "rgb(var(--si-gold))",
    to: "rgb(var(--si-ember))",
    accent: "rgb(var(--si-maroon))",
  },
  "curry-chicken-buss-up-shut": {
    from: "rgb(var(--si-ember))",
    to: "rgb(var(--si-maroon))",
    accent: "rgb(var(--si-gold))",
  },
  "chicken-pelau": {
    from: "rgb(var(--si-gold-deep))",
    to: "rgb(var(--si-ember))",
    accent: "rgb(var(--si-gold))",
  },
  callaloo: {
    from: "rgb(var(--si-gold-deep))",
    to: "rgb(var(--si-maroon))",
    accent: "rgb(var(--si-gold))",
  },
  "trini-corn-soup": {
    from: "rgb(var(--si-gold))",
    to: "rgb(var(--si-gold-deep))",
    accent: "rgb(var(--si-ember))",
  },
  "pepper-shrimp": {
    from: "rgb(var(--si-ember))",
    to: "rgb(var(--si-gold))",
    accent: "rgb(var(--si-maroon))",
  },
};

/* ---------------------------------------------------------------- drawings */
/* Each returns the dish's contents only. The plate, ring and gradient are
   supplied by DishMark so every dish sits on the same table. */

function Doubles({ a }: { a: string }) {
  return (
    <g>
      {/* Two bara, overlapping the way they are handed to you. */}
      <ellipse cx="42" cy="58" rx="26" ry="22" opacity=".9" />
      <ellipse cx="60" cy="52" rx="27" ry="23" />
      {/* The channa heap between them. */}
      <g fill={a}>
        <circle cx="52" cy="48" r="5" />
        <circle cx="63" cy="45" r="5.5" />
        <circle cx="72" cy="51" r="4.5" />
        <circle cx="58" cy="57" r="5" />
        <circle cx="68" cy="60" r="4" />
      </g>
      {/* The drizzle — the sauce moment, and the only red line on the plate. */}
      <path
        d="M38 66c8-6 18-8 27-5s16 3 22-2"
        fill="none"
        stroke={a}
        strokeWidth="3.4"
        strokeLinecap="round"
        opacity=".85"
      />
    </g>
  );
}

function BussUpShut({ a }: { a: string }) {
  return (
    <g>
      {/* Roti beaten until it shreds like a busted-up shirt: soft folds, no
          disc. A flat circle here would read as a tortilla. */}
      <path d="M22 62c6-14 14-18 22-14 6 3 8 10 14 10s9-8 16-7 11 9 8 17c-3 7-12 10-24 10s-24-2-30-6c-5-3-8-6-6-10Z" />
      <path
        d="M30 58c5-5 10-4 14 0M50 66c5-6 12-6 17-1M38 70c4-4 9-4 13-1"
        fill="none"
        stroke={a}
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity=".5"
      />
      {/* Curry pooled beside it. */}
      <path
        d="M60 78c10 0 18 3 18 6s-8 5-18 5-18-2-18-5 8-6 18-6Z"
        fill={a}
        opacity=".9"
      />
    </g>
  );
}

function Pelau({ a }: { a: string }) {
  return (
    <g>
      {/* One heavy pot — pelau is the pot that follows you everywhere. */}
      <path d="M28 46h44v20c0 12-9 20-22 20s-22-8-22-20V46Z" />
      <rect x="24" y="40" width="52" height="8" rx="4" />
      {/* Handles. */}
      <path
        d="M24 52c-6 0-9 3-9 7s3 7 9 7M76 52c6 0 9 3 9 7s-3 7-9 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Rice and pigeon peas over burnt-sugar caramel. */}
      <g fill={a}>
        <circle cx="42" cy="60" r="4" />
        <circle cx="54" cy="57" r="4.5" />
        <circle cx="64" cy="62" r="4" />
        <circle cx="48" cy="70" r="4" />
        <circle cx="60" cy="72" r="3.5" />
      </g>
    </g>
  );
}

function Callaloo({ a }: { a: string }) {
  return (
    <g>
      {/* A dasheen leaf — heart-shaped with a deep notch, not a generic frond. */}
      <path
        d="M50 22c16 6 28 20 28 34 0 15-13 26-28 26S22 71 22 56c0-14 12-28 28-34Zm0 8c-11 5-20 16-20 26 0 11 9 19 20 19s20-8 20-19c0-10-9-21-20-26Z"

        opacity=".25"
      />
      <path d="M50 26c14 6 24 18 24 30 0 13-11 22-24 22S26 69 26 56c0-12 10-24 24-30Z" />
      {/* Midrib and veins. */}
      <path
        d="M50 30v46M50 46l-13-8M50 46l13-8M50 60l-14-7M50 60l14-7"
        fill="none"
        stroke={a}
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity=".65"
      />
      {/* Okra alongside — the other half of the swizzle. */}
      <path
        d="M74 68c4 0 6 3 6 8s-2 12-6 12-6-7-6-12 2-8 6-8Z"
        fill={a}
        opacity=".9"
      />
    </g>
  );
}

function CornSoup({ a }: { a: string }) {
  return (
    <g>
      {/* Corn round, cut the way it goes into the drum pot. */}
      <rect x="34" y="30" width="24" height="44" rx="12" />
      <g fill={a} opacity=".85">
        <circle cx="41" cy="40" r="3" />
        <circle cx="51" cy="40" r="3" />
        <circle cx="41" cy="50" r="3" />
        <circle cx="51" cy="50" r="3" />
        <circle cx="41" cy="60" r="3" />
        <circle cx="51" cy="60" r="3" />
      </g>
      {/* Flour dumplings sunk in the split-pea broth. */}
      <ellipse cx="70" cy="58" rx="11" ry="8" opacity=".8" />
      <ellipse cx="66" cy="72" rx="9" ry="7" opacity=".6" />
      {/* Broth line. */}
      <path
        d="M20 80c10-5 22-5 32 0s22 5 30 0"
        fill="none"
        stroke={a}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </g>
  );
}

function PepperShrimp({ a }: { a: string }) {
  return (
    <g>
      {/* One shrimp, curled. */}
      <path d="M62 32c12 4 18 16 16 28-2 14-14 24-28 24-9 0-16-5-16-12 0-6 5-10 11-10 5 0 8 3 8 7 0 2-1 4-3 4 6 0 11-6 12-14 1-10-4-19-13-22-3-1-4-3-3-5s4-2 7-1Z" />
      <circle cx="60" cy="40" r="3" fill={a} />
      {/* Legs. */}
      <path
        d="M52 56c-4 2-7 5-8 9M58 62c-3 3-5 7-5 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity=".7"
      />
      {/* Lime half — sharp lime, honest rum. */}
      <g>
        <circle cx="30" cy="66" r="14" fill={a} opacity=".9" />
        <path
          d="M30 52v28M16 66h28M20 56l20 20M40 56 20 76"
          stroke="currentColor"
          strokeWidth="2"
          opacity=".55"
        />
      </g>
    </g>
  );
}

const DRAWINGS: Record<DishSlug, (p: { a: string }) => React.JSX.Element> = {
  "doubles-slight-pepper": Doubles,
  "curry-chicken-buss-up-shut": BussUpShut,
  "chicken-pelau": Pelau,
  callaloo: Callaloo,
  "trini-corn-soup": CornSoup,
  "pepper-shrimp": PepperShrimp,
};

export function isDishSlug(slug: string): slug is DishSlug {
  return slug in DRAWINGS;
}

export function DishMark({
  slug,
  className,
  plate = true,
}: {
  slug: string;
  className?: string;
  /** The ring and ground. Off when the mark sits on its own coloured field. */
  plate?: boolean;
}) {
  if (!isDishSlug(slug)) return null;
  const Drawing = DRAWINGS[slug];
  const tone = TONES[slug];
  // Gradient ids must be unique per dish or the first one on the page wins for
  // every subsequent mark — the classic multiple-SVG-on-one-document trap.
  const gid = `dish-grad-${slug}`;

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("block", className)}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={tone.from} />
          <stop offset="100%" stopColor={tone.to} />
        </linearGradient>
      </defs>

      {plate ? (
        <>
          <circle
            cx="50"
            cy="50"
            r="47"
            fill="rgb(var(--si-ink))"
            opacity=".55"
          />
          <circle
            cx="50"
            cy="50"
            r="47"
            fill="none"
            stroke={`url(#${gid})`}
            strokeWidth="1.5"
            opacity=".9"
          />
          <circle
            cx="50"
            cy="50"
            r="41"
            fill="none"
            stroke={`url(#${gid})`}
            strokeWidth="0.75"
            opacity=".35"
          />
        </>
      ) : null}

      {/* fill cascades into every shape that does not set its own, so the
          drawings pick up the gradient by inheritance. `color` must stay a
          SOLID value — currentColor cannot resolve to a gradient url, so the
          strokes that use it would silently render black. */}
      <g fill={`url(#${gid})`} color={tone.from}>
        <Drawing a={tone.accent} />
      </g>
    </svg>
  );
}
