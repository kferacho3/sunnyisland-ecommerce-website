import type { Metadata, Viewport } from "next";
import { Archivo, Great_Vibes, Inter_Tight } from "next/font/google";

import "./globals.css";

/**
 * Two families, two roles. Archivo 400 carries every display line in uppercase,
 * which is the register TRUFF and its tier use: authority from scale and
 * spacing, not from a serif or a stack of unused font axes.
 * Inter Tight handles anything a buyer has to actually read.
 *
 * Both are self-hosted by next/font. Only the display face is preloaded;
 * metric-compatible optional fallbacks prevent late layout shifts.
 */
const archivo = Archivo({
  subsets: ["latin"],
  weight: "400",
  display: "optional",
  variable: "--font-archivo",
});

/**
 * One script face, used for exactly one thing: the wellness message printed
 * on every bottle. Reserving it for that single voice is what keeps it
 * feeling like a signature rather than decoration.
 */
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  display: "optional",
  variable: "--font-script",
  // This face appears only in the footer, which is content-visibility gated
  // on long pages. Optional display prevents a late shift on short pages.
  preload: false,
  fallback: ["Snell Roundhand", "cursive"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: "400",
  display: "optional",
  variable: "--font-inter-tight",
  // Body copy can use Next's metric-compatible fallback immediately; the
  // display face remains the single critical font preload.
  preload: false,
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
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sunny Island Pepper Sauce — Caribbean heat, made for tables and shelves.",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#120C07",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${greatVibes.variable} ${interTight.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
