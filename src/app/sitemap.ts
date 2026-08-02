import type { MetadataRoute } from "next";

const ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sunnyislandpepper.com"
).replace(/\/$/, "");

/**
 * Only the five real destinations plus supporting pages.
 *
 * The retired /shop, /explore/* and /contact/* routes are deliberately absent —
 * they still resolve while the rebuild finishes, but nothing should be
 * submitting them for indexing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${ORIGIN}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${ORIGIN}/sauce`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${ORIGIN}/partners`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${ORIGIN}/story`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${ORIGIN}/inquire`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${ORIGIN}/accessibility`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${ORIGIN}/legal/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${ORIGIN}/legal/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
