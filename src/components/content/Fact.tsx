import { approvedOnly, isApproved, type Claim } from "@/content/claim";
import { cn } from "@/lib/cn";

/**
 * Renders a claim only when it is approved. A `pending` claim renders nothing —
 * no placeholder, no "coming soon", no dash.
 */
export function Fact<T>({
  claim,
  children,
}: {
  claim: Claim<T>;
  children: (value: T) => React.ReactNode;
}) {
  return isApproved(claim) ? <>{children(claim.value)}</> : null;
}

/**
 * A spec table that omits unapproved rows, and omits *itself* when nothing is
 * approved — so an empty shell can never ship.
 */
export function FactRows({
  rows,
  onInk = false,
  className,
}: {
  rows: readonly { label: string; claim: Claim<string> }[];
  onInk?: boolean;
  className?: string;
}) {
  const visible = approvedOnly(rows);
  if (visible.length === 0) return null;

  return (
    <dl
      className={cn(
        "grid gap-x-8 gap-y-0 sm:grid-cols-2",
        onInk ? "text-on-ink" : "text-on-cream",
        className,
      )}
    >
      {visible.map(({ label, value }) => (
        <div
          key={label}
          className={cn(
            "flex items-baseline justify-between gap-6 border-b py-4",
            onInk ? "border-ink-line" : "border-cream-line",
          )}
        >
          <dt
            className={cn(
              "font-body text-eyebrow font-semibold uppercase",
              onInk ? "text-on-ink-muted" : "text-on-cream-muted",
            )}
          >
            {label}
          </dt>
          <dd className="text-right font-body text-[0.9375rem] font-medium">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Count of approved rows — for deciding whether to render a wrapper section. */
export function approvedCount<T>(
  rows: readonly { label: string; claim: Claim<T> }[],
): number {
  return approvedOnly(rows).length;
}
