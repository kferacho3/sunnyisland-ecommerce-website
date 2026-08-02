import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";

/**
 * Shell for the routes being retired.
 *
 * These pages keep their original chrome so nothing breaks while the new
 * inquiry-first site is built alongside them. This whole group is deleted when
 * the redirects in the design spec (§11) go live — do not build anything new
 * against it.
 */
export default function LegacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <Navbar />
      <Header />
      <main className="min-h-screen pt-[50px]">{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
