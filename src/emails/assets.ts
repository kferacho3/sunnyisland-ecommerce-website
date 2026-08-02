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
  /**
   * Full masthead: the Sunny Island symbol centred over mirrored flame art,
   * composited into a single image.
   *
   * Deliberately one file rather than a badge layered over a background. Email
   * has no reliable way to overlap two images — Gmail strips negative margins
   * and Outlook ignores background-image on block elements — so compositing at
   * build time is the only approach that renders identically everywhere.
   */
  header: `${ORIGIN}/brand/email/header.jpg`,
  /** THE logo: the Sunny Island sun-and-palm symbol, transparent PNG. */
  mark: `${ORIGIN}/brand/email/logo.png`,
  /** Wide flame/ember band, flattened onto ink. */
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
