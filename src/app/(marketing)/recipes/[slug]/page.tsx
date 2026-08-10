import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button, TextLink } from "@/components/core/Button";
import { Container } from "@/components/core/Container";
import { DishMark } from "@/components/marketing/DishMark";
import { Eyebrow } from "@/components/core/Section";
import { MotionRefresh, Settle } from "@/components/motion/Reveal.client";
import { cn } from "@/lib/cn";
import { recipes } from "@/content/recipes";

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  if (!recipe) return {};
  return {
    title: `${recipe.title} — house recipe`,
    description: recipe.intro,
    alternates: { canonical: `/recipes/${slug}` },
  };
}

/**
 * One dish, one spread. The sauce moments are marked in gold — the jar
 * appears exactly where it is used, and nowhere else.
 */
export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  if (!recipe) notFound();

  const index = recipes.findIndex((r) => r.slug === slug);
  const next = recipes[(index + 1) % recipes.length];
  const grouped = recipe.ingredients.reduce<
    { group?: string; items: typeof recipe.ingredients }[]
  >((acc, ing) => {
    const last = acc[acc.length - 1];
    if (last && last.group === ing.group) last.items.push(ing);
    else acc.push({ group: ing.group, items: [ing] });
    return acc;
  }, []);

  return (
    <>
      <MotionRefresh />

      {/* Title spread */}
      <section className="si-grain relative isolate overflow-hidden bg-ink py-section-tight">
        <div aria-hidden className="si-rake absolute inset-0" />
        <Container className="relative">
          {/* The dish's own drawn plate. The title spread was a headline on an
              empty ink field — for a recipe page, the one place a reader
              expects to see the food. */}
          <DishMark
            slug={recipe.slug}
            className="mb-8 h-24 w-24 sm:h-28 sm:w-28"
          />
          <Eyebrow onInk>
            House recipe {String(index + 1).padStart(2, "0")} · {recipe.dish}
          </Eyebrow>
          {/* Above-fold LCP text stays server-rendered and unsplit. */}
          <h1 className="mt-6 max-w-[12ch] font-display text-display-xl text-on-ink">
            {recipe.title}
          </h1>
          <Settle className="mt-8">
            <p className="max-w-[58ch] font-display text-lede italic leading-relaxed text-on-ink-muted [font-variation-settings:var(--si-voice-quote)]">
              {recipe.intro}
            </p>
          </Settle>

          <Settle className="mt-10" delay={0.08}>
            <dl className="flex flex-wrap gap-x-10 gap-y-3 border-t border-ink-line pt-6">
              {(
                [
                  ["Serves", recipe.serves],
                  ["Active", recipe.activeTime],
                  ["Total", recipe.totalTime],
                ] as const
              ).map(([k, v]) => (
                <div key={k}>
                  <dt className="font-body text-eyebrow font-semibold uppercase text-on-ink-muted">
                    {k}
                  </dt>
                  <dd className="mt-1 font-body text-[0.9375rem] font-medium text-on-ink">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </Settle>
        </Container>
      </section>

      {/* The cook */}
      <section className="bg-cream py-section-tight text-on-cream">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            {/* Ingredients rail */}
            <aside>
              <h2 className="font-display text-title tracking-display text-on-cream">
                What you need
              </h2>
              <div className="mt-6 space-y-7">
                {grouped.map((g, gi) => (
                  <div key={g.group ?? gi}>
                    {g.group ? (
                      <h3 className="mb-3 font-body text-eyebrow font-semibold uppercase text-gold-deep">
                        {g.group}
                      </h3>
                    ) : null}
                    <ul className="space-y-2.5">
                      {g.items.map((ing) => (
                        <li
                          key={ing.item}
                          className={cn(
                            "flex gap-3 text-[1rem] leading-[1.55]",
                            ing.isSauce
                              ? "font-semibold text-ember"
                              : "text-on-cream-muted",
                          )}
                        >
                          <span
                            aria-hidden
                            className={cn(
                              "mt-[0.65em] h-px w-3 flex-none",
                              ing.isSauce ? "bg-ember" : "bg-cream-line",
                            )}
                          />
                          {ing.item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p className="mt-8 border-t border-cream-line pt-6 text-[0.9375rem] leading-[1.6] text-on-cream-muted">
                <span className="font-semibold text-on-cream">Heat: </span>
                {recipe.heat}
              </p>
            </aside>

            {/* Steps */}
            <div>
              <h2 className="font-display text-title tracking-display text-on-cream">
                The cook
              </h2>
              <ol className="mt-6">
                {recipe.steps.map((step, si) => (
                  <li
                    key={si}
                    className={cn(
                      "grid grid-cols-[2.5rem_1fr] gap-4 border-b border-cream-line py-6 sm:gap-6",
                      step.sauceStep && "bg-gold/[0.07]",
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-sm font-bold",
                        step.sauceStep ? "text-ember" : "text-gold-deep",
                      )}
                    >
                      {String(si + 1).padStart(2, "0")}
                    </span>
                    <div>
                      {step.title ? (
                        <h3 className="font-display text-heading tracking-display text-on-cream">
                          {step.title}
                        </h3>
                      ) : null}
                      <p className="mt-2 max-w-measure text-[1.0625rem] leading-[1.65] text-on-cream">
                        {step.text}
                      </p>
                      {step.sauceStep ? (
                        <p className="mt-2 font-body text-eyebrow font-semibold uppercase text-ember">
                          The sauce moment
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-10 border border-cream-line bg-cream-raised p-6">
                <h3 className="font-body text-eyebrow font-semibold uppercase text-gold-deep">
                  From the family
                </h3>
                <p className="mt-2 max-w-measure text-[1rem] leading-[1.6] text-on-cream-muted">
                  {recipe.tip}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Close: the jar, then onward */}
      <section className="si-grain relative isolate overflow-hidden bg-ink py-section-tight text-center">
        <div aria-hidden className="si-rake absolute inset-0" />
        <Container className="relative">
          <Image
            src="/brand/logo-192.webp"
            alt=""
            width={41}
            height={56}
            className="mx-auto h-12 w-auto object-contain"
          />
          <h2 className="mx-auto mt-6 max-w-[18ch] font-display text-display tracking-display text-on-ink">
            This one needs the jar.
          </h2>
          <p className="mx-auto mt-5 max-w-measure text-[0.9375rem] text-on-ink-muted">
            {recipe.sauceMoments.join(" · ")}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Button href="/inquire?buyer=consumer&source=recipe" size="lg">
              Get the sauce
            </Button>
            <TextLink href={`/recipes/${next.slug}`} onInk>
              Next: {next.title}
            </TextLink>
          </div>
          <p className="mt-10 text-sm text-on-ink-muted">
            <Link
              href="/recipes"
              className="underline underline-offset-4 transition-colors duration-fast ease-si hover:text-gold"
            >
              All house recipes
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
