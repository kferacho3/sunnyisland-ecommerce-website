import type { MetadataRoute } from "next";

const ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sunnyislandpepper.com"
).replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/inquire/thank-you",
          // Routes being retired. Keeping crawlers off them now avoids
          // indexing content that is about to 410.
          "/accountPages/",
          "/shop",
          "/explore/",
          "/contact/",
        ],
      },
    ],
    sitemap: `${ORIGIN}/sitemap.xml`,
  };
}
