import Link from "next/link";

import { cn } from "@/lib/cn";

/**
 * Buyer path card — a shelf tile, not a SaaS feature card.
 *
 * Fixed order on every page. The old homepage randomised tile size and order on
 * each render (SectionExploreGrid.tsx:33-72), so navigation changed between
 * refreshes and mobile shifted on hydration.
 */
export function BuyerPathCard({
  index,
  label,
  lede,
  needs,
  href,
  className,
}: {
  index: number;
  label: string;
  lede: string;
  needs: readonly string[];
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/card relative flex flex-col overflow-hidden rounded-lg",
        "border border-cream-line bg-cream-raised p-7 sm:p-8",
        "transition-[transform,box-shadow,border-color] duration-medium ease-si",
        "hover:-translate-y-1 hover:border-gold hover:shadow-lift",
        "focus-visible:-translate-y-1",
        className,
      )}
    >
      {/* Warm light rakes in from the top on hover — the house gesture. */}
      <span
        aria-hidden
        className="si-rake pointer-events-none absolute inset-x-0 top-0 h-32 opacity-0 transition-opacity duration-slow ease-si group-hover/card:opacity-100"
      />

      <span className="relative font-mono text-eyebrow font-semibold text-gold-deep">
        {String(index).padStart(2, "0")}
      </span>

      <h3 className="relative mt-4 font-display text-heading tracking-display text-on-cream">
        {label}
      </h3>

      <p className="relative mt-3 text-[0.9375rem] text-on-cream-muted">
        {lede}
      </p>

      <ul className="relative mt-6 flex-1 space-y-2.5 border-t border-cream-line pt-6">
        {needs.map((need) => (
          <li
            key={need}
            className="flex gap-3 text-sm text-on-cream-muted before:mt-[0.6em] before:h-px before:w-3 before:flex-none before:bg-ember before:content-['']"
          >
            {need}
          </li>
        ))}
      </ul>

      <span className="relative mt-7 inline-flex items-center gap-2 font-body text-[0.9375rem] font-semibold text-on-cream">
        Start this inquiry
        <span
          aria-hidden
          className="transition-transform duration-medium ease-si group-hover/card:translate-x-1"
        >
          &rarr;
        </span>
      </span>
    </Link>
  );
}
