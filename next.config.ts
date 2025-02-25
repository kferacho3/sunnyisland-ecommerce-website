// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config: any) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: "asset/source",
    });
    return config;
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "img.evbstatic.com" },
      { protocol: "https", hostname: "s1.ticketm.net" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "loremflickr.com" },
      { protocol: "https", hostname: "images.universe.com" },
    ],
    domains: [
      "sunnyisland.s3.us-east-2.amazonaws.com",
      "via.placeholder.com",
      "loremflickr.com",
      "img.spoonacular.com",
      "flagsapi.com",
      "www.epicurious.com",
      "pixabay.com",
    ],
  },
};

export default nextConfig;
