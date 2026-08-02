import type { Metadata } from "next";
import Image from "next/image";

import { Button, TextLink } from "@/components/core/Button";
import { Container } from "@/components/core/Container";
import { Eyebrow } from "@/components/core/Section";
import { BUYER_LABELS, type BuyerType } from "@/lib/inquiries/schema";

export const metadata: Metadata = {
  title: "Inquiry received",
  description: "We've got your inquiry and a real person will read it.",
  // A confirmation page has no search value and should never be a landing page.
  robots: { index: false, follow: false },
};

const NEXT: Record<BuyerType, string> = {
  consumer:
    "We'll confirm what's available in the sizes you asked about, then come back with pricing and how to get it to you.",
  wholesale:
    "We'll review the territory and volume you described, then send formats, case configuration, and lead times.",
  retail:
    "We'll review your store type and launch window, then send the product details a buyer needs to decide.",
  other:
    "We'll read through what you proposed and come back on whether it's a fit.",
  feedback:
    "Your note goes to the people who actually make the sauce. If it needs an answer, we'll reply.",
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; buyer?: string }>;
}) {
  const { ref, buyer } = await searchParams;

  const buyerType: BuyerType =
    buyer && buyer in BUYER_LABELS ? (buyer as BuyerType) : "consumer";

  // Only render a reference that matches the shape we issue.
  const reference =
    ref && /^SI-\d{4}-[0-9A-HJKMNP-TV-Z]{6}$/.test(ref) ? ref : null;

  return (
    <section className="si-grain relative isolate flex min-h-[calc(100svh-var(--si-header-h))] items-center overflow-hidden bg-ink py-section">
      <div aria-hidden className="si-rake absolute inset-0" />

      <Container className="relative text-center">
        <Image
          src="/brand/logo-192.webp"
          alt=""
          width={53}
          height={72}
          className="mx-auto h-16 w-auto object-contain"
        />

        <Eyebrow onInk className="mt-8">
          {BUYER_LABELS[buyerType]}
        </Eyebrow>

        <h1 className="mx-auto mt-5 max-w-[24ch] text-display tracking-display text-on-ink">
          We&rsquo;ve got it.
        </h1>

        {reference ? (
          <p className="mt-8">
            <span className="inline-block rounded-pill border border-gold/35 bg-gold/10 px-5 py-2.5 font-mono text-sm tracking-[0.08em] text-gold">
              {reference}
            </span>
          </p>
        ) : null}

        <p className="mx-auto mt-8 max-w-measure text-lede text-on-ink-muted">
          {NEXT[buyerType]}
        </p>

        <p className="mx-auto mt-6 max-w-measure text-[0.9375rem] text-on-ink-muted">
          A confirmation is on its way to your inbox. Replying to it reaches us
          directly
          {reference ? (
            <>
              {" "}
              — quoting{" "}
              <span className="font-mono text-on-ink">{reference}</span> keeps
              it on the same thread
            </>
          ) : null}
          .
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Button href="/sauce" variant="ghost-ink">
            Meet Classic Gold
          </Button>
          <TextLink href="/" onInk>
            Back to the start
          </TextLink>
        </div>
      </Container>
    </section>
  );
}
