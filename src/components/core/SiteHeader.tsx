import Image from "next/image";
import Link from "next/link";

import { Button } from "./Button";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav.client";
import { CTA, nav } from "@/content/site";

/**
 * Three links and one CTA.
 *
 * Replaces Navbar + Header + Sidebar, which between them held cart state,
 * account links, a theme toggle, three dropdowns, a fixed promo bar, and a
 * duplicated mobile route tree. The only client code left is the mobile panel.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-header border-b border-ink-line bg-ink/85 backdrop-blur-md">
      <Container>
        <div className="flex h-header items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center gap-3 py-2"
            aria-label="Sunny Island Pepper Sauce — home"
          >
            <Image
              src="/brand/symbol-96.webp"
              alt=""
              width={40}
              height={40}
              priority
              className="h-10 w-10 object-contain"
            />
            <span className="font-display text-[1.0625rem] leading-none tracking-display text-on-ink">
              Sunny Island
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 md:flex"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group/nav relative py-2 font-body text-[0.9375rem] text-on-ink-muted transition-colors duration-fast ease-si hover:text-on-ink"
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-medium ease-si group-hover/nav:scale-x-100"
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button href={CTA.href} className="hidden sm:inline-flex">
              {CTA.label}
            </Button>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
