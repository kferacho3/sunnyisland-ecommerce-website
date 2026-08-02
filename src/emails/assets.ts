/**
 * Email image assets.
 *
 * Absolute URLs only — mail clients have no page origin to resolve against, and
 * Gmail proxies every image through googleusercontent, so each one must be
 * publicly reachable without auth.
 *
 * PNG/JPEG rather than the site's WebP: Outlook on Windows renders through Word,
 * which does not support WebP. These are the email-safe siblings.
 */
const ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sunnyislandpepper.com"
).replace(/\/$/, "");

export const emailAsset = {
  /** Flame mark, transparent, extracted from the physical label artwork. */
  mark: `${ORIGIN}/brand/email/flame-mark.png`,
  /** Wide flame/ember band, flattened onto ink for the header. */
  band: `${ORIGIN}/brand/email/band.jpg`,
  /** Pepper-and-foliage wreath from the label, used as a closing ornament. */
  ornament: `${ORIGIN}/brand/email/ornament.jpg`,
} as const;

export const emailLink = {
  site: ORIGIN,
  sauce: `${ORIGIN}/sauce`,
  partners: `${ORIGIN}/partners`,
  story: `${ORIGIN}/story`,
  instagram: "https://www.instagram.com/sunnyislandpepper",
} as const;
