import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight } from "next/font/google";

import "./globals.css";

/**
 * Two families, two roles. Fraunces carries the editorial, food-forward voice
 * at display sizes; Inter Tight handles anything a buyer has to actually read.
 * Both self-hosted by next/font, so there is no render-blocking request and no
 * layout shift when they land.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sunnyislandpepper.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Sunny Island Pepper Sauce — Caribbean heat, made for tables and shelves",
    template: "%s · Sunny Island Pepper Sauce",
  },
  description:
    "A five-generation Scotch bonnet pepper sauce from St. Vincent and Trinidad & Tobago, now in the United States. Direct orders, wholesale distribution, and retail partnerships.",
  applicationName: "Sunny Island Pepper Sauce",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Sunny Island Pepper Sauce",
    url: SITE_URL,
    title: "Caribbean heat, made for tables and shelves",
    description:
      "A five-generation Scotch bonnet pepper sauce from St. Vincent and Trinidad & Tobago, now in the United States.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0D0D",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
