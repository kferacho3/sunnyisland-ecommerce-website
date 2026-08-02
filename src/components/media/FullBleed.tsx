import Image from "next/image";

import { cn } from "@/lib/cn";

/**
 * Full-bleed imagery that cannot be cropped.
 *
 * The bug this exists to prevent: a fixed-height box (`h-[52svh]`) holding an
 * image with `object-cover` silently discards whatever does not fit. A 16:9
 * image across a 1440px viewport wants 810px of height; give it 546px and
 * 264px of the picture is simply gone.
 *
 * So the container derives its height from the image's own aspect ratio.
 * Width spans margin to margin, height is whatever that width demands, and
 * every pixel of the source is on screen at every viewport.
 */

export type MediaSource = {
  src: string;
  /** Intrinsic pixel dimensions — these set the aspect ratio. */
  width: number;
  height: number;
  alt: string;
};

export function FullBleedBand({
  media,
  className,
  overlayClassName,
  priority = false,
  children,
}: {
  media: MediaSource;
  className?: string;
  /** Optional scrim; defaults to melting both edges into the ink ground. */
  overlayClassName?: string;
  priority?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn("relative w-full overflow-hidden bg-ink", className)}
      style={{ aspectRatio: `${media.width} / ${media.height}` }}
    >
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes="100vw"
        priority={priority}
        className="si-media object-cover"
      />
      <div
        aria-hidden
        className={cn(
          "absolute inset-0",
          overlayClassName ??
            "bg-gradient-to-b from-ink via-transparent to-ink",
        )}
      />
      {children}
    </div>
  );
}

/**
 * A section whose artwork sits behind content. Content height still governs,
 * but the section is never shorter than the artwork needs at full width — so
 * the ground is complete rather than clipped.
 */
export function FullBleedGround({
  media,
  opacity = 45,
  className,
}: {
  media: MediaSource;
  /** 0-100. The ground supports copy; it never competes with it. */
  opacity?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
    >
      <div
        className="absolute inset-x-0 top-0 w-full"
        style={{ aspectRatio: `${media.width} / ${media.height}` }}
      >
        <Image
          src={media.src}
          alt=""
          fill
          sizes="100vw"
          className="si-media object-cover"
          style={{ opacity: opacity / 100 }}
        />
      </div>
    </div>
  );
}

/** Intrinsic dimensions of the brand artwork, measured from the files. */
export const ART = {
  sunsetJars: {
    src: "/brand/concept/sauce-product-hero.webp",
    width: 1600,
    height: 900,
    alt: "Jars of Sunny Island Pepper Sauce on dark stone before a sunset opening.",
  },
  islandScenery: {
    src: "/brand/concept/story-ground.webp",
    width: 1448,
    height: 1086,
    alt: "",
  },
  panelGround: {
    src: "/brand/concept/partners-panel-ground.webp",
    width: 1448,
    height: 1086,
    alt: "",
  },
  emberBanner: {
    src: "/brand/concept/hero-ground-banner.webp",
    width: 2000,
    height: 667,
    alt: "",
  },
} as const satisfies Record<string, MediaSource>;
