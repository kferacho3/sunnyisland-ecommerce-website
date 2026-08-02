import Link from "next/link";

import { cn } from "@/lib/cn";

/**
 * The primary button is the site's one piece of hardware: a gold pill with a
 * light sweep that rakes across it on hover — the same warm key light that
 * crosses the bottle in the product viewer. It is used for exactly one thing,
 * "Inquire for Sauce", so it never becomes visual noise.
 */
type Variant = "primary" | "ghost-ink" | "ghost-cream";
type Size = "md" | "lg";

const BASE =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden " +
  "rounded-pill font-body font-semibold whitespace-nowrap " +
  "transition-[transform,background-color,border-color,color] duration-fast ease-si " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-55";

const SIZE: Record<Size, string> = {
  // 44px minimum touch target on both.
  md: "min-h-[2.75rem] px-5 text-[0.9375rem]",
  lg: "min-h-[3.25rem] px-7 text-base",
};

const VARIANT: Record<Variant, string> = {
  primary: "bg-gold text-ink hover:bg-gold hover:shadow-gold",
  "ghost-ink":
    "border border-on-ink/25 text-on-ink hover:border-gold hover:text-gold",
  "ghost-cream":
    "border border-on-cream/20 text-on-cream hover:border-ember hover:text-ember",
};

function Sweep() {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -translate-x-full skew-x-12",
        "bg-cream-raised/35 transition-transform duration-slow ease-si",
        "group-hover/btn:translate-x-full motion-reduce:hidden",
      )}
    />
  );
}

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
      {variant === "primary" ? <Sweep /> : null}
      <span className="relative">{children}</span>
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
      {variant === "primary" ? <Sweep /> : null}
      <span className="relative">{children}</span>
    </button>
  );
}

/** Quiet secondary action — a rule that draws itself on hover. */
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
        "group/link inline-flex items-center gap-1.5 font-body text-[0.9375rem] font-medium",
        "min-h-[2.75rem] transition-colors duration-fast ease-si",
        onInk
          ? "text-on-ink hover:text-gold"
          : "text-on-cream hover:text-ember",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className={cn(
            "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0",
            "bg-current transition-transform duration-medium ease-si",
            "group-hover/link:scale-x-100",
          )}
        />
      </span>
      <span
        aria-hidden
        className="transition-transform duration-medium ease-si group-hover/link:translate-x-1"
      >
        &rarr;
      </span>
    </Link>
  );
}
