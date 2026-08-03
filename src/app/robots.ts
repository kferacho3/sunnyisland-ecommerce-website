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
        // The retired /shop, /explore/* and /contact/* paths used to be
        // disallowed here. They must NOT be: they now 308 to their
        // replacements, and a crawler that is forbidden from fetching a URL
        // never sees its redirect — so the old pages would sit in the index
        // as-is and pass nothing on. Letting crawlers hit them is precisely
        // how the redirect does its job.
        disallow: ["/api/", "/inquire/thank-you"],
      },
    ],
    sitemap: `${ORIGIN}/sitemap.xml`,
  };
}
