import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Providers and Layout Components
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";

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
      <head>
        <script
          src="https://www.google.com/recaptcha/enterprise.js?render=6LdHqQIrAAAAAMqkm7zjtFuiBVWDxKxikPh51C88"
          async
          defer
        ></script>
      </head>
      <body
        className={`${inter.className} bg-primary-gradient dark:bg-dark-texture dark:text-white`}
      >
        <ThemeProvider>
          <Navbar />
          <Header />
          {/* Ensure main content starts below the fixed Navbar and Header */}
          <main className="pt-[50px] min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
