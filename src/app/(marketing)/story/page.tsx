import type { Metadata } from "next";
import Image from "next/image";

import { Fact } from "@/components/content/Fact";
import { Button } from "@/components/core/Button";
import { Container } from "@/components/core/Container";
import { Eyebrow, Section, SectionHeading } from "@/components/core/Section";
import { CTA } from "@/content/site";
import { story } from "@/content/story";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "From St. Vincent in the early 1900s, refined in Trinidad & Tobago, carried five generations, now in the United States.",
  alternates: { canonical: "/story" },
};

export default function StoryPage() {
  return (
    <>
      <section className="si-grain relative isolate overflow-hidden bg-ink py-section">
        <div aria-hidden className="si-rake absolute inset-0" />
        <Container className="relative">
          <div className="max-w-[36rem]">
            <Eyebrow onInk>Our story</Eyebrow>
            <h1 className="mt-5 text-display tracking-display text-on-ink">
              Five generations, one recipe.
            </h1>
          </div>
          <Fact claim={story.origin}>
            {(text) => (
              <p className="mt-7 max-w-measure text-lede text-on-ink-muted">
                {text}
              </p>
            )}
          </Fact>
        </Container>
      </section>

      {/* Chapters — alternating, so it reads as a narrative not a card grid */}
      <Section>
        <Fact claim={story.chapters}>
          {(chapters) => (
            <div className="flex flex-col gap-section-tight">
              {chapters.map((c, i) => (
                <article
                  key={c.title}
                  className="grid gap-8 border-t border-cream-line pt-12 lg:grid-cols-[0.4fr_0.6fr] lg:gap-20"
                >
                  <header>
                    <Eyebrow>{c.eyebrow}</Eyebrow>
                    <h2 className="mt-4 font-display text-title tracking-display text-on-cream">
                      {c.title}
                    </h2>
                    <span className="mt-6 block font-mono text-eyebrow text-gold-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </header>
                  <p className="max-w-measure text-lede text-on-cream-muted">
                    {c.body}
                  </p>
                </article>
              ))}
            </div>
          )}
        </Fact>
      </Section>

      {/* Production — real photographs of the actual kitchen */}
      <Section ground="ink" id="production">
        <SectionHeading
          eyebrow="How it is made"
          title="Small batches, in a real kitchen."
          onInk
        />
        <Fact claim={story.facility}>
          {(text) => (
            <p className="mt-6 max-w-measure text-lede text-on-ink-muted">
              {text}
            </p>
          )}
        </Fact>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <div
              key={n}
              className="relative aspect-[4/5] overflow-hidden border border-ink-line"
            >
              <Image
                src={`https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/locations/locations${n}.webp`}
                alt="Inside the licensed commercial kitchen where Sunny Island Pepper Sauce is made."
                fill
                sizes="(max-width: 640px) 45vw, 220px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* The mission, printed on the product itself */}
      <Section ground="cream-sunk">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm lg:mx-0">
            <Image
              src="/brand/label-message-panel.webp"
              alt="The 'A Special Message' panel printed on every Sunny Island Pepper Sauce label."
              fill
              sizes="(max-width: 1024px) 70vw, 380px"
              className="object-contain"
            />
          </div>

          <div>
            <Eyebrow>Why it exists</Eyebrow>
            <Fact claim={story.wellnessMessage}>
              {(m) => (
                <>
                  <blockquote className="mt-6">
                    <p className="si-script max-w-[32rem] text-[clamp(1.6rem,1rem+1.9vw,2.6rem)] text-gold">
                      {m.quote}
                    </p>
                    <footer className="mt-7 font-body text-eyebrow font-semibold uppercase text-on-cream-muted">
                      {m.attribution}
                    </footer>
                  </blockquote>
                  <p className="mt-8 max-w-measure text-[0.9375rem] text-on-cream-muted">
                    That message is printed on every bottle. It was not added to
                    the website afterwards — it has been part of the product
                    from the start.
                  </p>
                </>
              )}
            </Fact>
          </div>
        </div>
      </Section>

      <Section ground="ink" className="overflow-hidden text-center">
        <div aria-hidden className="si-rake absolute inset-0" />
        <div className="relative mx-auto max-w-narrow">
          <h2 className="text-display tracking-display text-on-ink">
            Bring it to your table, or your business.
          </h2>
          <div className="mt-10">
            <Button href={`${CTA.href}?source=story-footer`} size="lg">
              {CTA.label}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
