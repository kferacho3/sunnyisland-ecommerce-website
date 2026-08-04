import { cn } from "@/lib/cn";

/** Static magazine folio: chapter number, hairline, and section label. */
export function SpreadMark({
  numeral,
  label,
  onInk = false,
  className,
}: {
  numeral: string;
  label: string;
  onInk?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "si-key flex items-center gap-4 font-mono text-eyebrow font-semibold uppercase",
        onInk ? "text-gold" : "text-gold-deep",
        className,
      )}
    >
      <span>{numeral}</span>
      <span
        aria-hidden
        className={cn("h-px flex-1", onInk ? "bg-ink-line" : "bg-cream-line")}
      />
      <span>{label}</span>
    </div>
  );
}
