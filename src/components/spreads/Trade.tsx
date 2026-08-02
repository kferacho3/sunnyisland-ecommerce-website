import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { Container } from "@/components/core/Container";
import { Eyebrow } from "@/components/core/Section";
import { InquiryForm } from "@/components/forms/InquiryForm.client";
import { ART } from "@/components/media/FullBleed";
import { Lines, Settle } from "@/components/motion/Reveal.client";

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
    line: "16 to 64 oz for distribution and food-service programs.",
    href: "/inquire?buyer=wholesale&source=home-trade",
  },
  {
    title: "Retail Partnership",
    line: "The 8 oz jar, on your shelf, with real provenance.",
    href: "/inquire?buyer=retail&source=home-trade",
  },
] as const;

export function Trade() {
  return (
    <section id="trade" className="relative isolate bg-ink text-on-ink">
      {/* The product at full artwork ratio — nothing cropped — with the
          invitation set inside it rather than after it. */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: `${ART.sunsetJars.width} / ${ART.sunsetJars.height}`,
        }}
      >
        <Image
          src={ART.sunsetJars.src}
          alt={ART.sunsetJars.alt}
          fill
          sizes="100vw"
          className="si-media object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-ink via-ink/20 to-ink"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink via-ink/45 to-transparent lg:via-ink/15"
        />

        <Container className="absolute inset-0 flex flex-col justify-center">
          <div className="max-w-[34rem]">
            <Eyebrow onInk>Work with us</Eyebrow>
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

      {/* Three doors, for anyone who wants to skip to their path. */}
      <Container className="relative">
        <div className="grid gap-px border-y border-ink-line bg-ink-line md:grid-cols-3">
          {DOORS.map((door, i) => (
            <Link
              key={door.title}
              href={door.href}
              className="group/door bg-ink p-8 transition-colors duration-medium ease-si hover:bg-ink-raised sm:p-9"
            >
              <Settle delay={i * 0.06}>
                <span className="font-mono text-eyebrow font-semibold text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-balance font-display text-heading tracking-display text-on-ink transition-colors duration-fast ease-si group-hover/door:text-gold">
                  {door.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] text-on-ink-muted">
                  {door.line}
                </p>
              </Settle>
            </Link>
          ))}
        </div>
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

        {/* The form is authored against the light surface tokens. This is the
            one place it runs on ink, so those tokens are re-pointed for this
            subtree rather than forking a second copy of the form. */}
        <div className="si-invert">
          <Suspense
            fallback={<p className="text-on-ink-muted">Loading the form…</p>}
          >
            <InquiryForm />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
