import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { Container } from "@/components/core/Container";
import { Eyebrow } from "@/components/core/Section";
import { InquiryForm } from "@/components/forms/InquiryForm.client";
import { ART } from "@/components/media/FullBleed";
import { SpreadMark } from "@/components/marketing/SpreadMark";
import { Formation } from "@/components/motion/Formation.client";
import { Lines, Settle } from "@/components/motion/Reveal.client";
import { Fact } from "@/components/content/Fact";
import { product } from "@/content/product";

/**
 * SPREAD V — TRADE. The close, and the site's main conversion surface.
 *
 * The sunset product artwork is this section's own hero rather than a band
 * passing by above it: the jars sit behind the invitation, and the full
 * adaptive form sits directly underneath. A visitor who scrolled the whole
 * page never has to navigate anywhere to convert.
 */

const DOORS = [
  {
    title: "Direct Order",
    line: "Bottles for your table, your stall, or a room full of people.",
    href: "/inquire?buyer=consumer&source=home-trade",
  },
  {
    title: "Wholesale",
    line: "Case volumes for distribution and food-service programs.",
    href: "/inquire?buyer=wholesale&source=home-trade",
  },
  {
    title: "Retail Partnership",
    line: null,
    href: "/inquire?buyer=retail&source=home-trade",
  },
] as const;

export function Trade() {
  return (
    <section id="trade" className="relative isolate bg-ink text-on-ink">
      {/* Mobile keeps the full artwork with no text over it. At lg the artwork
          owns the right 68% of the stage, leaving genuinely empty ground for
          copy instead of dimming the product with a scrim. */}
      <div className="relative aspect-[16/9] w-full overflow-hidden lg:aspect-[11/4]">
        <div className="absolute inset-0 lg:left-auto lg:w-[68%]">
          <Image
            src={ART.sunsetJars.src}
            alt={ART.sunsetJars.alt}
            fill
            sizes="(min-width: 1024px) 68vw, 100vw"
            className="si-media object-contain object-center lg:object-cover"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-y-0 left-[28%] hidden w-[14%] bg-[linear-gradient(90deg,rgb(var(--si-ink))_0%,rgb(var(--si-ink)/0.72)_42%,transparent_100%)] lg:block"
        />

        <Container className="absolute inset-0 hidden flex-col justify-center lg:flex">
          <div className="max-w-[34rem]">
            <SpreadMark numeral="V" label="Trade" onInk />
            <Lines
              as="h2"
              className="mt-5 font-display text-display tracking-display text-on-ink"
            >
              Pull up a chair.
            </Lines>
            <Settle className="mt-6">
              <p className="max-w-[44ch] text-lede text-on-ink-muted">
                Tell us what you need and a person answers — no account, no
                cart, no autoresponder. Chefs and retailers welcome.
              </p>
            </Settle>
          </div>
        </Container>
      </div>

      <Container className="py-12 lg:hidden">
        <SpreadMark numeral="V" label="Trade" onInk />
        <h2 className="mt-6 font-display text-display tracking-display text-on-ink">
          Pull up a chair.
        </h2>
        <p className="mt-6 max-w-[44ch] text-lede text-on-ink-muted">
          Tell us what you need and a person answers — no account, no cart, no
          autoresponder. Chefs and retailers welcome.
        </p>
      </Container>

      {/* Three doors, for anyone who wants to skip to their path. */}
      <Container className="relative">
        {/* Reduced motion: all three buyer doors render fully visible in their
            final grid; no element inside the inquiry form ever moves. */}
        <Formation className="grid gap-px border-y border-ink-line bg-ink-line md:grid-cols-3">
          {DOORS.map((door, i) => (
            <Link
              key={door.title}
              data-formation-item
              href={door.href}
              className="group/door bg-ink p-8 transition-colors duration-medium ease-si hover:bg-ink-raised sm:p-9"
            >
              <span className="font-mono text-eyebrow font-semibold text-gold-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-balance font-display text-heading tracking-display text-on-ink transition-colors duration-fast ease-si group-hover/door:text-gold">
                {door.title}
              </h3>
              {door.line ? (
                <p className="mt-3 text-[0.9375rem] text-on-ink-muted">
                  {door.line}
                </p>
              ) : (
                <Fact claim={product.heroSize}>
                  {(size) => (
                    <p className="mt-3 text-[0.9375rem] text-on-ink-muted">
                      The {size} jar, on your shelf, with real provenance.
                    </p>
                  )}
                </Fact>
              )}
            </Link>
          ))}
        </Formation>
      </Container>

      {/* The full adaptive form, in place — the page's real conversion. */}
      <Container width="narrow" className="relative py-section-tight">
        <div className="mb-12">
          <Eyebrow onInk>Start here</Eyebrow>
          <Lines
            as="h3"
            className="mt-5 font-display text-title tracking-display text-on-ink"
          >
            Tell us what you need.
          </Lines>
        </div>

        {/* ZERO MOTION INVARIANT: InquiryForm and every descendant stay outside
            all GSAP primitives and continuous effects. No scrubbed or
            continuous animation may run while a field is in the viewport.

            The form is authored against the light surface tokens. This is the
            one place it runs on ink, so those tokens are re-pointed for this
            subtree rather than forking a second copy of the form. */}
        <div className="si-invert">
          <Suspense
            fallback={
              <div
                className="min-h-[min(30rem,70svh)]"
                aria-busy="true"
                aria-live="polite"
              >
                <p className="text-on-ink-muted">Loading the form…</p>
              </div>
            }
          >
            <InquiryForm />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
