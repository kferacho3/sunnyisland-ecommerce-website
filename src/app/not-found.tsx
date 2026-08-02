import Image from "next/image";

import { Button, TextLink } from "@/components/core/Button";
import { Container } from "@/components/core/Container";
import { Eyebrow } from "@/components/core/Section";

export default function NotFound() {
  return (
    <main className="si-grain relative isolate flex min-h-screen items-center overflow-hidden bg-ink py-section">
      <div aria-hidden className="si-rake absolute inset-0" />
      <Container className="relative text-center">
        <Image
          src="/brand/symbol-192.webp"
          alt=""
          width={64}
          height={64}
          className="mx-auto h-14 w-14 object-contain"
        />
        <Eyebrow onInk className="mt-8">
          404
        </Eyebrow>
        <h1 className="mx-auto mt-5 max-w-[20ch] text-display tracking-display text-on-ink">
          That page isn&rsquo;t here.
        </h1>
        <p className="mx-auto mt-6 max-w-measure text-lede text-on-ink-muted">
          It may have moved while we rebuilt the site. The sauce, the partner
          information and the inquiry form are all still where you&rsquo;d
          expect.
        </p>
        <div className="mt-11 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Button href="/sauce" variant="ghost-ink">
            Meet Classic Gold
          </Button>
          <TextLink href="/" onInk>
            Back to the start
          </TextLink>
        </div>
      </Container>
    </main>
  );
}
