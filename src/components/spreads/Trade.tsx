import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { Container } from "@/components/core/Container";
import { Eyebrow } from "@/components/core/Section";
import { InquiryForm } from "@/components/forms/InquiryForm.client";
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
    <section
      id="trade"
      className="si-grain relative isolate border-t border-ink-line bg-ink text-on-ink"
    >
      {/* A REAL SPLIT, not copy scrimmed over product — the same structural
          rule the hero exists to prove. The previous version absolutely
          positioned a 34rem copy block over an artwork band that began at 32%
          of the viewport, so at 1440 the headline ran 178px onto the
          photograph and the lede sat on a pepper. A gradient cannot fix that;
          only geometry can. Two cells means the overlap is impossible rather
          than merely dimmed, and one markup path now serves every width
          instead of a desktop overlay plus a duplicated mobile block. */}
      <div className="grid items-center lg:grid-cols-[1.1fr_0.9fr]">
        <div className="order-last px-gutter py-14 lg:order-first lg:py-20">
          <div className="ml-auto w-full max-w-[calc(var(--si-container)/2)] lg:pr-10 xl:pr-16">
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
        </div>

        <div className="relative order-first aspect-[3/4] w-full overflow-hidden lg:order-last lg:aspect-[4/5]">
          {/* A right-side crop of sauce-product-hero.webp, cut at x=990 so the
              64 oz jar is out of frame entirely.
              product.formats is a PENDING claim — only 1 of 8 formats is
              approved — and the site gates the *text* "16 to 64 oz" behind the
              ledger. An image is a claim too, and the full three-jar shot
              published "64 FL OZ (1893ml)" at a size a buyer could read and
              quote back. What is left is the approved heroSize, legibly
              labelled 8 FL OZ (250g). Also 52 KB instead of 120 KB. */}
          <Image
            src="/brand/concept/sauce-product-hero-8oz.webp"
            alt="A jar of Sunny Island Pepper Sauce at sunset, with a splash of sauce and a halved pepper."
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="si-media object-cover object-center"
          />
          {/* Dissolves the panel's inner edge into the copy ground so the
              artwork reads as a stage, not a pasted-in rectangle. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgb(var(--si-ink))_0%,rgb(var(--si-ink)/0.5)_46%,transparent_100%)] lg:inset-y-0 lg:left-0 lg:h-auto lg:w-32 lg:bg-[linear-gradient(90deg,rgb(var(--si-ink))_0%,rgb(var(--si-ink)/0.55)_44%,transparent_100%)]"
          />
        </div>
      </div>

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
