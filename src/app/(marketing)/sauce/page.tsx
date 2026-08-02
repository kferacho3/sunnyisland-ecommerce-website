import type { Metadata } from "next";

import { Fact, FactRows } from "@/components/content/Fact";
import { Button, TextLink } from "@/components/core/Button";
import { Container } from "@/components/core/Container";
import { Eyebrow, Section, SectionHeading } from "@/components/core/Section";
import { ProductStage } from "@/components/product/ProductStage.client";
import { product } from "@/content/product";
import { CTA } from "@/content/site";

export const metadata: Metadata = {
  title: "Classic Gold",
  description:
    "Scotch bonnet peppers, vinegar, onion, garlic, yellow mustard, green papaya and salt. The 8 FL OZ bottle, plus bulk formats for food service.",
  alternates: { canonical: "/sauce" },
};

export default function SaucePage() {
  return (
    <>
      {/* Product hero — the bottle is the artifact, everything else defers */}
      <section
        id="product-viewer"
        className="si-grain relative isolate overflow-hidden bg-ink py-section"
      >
        <div aria-hidden className="si-rake absolute inset-x-0 top-0 h-96" />

        <Container className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Eyebrow onInk>Sunny Island · Classic Gold</Eyebrow>
              <h1 className="mt-5 max-w-[16ch] text-display tracking-display text-on-ink">
                One sauce, made properly.
              </h1>
              <p className="mt-7 max-w-measure text-lede text-on-ink-muted">
                A Scotch bonnet pepper sauce built on a family recipe carried
                five generations. Bright, fruity heat with green papaya
                underneath for body — not just a burn.
              </p>

              <Fact claim={product.heroSize}>
                {(size) => (
                  <p className="mt-8 inline-block border border-gold/35 bg-gold/10 px-5 py-2.5 font-mono text-sm tracking-[0.06em] text-gold">
                    {size}
                  </p>
                )}
              </Fact>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Button
                  href={`${CTA.href}?buyer=consumer&source=sauce`}
                  size="lg"
                >
                  Ask about this sauce
                </Button>
                <TextLink href="/partners" onInk>
                  Buying by the case
                </TextLink>
              </div>
            </div>

            <ProductStage className="mx-auto w-full max-w-md lg:mx-0" />
          </div>
        </Container>
      </section>

      {/* Ingredients — the strongest verified fact on the site */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="What's in it"
            title="Seven things, and nothing else."
          />
          <div>
            <Fact claim={product.ingredients}>
              {(list) => (
                <ol className="grid gap-x-8 sm:grid-cols-2">
                  {list.map((item, i) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-4 border-b border-cream-line py-4"
                    >
                      <span className="font-mono text-eyebrow text-gold-deep">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-body text-[0.9375rem] font-medium text-on-cream">
                        {item}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </Fact>

            <Fact claim={product.flavourNotes}>
              {(notes) => (
                <ul className="mt-10 space-y-4">
                  {notes.map((n) => (
                    <li
                      key={n}
                      className="flex gap-4 text-[0.9375rem] text-on-cream-muted before:mt-[0.65em] before:h-px before:w-4 before:flex-none before:bg-ember before:content-['']"
                    >
                      {n}
                    </li>
                  ))}
                </ul>
              )}
            </Fact>
          </div>
        </div>
      </Section>

      {/* Ways to use */}
      <Section ground="cream-sunk" id="ways-to-use">
        <SectionHeading
          eyebrow="Ways to use it"
          title="It is not only a table sauce."
          lede="Cooked in early or spooned on at the end — it does both, which is why it tends to disappear faster than people expect."
        />
        <Fact claim={product.waysToUse}>
          {(uses) => (
            <div className="mt-14 grid gap-px overflow-hidden border border-cream-line bg-cream-line sm:grid-cols-2 lg:grid-cols-3">
              {uses.map((u) => (
                <div key={u.title} className="bg-cream-raised p-7">
                  <h3 className="font-display text-heading tracking-display text-on-cream">
                    {u.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] text-on-cream-muted">
                    {u.note}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Fact>
      </Section>

      {/* Label facts. Pending rows omit themselves; a fully pending table
          removes its own section rather than rendering an empty shell. */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="From the label"
            title="Nutrition, per serving."
            lede="Taken from the printed label, not retyped from memory."
          />
          <div>
            <Fact claim={product.servingSize}>
              {(s) => (
                <p className="mb-6 font-body text-sm text-on-cream-muted">
                  Serving size <span className="text-on-cream">{s}</span>
                </p>
              )}
            </Fact>
            <FactRows rows={product.nutrition} />
            <p className="mt-8 max-w-measure text-sm text-on-cream-muted">
              Servings per container is withheld: the current artwork carries
              the same figure on every size, which cannot be right across the
              range. It returns once the corrected values are confirmed.
            </p>
          </div>
        </div>
      </Section>

      {/* Formats */}
      <Section ground="cream-sunk">
        <SectionHeading
          eyebrow="Formats"
          title="What you can ask for."
          lede="Only confirmed rows appear here. Anything still being finalised is left out rather than guessed at."
        />
        <FactRows rows={product.formats} className="mt-12" />
        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href={`${CTA.href}?buyer=consumer&source=sauce-formats`}>
            Ask what&rsquo;s available
          </Button>
          <TextLink href="/partners">Wholesale and retail</TextLink>
        </div>
      </Section>

      {/* Close */}
      <Section ground="ink" className="overflow-hidden text-center">
        <div aria-hidden className="si-rake absolute inset-0" />
        <div className="relative mx-auto max-w-narrow">
          <h2 className="text-display tracking-display text-on-ink">
            Want some?
          </h2>
          <p className="mx-auto mt-6 max-w-measure text-lede text-on-ink-muted">
            Tell us how much and how you&rsquo;d like it. We&rsquo;ll come back
            with a real answer, not an autoresponder.
          </p>
          <div className="mt-10">
            <Button
              href={`${CTA.href}?buyer=consumer&source=sauce-footer`}
              size="lg"
            >
              {CTA.label}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
