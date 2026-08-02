import { SiteFooter } from "@/components/core/SiteFooter";
import { SiteHeader } from "@/components/core/SiteHeader";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        className="si-skip rounded-pill bg-gold px-5 py-3 font-body text-sm font-semibold text-ink"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
