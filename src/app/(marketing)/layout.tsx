import { BrandFilters } from "@/components/core/BrandFilters";
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
        className="si-skip bg-gold px-5 py-3 font-body text-sm font-semibold text-ink"
      >
        Skip to content
      </a>
      <BrandFilters />
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
