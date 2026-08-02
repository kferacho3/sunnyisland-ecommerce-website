import type { Metadata } from "next";
import Image from "next/image";

import { Fact } from "@/components/content/Fact";
import { Button, TextLink } from "@/components/core/Button";
import { Container } from "@/components/core/Container";
import { Eyebrow, Section, SectionHeading } from "@/components/core/Section";
import { BuyerPathCard } from "@/components/marketing/BuyerPathCard";
import { ProofRail } from "@/components/marketing/ProofRail";
import { HeroVideo } from "@/components/media/HeroVideo.client";
import { buyerPaths, CTA, proofPoints } from "@/content/site";
import { product } from "@/content/product";
import { story } from "@/content/story";

export const metadata: Metadata = {
  title: "Caribbean heat, made for tables and shelves",
  description:
    "A five-generation Scotch bonnet pepper sauce from St. Vincent and Trinidad & Tobago, now in the United States. Direct orders, wholesale distribution, and retail partnerships.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* ── 1. Arrival ─────────────────────────────────────────────────── */}
      <section className="relative isolate min-h-[calc(100svh-var(--si-header-h))] overflow-hidden bg-ink">
        {/* The film owns the right half on desktop so the centred bottle never
            sits under the headline. Full-bleed below lg, where the vertical
            scrim alone is enough. */}
        <div className="absolute inset-0 lg:left-[44%]">
          <HeroVideo />
        </div>
        {/* Seam: blends the film's left edge into the ink ground. */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-[30%] right-0 hidden bg-gradient-to-r from-ink via-transparent to-transparent lg:block"
        />

        <Container className="relative z-10 flex min-h-[calc(100svh-var(--si-header-h))] flex-col justify-end py-20 lg:justify-center lg:py-24">
          {/* Constrained in rem, not ch: `ch` on this wrapper would resolve
              against its own 16px body font rather than the h1's display size,
              which collapsed the headline to one word per line. */}
          <div className="max-w-[34rem]">
            <Eyebrow onInk>Sunny Island · Classic Gold</Eyebrow>
            <h1 className="mt-5 text-hero tracking-hero text-on-ink">
              Caribbean heat, made for tables and shelves.
            </h1>
          </div>

          <p className="mt-7 max-w-[44ch] text-lede text-on-ink-muted">
            Scotch bonnet, green papaya, and a family recipe carried five
            generations from St.&nbsp;Vincent to Trinidad&nbsp;&amp;&nbsp;Tobago
            — now in the United States.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={CTA.href} size="lg">
              {CTA.label}
            </Button>
            <TextLink href="/sauce" onInk>
              Meet Classic Gold
            </TextLink>
          </div>
        </Container>
      </section>

      {/* ── 2. Proof rail ──────────────────────────────────────────────── */}
      <div className="si-grain relative border-y border-ink-line bg-ink py-6">
        <Container>
          <ProofRail points={proofPoints} />
        </Container>
      </div>

      {/* ── 3. Buyer paths ─────────────────────────────────────────────── */}
      <Section id="buyers">
        <SectionHeading
          eyebrow="Choose your path"
          title="Tell us how you need the sauce."
          lede="Three ways in. Each one opens the right form with the right questions — no account, about two minutes."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {buyerPaths.map((path, i) => (
            <BuyerPathCard
              key={path.key}
              index={i + 1}
              label={path.label}
              lede={path.lede}
              needs={path.needs}
              href={path.href}
            />
          ))}
        </div>
      </Section>

      {/* ── 4. The product ─────────────────────────────────────────────── */}
      <Section ground="ink" className="overflow-hidden">
        <div aria-hidden className="si-rake absolute inset-x-0 top-0 h-80" />

        <div className="relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative mx-auto w-full max-w-md lg:mx-0">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/brand/label-front-16oz.webp"
                alt="The Sunny Island Pepper Sauce front label — a flame and palm badge over the wordmark."
                fill
                sizes="(max-width: 1024px) 80vw, 440px"
                className="object-contain"
              />
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Classic Gold"
              title="Seven things, and nothing else."
              onInk
            />

            <Fact claim={product.ingredients}>
              {(list) => (
                <ul className="mt-9 flex flex-wrap gap-x-3 gap-y-3">
                  {list.map((item) => (
                    <li
                      key={item}
                      className="rounded-pill border border-ink-line px-4 py-2 font-body text-sm text-on-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </Fact>

            <Fact claim={product.flavourNotes}>
              {(notes) => (
                <ul className="mt-10 space-y-4 border-t border-ink-line pt-8">
                  {notes.map((note) => (
                    <li
                      key={note}
                      className="flex gap-4 text-[0.9375rem] text-on-ink-muted before:mt-[0.65em] before:h-px before:w-4 before:flex-none before:bg-gold before:content-['']"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              )}
            </Fact>

            <div className="mt-10">
              <TextLink href="/sauce" onInk>
                Full product detail
              </TextLink>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 5. Story preview ───────────────────────────────────────────── */}
      <Section ground="cream-sunk">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow="Since the early 1900s"
            title="Five generations, one recipe."
          />

          <div>
            <Fact claim={story.origin}>
              {(text) => <p className="text-lede text-on-cream">{text}</p>}
            </Fact>
            <Fact claim={story.facility}>
              {(text) => (
                <p className="mt-6 max-w-measure text-[0.9375rem] text-on-cream-muted">
                  {text}
                </p>
              )}
            </Fact>
            <div className="mt-9">
              <TextLink href="/story">Read the full story</TextLink>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 6. Conversion ──────────────────────────────────────────────── */}
      <Section ground="ink" className="overflow-hidden text-center">
        <div aria-hidden className="si-rake absolute inset-0" />

        <div className="relative mx-auto max-w-narrow">
          <Eyebrow onInk>Get in touch</Eyebrow>
          <h2 className="mt-5 text-display tracking-display text-on-ink">
            Tell us what you need. We&rsquo;ll route it correctly.
          </h2>
          <p className="mx-auto mt-6 max-w-measure text-lede text-on-ink-muted">
            One form, no account. It adapts to whether you&rsquo;re buying a
            bottle or a pallet.
          </p>

          <div className="mt-11 flex flex-wrap justify-center gap-3">
            {buyerPaths.map((path) => (
              <Button key={path.key} href={path.href} variant="ghost-ink">
                {path.label}
              </Button>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
