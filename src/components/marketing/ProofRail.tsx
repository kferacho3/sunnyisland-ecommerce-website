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
    // Deliberately still. This is a claim ledger, not a marketing-logo strip;
    // motion would make verified facts feel promotional.
    <ul
      data-proof-rail
      style={{ "--si-rail-cols": visible.length } as React.CSSProperties}
      className={cn(
        "grid gap-px border-x border-ink-line bg-ink-line sm:[grid-template-columns:repeat(var(--si-rail-cols),minmax(0,1fr))]",
        className,
      )}
    >
      {visible.map((point, i) => (
        <li
          key={point.value}
          className="flex min-h-[5.5rem] items-center gap-4 bg-ink px-5 py-5"
        >
          <span className="font-mono text-eyebrow font-semibold text-gold-deep">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-body text-eyebrow font-semibold uppercase text-on-ink-muted">
            {point.value}
          </span>
        </li>
      ))}
    </ul>
  );
}
