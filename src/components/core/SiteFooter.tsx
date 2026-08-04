import Image from "next/image";
import Link from "next/link";

import { Fact } from "@/components/content/Fact";
import { CTA, nav, site } from "@/content/site";
import { story } from "@/content/story";
import { Container } from "./Container";

const LEGAL = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
  { href: "/accessibility", label: "Accessibility" },
];

/**
 * A designed ending, not a link dump.
 *
 * The old footer carried a fake address ("123 Pepper Lane"), a placeholder
 * phone number, a mailto that did not match its own visible text, a newsletter
 * form that was a setTimeout, and eight dead links. None of it returns — every
 * value here is a Claim and renders only when approved.
 */
export function SiteFooter() {
  return (
    <footer className="si-grain relative bg-ink text-on-ink [contain-intrinsic-size:auto_42rem] [content-visibility:auto]">
      <div aria-hidden className="si-rake absolute inset-x-0 top-0 h-48" />

      <Container className="relative">
        <div className="py-section-tight">
          {/* Closing gesture: the wellness line printed on every bottle. */}
          <Fact claim={story.wellnessMessage}>
            {(m) => (
              <blockquote className="mx-auto max-w-[46rem] text-center">
                <p className="si-script text-[clamp(1.75rem,1rem+2.2vw,2.9rem)] text-gold">
                  {m.quote}
                </p>
                <footer className="mt-8 font-body text-eyebrow font-semibold uppercase text-on-ink-muted">
                  {m.attribution}
                </footer>
              </blockquote>
            )}
          </Fact>

          <div className="mt-16 grid gap-12 border-t border-ink-line pt-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <Link
                href="/"
                className="inline-flex min-h-[44px] items-center gap-3"
              >
                <Image
                  src="/brand/logo-192.webp"
                  alt=""
                  width={30}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
                <span className="font-display text-heading tracking-display">
                  {site.shortName}
                </span>
              </Link>
              <p className="mt-4 max-w-[38ch] text-[0.9375rem] text-on-ink-muted">
                A five-generation Scotch bonnet pepper sauce from St. Vincent
                and Trinidad &amp; Tobago, now in the United States.
              </p>
            </div>

            <nav aria-label="Footer">
              <h2 className="font-body text-eyebrow font-semibold uppercase text-on-ink-muted">
                Site
              </h2>
              <ul className="mt-2 space-y-0">
                {[...nav, CTA].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-[44px] items-center text-[0.9375rem] text-on-ink transition-colors duration-fast ease-si hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="font-body text-eyebrow font-semibold uppercase text-on-ink-muted">
                Contact
              </h2>
              <ul className="mt-2 space-y-0">
                <Fact claim={site.email}>
                  {(email) => (
                    <li>
                      <a
                        href={`mailto:${email}`}
                        className="inline-flex min-h-[44px] items-center text-[0.9375rem] text-on-ink transition-colors duration-fast ease-si hover:text-gold"
                      >
                        {email}
                      </a>
                    </li>
                  )}
                </Fact>
                <Fact claim={site.instagram}>
                  {(ig) => (
                    <li>
                      <a
                        href={ig.url}
                        className="inline-flex min-h-[44px] items-center text-[0.9375rem] text-on-ink transition-colors duration-fast ease-si hover:text-gold"
                        rel="me noopener"
                      >
                        {ig.handle}
                      </a>
                    </li>
                  )}
                </Fact>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col-reverse gap-6 border-t border-ink-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-on-ink-muted">
              &copy; {new Date().getFullYear()} {site.name}
            </p>
            <ul className="-mx-2 -my-2 flex flex-wrap gap-x-2">
              {LEGAL.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center px-2 text-sm text-on-ink-muted transition-colors duration-fast ease-si hover:text-on-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
