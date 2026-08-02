import type { Metadata, Viewport } from "next";
import { Archivo, Inter_Tight } from "next/font/google";

import "./globals.css";

/**
 * Two families, two roles. Archivo — a variable grotesque — carries every
 * display line in uppercase at light-to-regular weight, which is the register
 * TRUFF and its tier use: authority from scale and spacing, not from a serif.
 * Inter Tight handles anything a buyer has to actually read.
 *
 * Both self-hosted by next/font: no render-blocking request, no layout shift.
 */
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  axes: ["wdth"],
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
  themeColor: "#120C07",
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
      className={`${archivo.variable} ${interTight.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
