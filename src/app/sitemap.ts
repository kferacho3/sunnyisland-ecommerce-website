import type { MetadataRoute } from "next";

import { recipes } from "@/content/recipes";

const ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sunnyislandpepper.com"
).replace(/\/$/, "");

/**
 * Every page this site actually serves.
 *
 * The recipes are derived from the same content module the routes are
 * generated from, so a new recipe cannot be published and then quietly go
 * unindexed — the two can't drift.
 *
 * The retired /shop, /explore/* and /contact/* routes are gone from the
 * codebase entirely and 308 to their replacements; they have no place here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
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
      url: `${ORIGIN}/recipes`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
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

  const recipePages: MetadataRoute.Sitemap = recipes.map((r) => ({
    url: `${ORIGIN}/recipes/${r.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...core, ...recipePages];
}
