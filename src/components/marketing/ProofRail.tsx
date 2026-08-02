import { isApproved, type Claim } from "@/content/claim";
import { cn } from "@/lib/cn";

/**
 * A thin strip of facts under the hero.
 *
 * Renders only approved claims, and renders nothing at all if none are.
 * The old site's equivalent carried "10,000+ spice lovers", five hardcoded
 * follower counts, and an unnamed "Award Winning" badge.
 */
export function ProofRail({
  points,
  className,
}: {
  points: readonly Claim<string>[];
  className?: string;
}) {
  const visible = points.filter(isApproved);
  if (visible.length === 0) return null;

  return (
    <ul
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-10 gap-y-4",
        className,
      )}
    >
      {visible.map((point, i) => (
        <li
          key={point.value}
          className={cn(
            "font-body text-eyebrow font-semibold uppercase text-on-ink-muted",
            i > 0 &&
              "before:mr-10 before:hidden before:text-gold before:content-['·'] sm:before:inline",
          )}
        >
          {point.value}
        </li>
      ))}
    </ul>
  );
}
