import { cn } from "@/lib/cn";

type Width = "default" | "narrow" | "wide";

const WIDTH: Record<Width, string> = {
  default: "max-w-container",
  narrow: "max-w-narrow",
  wide: "max-w-[92rem]",
};

/**
 * `as` is a fixed union rather than React.ElementType — a fully polymorphic
 * component makes `children` resolve to `never` under Next's stricter JSX
 * types, and this only ever needs to be one of these five elements.
 */
type Tag = "div" | "section" | "header" | "footer" | "article";

export function Container({
  width = "default",
  className,
  children,
  as: As = "div",
}: {
  width?: Width;
  className?: string;
  children: React.ReactNode;
  as?: Tag;
}) {
  return (
    <As className={cn("mx-auto w-full px-gutter", WIDTH[width], className)}>
      {children}
    </As>
  );
}
