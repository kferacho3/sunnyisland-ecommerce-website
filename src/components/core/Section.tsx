import { cn } from "@/lib/cn";
import { Container } from "./Container";

/**
 * Two grounds only.
 *
 * `ink` is where the product performs — film, bottle, closing CTA.
 * `cream` is where facts are stated — copy, specs, FAQ, forms.
 *
 * Keeping the vocabulary this small is what makes the ink sections feel like
 * events rather than wallpaper. Resist adding a third.
 */
export type Ground = "cream" | "cream-sunk" | "ink";

const GROUND: Record<Ground, string> = {
  cream: "bg-cream text-on-cream",
  "cream-sunk": "bg-cream-sunk text-on-cream",
  ink: "bg-ink text-on-ink si-grain",
};

export function Section({
  ground = "cream",
  tight = false,
  bleed = false,
  width,
  className,
  innerClassName,
  children,
  ...rest
}: {
  ground?: Ground;
  tight?: boolean;
  /** Skip the Container — the section manages its own full-bleed layout. */
  bleed?: boolean;
  width?: "default" | "narrow" | "wide";
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"section">, "children">) {
  return (
    <section
      className={cn(
        "relative isolate",
        tight ? "py-section-tight" : "py-section",
        GROUND[ground],
        className,
      )}
      {...rest}
    >
      {bleed ? (
        children
      ) : (
        <Container width={width} className={innerClassName}>
          {children}
        </Container>
      )}
    </section>
  );
}

export function Eyebrow({
  className,
  children,
  onInk = false,
}: {
  className?: string;
  children: React.ReactNode;
  onInk?: boolean;
}) {
  return (
    <p
      className={cn(
        "font-body text-eyebrow font-semibold uppercase",
        onInk ? "text-gold" : "text-gold-deep",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  onInk = false,
  align = "start",
  className,
  as: As = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  onInk?: boolean;
  align?: "start" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow onInk={onInk}>{eyebrow}</Eyebrow> : null}
      <As
        className={cn(
          "text-display tracking-display",
          onInk ? "text-on-ink" : "text-on-cream",
        )}
      >
        {title}
      </As>
      {lede ? (
        <p
          className={cn(
            "max-w-measure text-lede",
            onInk ? "text-on-ink-muted" : "text-on-cream-muted",
            align === "center" && "mx-auto",
          )}
        >
          {lede}
        </p>
      ) : null}
    </header>
  );
}
