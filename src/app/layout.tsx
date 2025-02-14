import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Providers and Layout Components
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";

// Sticky components, etc.
import StickyAccessibility from "@/components/layout/StickyComponents/StickyAccessibility";
import StickyCookieConsent from "@/components/layout/StickyComponents/StickyCookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spicy Caribbean Tang | Sunny Island Pepper Sauce",
  description: "A modern Caribbean pepper sauce website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-primary-gradient dark:bg-dark-texture dark:text-white`}
      >
        <ThemeProvider>
          <Navbar />
          <Header />
          {/* Adjust padding to clear the fixed Navbar and Header */}
          <main className="pt-0 md:pt-0 min-h-screen">{children}</main>
          <StickyAccessibility />
          <StickyCookieConsent />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
