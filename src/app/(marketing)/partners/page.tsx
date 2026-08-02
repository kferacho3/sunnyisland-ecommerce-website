import type { Metadata } from "next";
import Image from "next/image";

import { FactRows } from "@/components/content/Fact";
import { Button, TextLink } from "@/components/core/Button";
import { Container } from "@/components/core/Container";
import { Eyebrow, Section, SectionHeading } from "@/components/core/Section";
import { partners } from "@/content/partners";
import { CTA } from "@/content/site";

export const metadata: Metadata = {
  title: "Wholesale & Retail Partners",
  description:
    "Wholesale distribution and retail partnerships for Sunny Island Pepper Sauce. Formats, readiness, and how to start an inquiry.",
  alternates: { canonical: "/partners" },
};

const PATHS = [
  { key: "wholesale", ...partners.wholesale, buyer: "wholesale" },
  { key: "retail", ...partners.retail, buyer: "retail" },
] as const;

export default function PartnersPage() {
  return (
    <>
      <section className="si-grain relative isolate overflow-hidden bg-ink py-section">
        <div aria-hidden className="si-rake absolute inset-0" />
        <Container className="relative">
          <div className="max-w-[38rem]">
            <Eyebrow onInk>Partners</Eyebrow>
            <h1 className="mt-5 text-display tracking-display text-on-ink">
              Bring Sunny Island to your operation or your shelves.
            </h1>
            <p className="mt-7 max-w-measure text-lede text-on-ink-muted">
              We&rsquo;re a small producer scaling deliberately. That means
              straight answers about what we can and can&rsquo;t do yet — which
              is more useful to a buyer than a brochure.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={`${CTA.href}?buyer=wholesale&source=partners-hero`}>
              Wholesale inquiry
            </Button>
            <Button
              href={`${CTA.href}?buyer=retail&source=partners-hero`}
              variant="ghost-ink"
            >
              Retail inquiry
            </Button>
          </div>
        </Container>
      </section>

      {/* Two paths */}
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          {PATHS.map((p) => (
            <div
              key={p.key}
              id={p.key}
              className="flex flex-col rounded-lg border border-cream-line bg-cream-raised p-8 sm:p-10"
            >
              <h2 className="font-display text-title tracking-display text-on-cream">
                {p.title}
              </h2>
              <p className="mt-4 text-[0.9375rem] text-on-cream-muted">
                {p.lede}
              </p>

              <h3 className="mt-9 font-body text-eyebrow font-semibold uppercase text-gold-deep">
                A good fit if
              </h3>
              <ul className="mt-4 flex-1 space-y-3">
                {p.fit.map((f) => (
                  <li
                    key={f}
                    className="flex gap-4 text-[0.9375rem] text-on-cream before:mt-[0.65em] before:h-px before:w-4 before:flex-none before:bg-ember before:content-['']"
                  >
                    {f}
                  </li>
                ))}
              </ul>

              <p className="mt-8 border-t border-cream-line pt-6 text-sm text-on-cream-muted">
                {p.formats}
              </p>

              <div className="mt-8">
                <Button
                  href={`${CTA.href}?buyer=${p.buyer}&source=partners-${p.key}`}
                >
                  Start a {p.key} inquiry
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Production — the ten real kitchen photographs are the proof here */}
      <Section ground="ink" id="production">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Where it is made"
              title="A licensed commercial kitchen."
              onInk
              lede="Not a home kitchen scaled up. The room has walk-in coolers, gas ranges and convection ovens, and it runs everything from a test batch to a full production run."
            />
            <div className="mt-10">
              <TextLink href="/story#production" onInk>
                More on how it is made
              </TextLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="relative aspect-square overflow-hidden rounded border border-ink-line"
              >
                <Image
                  src={`https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/locations/locations${n}.webp`}
                  alt="Inside the licensed commercial kitchen where Sunny Island Pepper Sauce is made."
                  fill
                  sizes="(max-width: 640px) 45vw, 200px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Readiness — the honest table */}
      <Section>
        <SectionHeading
          eyebrow="Readiness"
          title="What we can hand you today."
          lede="This table lists only what actually exists. Rows still being finalised are absent rather than marked 'coming soon' — if you need one of them to make a decision, ask and we'll tell you where it stands."
        />
        <FactRows rows={partners.readiness} className="mt-12" />
      </Section>

      {/* Process */}
      <Section ground="cream-sunk">
        <SectionHeading eyebrow="How it goes" title="Four steps, no account." />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-lg border border-cream-line bg-cream-line sm:grid-cols-2 lg:grid-cols-4">
          {partners.process.map((s) => (
            <li key={s.step} className="bg-cream-raised p-7">
              <span className="font-mono text-eyebrow font-semibold text-gold-deep">
                {s.step}
              </span>
              <h3 className="mt-4 font-display text-heading tracking-display text-on-cream">
                {s.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] text-on-cream-muted">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section ground="ink" className="overflow-hidden text-center">
        <div aria-hidden className="si-rake absolute inset-0" />
        <div className="relative mx-auto max-w-narrow">
          <h2 className="text-display tracking-display text-on-ink">
            Tell us what you need to see.
          </h2>
          <p className="mx-auto mt-6 max-w-measure text-lede text-on-ink-muted">
            Specs, samples, lead times — say which of those blocks your decision
            and we&rsquo;ll answer that first.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href={`${CTA.href}?buyer=wholesale&source=partners-footer`}>
              Wholesale inquiry
            </Button>
            <Button
              href={`${CTA.href}?buyer=retail&source=partners-footer`}
              variant="ghost-ink"
            >
              Retail inquiry
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
