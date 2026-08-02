import Link from "next/link";

import { cn } from "@/lib/cn";

/**
 * Buttons are sharp rectangles. No radius, no pill, no gradient.
 *
 * The reference tier (TRUFF et al) renders `border-radius: 0` on every
 * element and leans on an outlined rectangle in the accent colour as its
 * primary action — authority from geometry and spacing rather than from a
 * soft shape. `primary` is the solid gold block; `outline` is that same
 * rectangle drawn in gold on the dark ground, which is the house default over
 * imagery.
 */
type Variant = "primary" | "outline" | "ghost-ink" | "ghost-cream";
type Size = "md" | "lg";

const BASE =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden " +
  "font-body font-semibold uppercase tracking-[0.14em] whitespace-nowrap " +
  "transition-[background-color,border-color,color] duration-fast ease-si " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-55";

const SIZE: Record<Size, string> = {
  // 44px minimum touch target on both.
  md: "min-h-[2.75rem] px-6 text-[0.6875rem]",
  lg: "min-h-[3.25rem] px-9 text-xs",
};

const VARIANT: Record<Variant, string> = {
  primary: "bg-gold text-ink hover:bg-on-ink",
  outline: "border border-gold text-gold hover:bg-gold hover:text-ink",
  "ghost-ink":
    "border border-on-ink/30 text-on-ink hover:border-gold hover:text-gold",
  "ghost-cream":
    "border border-on-cream/25 text-on-cream hover:border-ember hover:text-ember",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >) {
  return (
    <Link
      href={href}
      className={cn(BASE, SIZE[size], VARIANT[variant], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function ButtonEl({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cn(BASE, SIZE[size], VARIANT[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Quiet secondary action — a permanent rule, thickening on hover. */
export function TextLink({
  href,
  onInk = false,
  className,
  children,
}: {
  href: string;
  onInk?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex min-h-[2.75rem] items-center font-body text-[0.6875rem] font-semibold uppercase tracking-[0.14em]",
        "transition-colors duration-fast ease-si",
        onInk
          ? "text-on-ink hover:text-gold"
          : "text-on-cream hover:text-ember",
        className,
      )}
    >
      <span className="relative border-b border-current pb-1">{children}</span>
    </Link>
  );
}
