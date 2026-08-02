import type { Metadata } from "next";
import { Suspense } from "react";

import { Container } from "@/components/core/Container";
import { Eyebrow, Section } from "@/components/core/Section";
import { InquiryForm } from "@/components/forms/InquiryForm.client";

export const metadata: Metadata = {
  title: "Inquire for Sauce",
  description:
    "One form for direct orders, wholesale distribution, retail partnerships, and feedback. No account, about two minutes.",
  alternates: { canonical: "/inquire" },
  robots: { index: true, follow: true },
};

export default function InquirePage() {
  return (
    <>
      <section className="si-grain relative isolate overflow-hidden bg-ink py-section-tight">
        <div aria-hidden className="si-rake absolute inset-0" />
        <Container className="relative">
          <div className="max-w-[36rem]">
            <Eyebrow onInk>Inquire</Eyebrow>
            <h1 className="mt-5 text-display tracking-display text-on-ink">
              Tell us what you need.
            </h1>
            <p className="mt-6 max-w-measure text-lede text-on-ink-muted">
              One form for every kind of order. Pick the path that fits and
              we&rsquo;ll only ask what&rsquo;s relevant — no account, about two
              minutes.
            </p>
          </div>
        </Container>
      </section>

      <Section width="narrow" className="pt-section-tight">
        {/* useSearchParams needs a Suspense boundary to keep this page static. */}
        <Suspense
          fallback={<p className="text-on-cream-muted">Loading the form…</p>}
        >
          <InquiryForm />
        </Suspense>
      </Section>
    </>
  );
}
