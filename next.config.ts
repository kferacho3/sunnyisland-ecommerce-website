import type { NextConfig } from "next";

/**
 * Every path the retired e-commerce site served, pointed at its nearest
 * equivalent on the inquiry-first site.
 *
 * These are 308s (`permanent: true`), not 302s: the old URLs are gone for
 * good, and a permanent redirect is what hands their search history to the
 * page that replaced them. The specific rules must stay above the catch-alls
 * — Next matches in order.
 *
 * `/accountPages/*` goes to the homepage rather than to the inquiry form.
 * Someone following a bookmark to a sign-up page is not expressing intent to
 * buy, and dropping them into a form that asks for case volumes would be a
 * non sequitur.
 */
const RETIRED: { source: string; destination: string }[] = [
  // The storefront.
  { source: "/shop", destination: "/sauce" },
  { source: "/shop/:path*", destination: "/sauce" },
  { source: "/explore/products", destination: "/sauce" },
  { source: "/explore/recipes", destination: "/recipes" },
  { source: "/explore/about", destination: "/story" },
  { source: "/explore/blog", destination: "/story" },
  { source: "/explore/blog/:path*", destination: "/story" },
  { source: "/explore/events", destination: "/" },
  { source: "/explore/locations", destination: "/partners" },

  // The old contact tree — all four fed one generic inbox. The inquiry form
  // replaces every one of them and actually routes by buyer type.
  { source: "/contact/inquiries", destination: "/inquire" },
  { source: "/contact/FAQs", destination: "/inquire" },
  { source: "/contact/careers", destination: "/inquire" },
  { source: "/contact/supportUs", destination: "/inquire" },

  // Accounts, which this site no longer has in any form.
  { source: "/accountPages/login", destination: "/" },
  { source: "/accountPages/register", destination: "/" },

  // Catch-alls for anything else under those trees that was linked or indexed.
  { source: "/explore/:path*", destination: "/" },
  { source: "/contact/:path*", destination: "/inquire" },
  { source: "/accountPages/:path*", destination: "/" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // The only remote host this site loads from. The retired build allowed a
    // dozen more — Unsplash, Eventbrite, Ticketmaster, Pexels, Shopify — each
    // one an open origin for arbitrary remote images served under our domain.
    remotePatterns: [
      { protocol: "https", hostname: "sunnyisland.s3.us-east-2.amazonaws.com" },
    ],
  },
  async redirects() {
    return RETIRED.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
