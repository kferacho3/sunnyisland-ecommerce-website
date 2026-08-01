# Sunny Island — Inquiry-First Website Revamp

**Design spec** · 2026-08-01 · Repo: `kferacho3/sunnyisland-ecommerce-website`

---

## 1. Problem

The site presents itself simultaneously as an ecommerce storefront, account platform, recipe network,
event directory, article aggregator, location service, newsletter community, and 3D playground. None of
those serve the business goal, and three of them actively damage it.

Three findings, each verified against the source, define the work:

**The conversion action has never functioned.** `src/app/contact/inquiries/api/route.ts:13` sets
`SMTP_HOST = "sunnyislandpepper@gmail.com"` — an email address in a hostname slot — and passes it to
`net.createConnection(587, host)`. `SMTP_USER` / `SMTP_PASS` are the literal strings `"yourSMTPusername"` /
`"yourSMTPpassword"`. Every inquiry ever submitted was silently discarded while the UI reported success.
Both newsletter forms are the same shape: `Footer.tsx:24-39` and `SectionNewsletter.tsx:29-44` `await` a
`setTimeout` and then render "Subscribed!". Nothing is stored or sent.

**The site publishes fabricated social proof.** `src/app/shop/sections/ratingsReview.tsx:18-73` ships four
invented reviews, three flagged `verified: true`, under a hardcoded `totalReviews = 120` /
`averageRating = 4.9` aggregate. Six further fake testimonials appear on `contact/careers` and
`contact/supportUs`, alongside a "$25K+ donated" claim and an unnamed "🏆 Award Winning" badge. Four
mutually contradictory customer counts ship at once: 1M+, 50,000+, 10K+, 1000+.

**Credentials are in git history.** `env.local` is tracked (`git ls-files` returns it; `git check-ignore`
exits 1). `.gitignore` has `.env*` and `.env.local`; neither pattern matches a filename without a leading
dot. It contains 18 values including a GCP API key, the Eventbrite client secret, a billable SerpAPI key,
two Pinterest tokens, the Shopify Storefront token, `NEXTAUTH_SECRET`, and a plaintext database password.
A Pexels key is additionally hardcoded in `explore/blog/page.tsx:77` — a `"use client"` file, so it ships
in the browser bundle.

## 2. Outcome

A five-page brand and lead-generation site with one action: **Inquire for Sauce**.

| Route | Job |
|---|---|
| `/` | Brand introduction and buyer routing |
| `/sauce` | Complete Classic Gold product experience |
| `/partners` | Wholesale distribution and retail partnership qualification |
| `/story` | Heritage, production, and mission |
| `/inquire` | Account-free adaptive inquiry form |

Plus `/inquire/thank-you`, `/legal/privacy`, `/legal/terms`, `/accessibility`, `sitemap.ts`, `robots.ts`,
`not-found.tsx`, `global-error.tsx`.

No accounts, no cart, no checkout, no theme toggle, no aggregated content, no geolocation.

Header: logo · Sauce · Partners · Story · **Inquire for Sauce**.

## 3. Decisions taken

| Decision | Choice | Reason |
|---|---|---|
| Rebuild path | Parallel build in `(marketing)` route group, then flip and delete | Old site stays live; new code inherits no legacy patterns |
| 3D scope | Deferred viewer with film-to-bottle handoff | The video is CG of the same jar, so the match can be near-exact |
| Mail stack | Resend + React Email + Postgres | Durable lead record survives a mail outage |
| Theme | Single light-based theme with dark cinematic sections | Dark mode is doubly broken today and nobody has used it |
| Display type | Fraunces (variable) | Warm, editorial, food-appropriate; pairs with gold |
| Body type | Inter Tight | Legible at UI sizes, neutral against Fraunces |
| Content integrity | `Claim<T>` discriminated union | Makes unverified facts structurally unrenderable |

## 4. Assets

### 4.1 The film

`https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/hero/SunnyIslandPepperSauceHero.mp4`
— 5,982,902 B, h264, 1280×720, 59.54 s @ 60 fps, `Cache-Control: NONE`.

It is a CG motion-graphics render of the jar, not live-action. It cycles through yellow, grey, green,
purple, orange, and black backgrounds. The colour churn reads as a stock template and is cut.

Two black-field segments are retained:

| Source | Content | Role |
|---|---|---|
| ~17.5–22.0 s | Black field, bottle small, drifting embers, glowing wordmark | Opening approach |
| ~55.0–59.5 s | Black field, bottle centred, slow settle | Hero body and handoff frame |

Cut together: a ~9 s loop entirely on black, ending on the pose the GLB assumes. Because the field is
pure black, the crossfade only has to match the bottle, not an environment — and a black-to-black splice
between the two segments needs no transition treatment.

The ranges above come from a 2–4 fps scan and are accurate to roughly ±0.25 s. Implementation frame-locks
them by stepping the boundaries at 60 fps and picking cuts where the bottle's screen position and the
wordmark's glow intensity match across the splice. The handoff frame is then exported at full resolution
from the final settle, and that single frame is the poster, the WebGL camera target, and the source of
truth for the fallback render.

Encode ladder, uploaded to S3 under immutable versioned keys with a real `Cache-Control`:

| Variant | Target |
|---|---|
| `hero.v2.1080.mp4` (1920×1080, H.264 CRF 24) | ≤ 1.0 MB |
| `hero.v2.1080.webm` (VP9) | ≤ 800 KB |
| `hero.v2.mobile.mp4` (720×1280 portrait crop) | ≤ 500 KB |
| `hero.v2.poster.webp` (the handoff frame) | ≤ 80 KB |

Measured basis: the 4.5 s tail encodes to 231,503 B at CRF 26.

### 4.2 The model

| GLB | Bytes | Decision |
|---|---|---|
| `media/glb/SunnyIslandPepperSauceFINAL.glb` | 1,126,192 | **Keep** — optimise to ≤ 800 KB as `classic-gold.v2.glb` |
| `media/glb/SunnyIslandLogo.glb` | 6,903,752 | Drop — 6.6 MB for an extruded logo |
| `media/glb/redPepper.glb` | 261,480 | Drop |
| `media/glb/yellowPepper.glb` | 252,964 | Drop |

### 4.3 Photography

Genuine, retained:

- `explore/locations/locations1–10.webp` (~75 KB each) — unretouched photos of the licensed commercial
  kitchen. Low production value, high credibility. Primary `/partners` and `/story#production` imagery.
- `explore/aboutUs/about8.webp` — the only authentic product-in-use lifestyle photo in the bucket.
- `shop/PepperSauceBottleShopDisplay.webp` — clean cut-out of the jar (a composite render, not a photograph).

Not retained: `aboutUs/about1–5.webp` are DALL·E 1024×1024 squares; `about6/7`, all `careers/*` and
`supportUs/*` images are licensed stock with the badge composited in, with no licence record in the repo.
~149 third-party food photos are re-hosted on Sunny Island S3 under `explore/recipes/`.

**No new photography will be generated.** A site whose thesis is verifiability cannot be illustrated with
invented images. Derived assets — poster frames, re-encodes, GLB renders, traced SVG — are generated from
real sources and are in scope. Abstract non-factual texture (grain, gradient fields) is in scope.

### 4.4 Identity

`public/` holds three PNG logos (440–870 KB) and `ZelioonWild-BLOm5.otf`. **No vector master exists.** A
traced SVG of the badge is produced for favicon and small sizes. The beveled 3D wordmark in the video has
no font equivalent and is treated as a brand image, not recreated in type.

`SunnyIslandLogoName.png` is 2800 px wide and `priority`-preloaded into a ~200 px slot. `Footer.tsx:200`
is a raw `<img>` loading a 440 KB PNG into a 160 px box on every page. Both fixed.

## 5. Content integrity

### 5.1 The mechanism

```ts
// src/content/claim.ts
export type Approved<T> = {
  readonly status: "approved";
  readonly value: T;
  readonly source: string;   // COA, label photograph, invoice, registration number
  readonly owner: string;    // who signed off
  readonly reviewed: string; // ISO date
};
export type Pending = { readonly status: "pending"; readonly note: string };
export type Claim<T> = Approved<T> | Pending;

export const approved = <T>(value: T, source: string, owner: string, reviewed: string): Approved<T> =>
  ({ status: "approved", value, source, owner, reviewed });
export const pending = (note: string): Pending => ({ status: "pending", note });
export const isApproved = <T>(c: Claim<T>): c is Approved<T> => c.status === "approved";
```

Every product fact, count, certification, and testimonial in `src/content/` is a `Claim<T>`. Rendering
components accept `Claim<T>` and nothing else, so a bare literal cannot reach the DOM:

```tsx
<Fact claim={product.sodiumMg}>{(mg) => <Row label="Sodium">{mg} mg</Row>}</Fact>
```

`Pending` renders `null`. A section whose claims are all `Pending` omits itself rather than rendering an
empty shell. This is the design's answer to the fabricated-review class of defect: it is enforced by the
compiler, not by discipline.

`pnpm ledger` walks `src/content/` and prints every claim with status, source, owner, and consuming pages.
That output is the launch gate.

### 5.2 Seeded as approved

Content verified as first-party during the audit:

| Source | Retained as |
|---|---|
| `src/data/storyData.ts` sections 1–7 | `content/story.ts` — Trinidad & Tobago origin, family recipe, mental-health and small-business mission, Feracho Brand partnership, community, events |
| `src/data/faqData.ts` | `content/faq.ts` — 8 oz bottles, do not freeze, shelf stable, discoloration causes, vegan, gluten-free, iodine-free |
| `src/app/shop/sections/nutrition.tsx:16-34` | `content/product.ts` — panel values and the seven-item ingredient list |
| `src/app/explore/locations/page.tsx:183-230` | `content/partners.ts` — licensed commercial kitchen, hand-made batches, test batches through full production runs |
| `src/data/useCaseData.tsx` (~200 application lines) | `content/product.ts` — trimmed to `/sauce#ways-to-use` |
| `src/app/contact/careers/page.tsx:109-162` | `content/partners.ts` — "Chef Collaborations" and "Wholesale Partners" copy, currently miscategorised as job listings |
| `src/app/contact/inquiries/page.tsx:46-60` | `lib/inquiries/schema.ts` — wholesale field set and business-type taxonomy (reference only; the code is not ported) |

`storyData.ts` section 8 ("Recipe Submissions") is dropped — it solicits account-based submissions.

### 5.3 Blocked on owner input

These start `Pending`. Implementation is not blocked; launch is.

1. **Routing address.** Nine email addresses across three apex domains appear in the code
   (`sunnyisland.com`, `sunnyislandpepper.com`, `sunnyislandpeppersauce.com`). Which are owned and monitored?
2. **Inbox topology.** Do DTC, Wholesale, and Retail route to one inbox or three?
3. **Active SKUs.** Only OG has a `modelId`; the other four render "COMING SOON". `productsData.ts` also
   contradicts itself: VERDE is labelled *Mild* at `spiceLevel: 1` but carries 150,000–325,000 SHU, identical
   to the `spiceLevel: 3` OG; BLAZE is `spiceLevel: 4` at 125,000–300,000 SHU, a *lower* range than OG.
   Are the SHU figures HPLC-tested or estimated?
4. **Shipping legality.** `faqData.ts:95` says shipping arrives "as soon as we are licensed", while
   `shop.tsx:303` and `Header.tsx:29` advertise free shipping over $50 and $100 respectively.
5. **Regulated-claim documentation.** A COA for the panel — note 48 servings × 5.7 g = 273.6 g against the
   8 oz (227 g) bottle in `faqData.ts:16`; the exact label ingredient statement ("Fruit" and "Condiments"
   are categories, not declarable ingredients); resolution of `faqData.ts:52` ("none of the Big Nine
   allergens") against `nutrition.tsx:230` ("facility that processes various ingredients"); pH / water
   activity behind "shelf stable"; whether vegan and gluten-free are certified or self-attested; whether
   "Sunny Island" is a registered mark, since ® is used at `faqData.ts:33` and `Footer.tsx:368`.
6. **"Est. 1994."** Asserted at `about:86`, `about:548`, and `Footer.tsx:206`; `storyData.ts` contains no
   date. Recipe or business? Same question for the mental-health non-profit asserted at `faqData.ts:77`.

Until answered, no social proof ships. Zero testimonials is the correct state, not placeholder numbers.

## 6. Architecture

```
src/
  app/
    (marketing)/
      layout.tsx                SiteHeader + SiteFooter
      page.tsx                  landing
      sauce/page.tsx
      partners/page.tsx
      story/page.tsx
      inquire/page.tsx
      inquire/thank-you/page.tsx
    api/inquiries/route.ts
    legal/privacy/page.tsx
    legal/terms/page.tsx
    accessibility/page.tsx
    layout.tsx  globals.css  sitemap.ts  robots.ts
    opengraph-image.tsx  not-found.tsx  global-error.tsx
  components/
    core/       Button Container Section SectionHeading TextLink SiteHeader SiteFooter StatusTag Accordion
    marketing/  ProofRail BuyerPathCard StoryPreview InquiryCTA
    media/      HeroVideo.client.tsx FilmToBottle.client.tsx MediaFrame.tsx
    product/    ProductViewer.client.tsx ProductViewerFallback.tsx ProductFacts.tsx ProductStage.tsx
    forms/      InquiryForm.client.tsx Field.tsx
    content/    Fact.tsx FactRows.tsx
  content/      site.ts product.ts story.ts partners.ts faq.ts claim.ts
  lib/
    inquiries/  schema.ts service.ts routing.ts rate-limit.ts reference.ts
    analytics/  events.ts
    env.ts
  styles/       tokens.css
```

**Client islands, exhaustively: `HeroVideo`, the mobile nav inside `SiteHeader`, `ProductViewer`,
`InquiryForm`.** Everything else is a server component. Today 13 of 16 pages are `"use client"`; the
homepage is a client component solely to hold a `useRef`.

Rules: no `next/head` (six files use it today and it is inert in the App Router — including the two
`impact-site-verification` tags on `page.tsx:22-30`, which therefore are not on the page and that affiliate
verification is silently failing). No `any` in product or inquiry contracts. No random values during render.
Content lives in `src/content/`, never in component literals.

## 7. Design system

`src/styles/tokens.css` defines CSS custom properties consumed by the Tailwind config.

```css
--ink:    #0B0D0D;  /* cinematic ground; derived from logo near-black #001818 */
--cream:  #FAF6EF;  /* editorial ground */
--gold:   #FCC000;  /* primary accent; matches existing tailwind primary #FFB300 family */
--ember:  #F05400;  /* action, CTA */
--maroon: #780024;  /* depth, used sparingly */
```

Sampled from the logo files. The existing `secondary: #DA1A35` is **removed** — that red appears nowhere
in the mark.

Tokens also cover the type scale, spacing, radius, shadow, container width, motion duration, easing,
header height, and focus ring. The retained easing is `cubic-bezier(0.16, 1, 0.3, 1)` — the one deliberate
curve in the current codebase, at `shop/sections/shop.tsx:108`.

Typography: Fraunces (variable) for display, Inter Tight for UI and body, both self-hosted via `next/font`.
`globals.css:1` currently `@import`s Poppins and sets `body { font-family: 'Poppins' }`, while
`layout.tsx:33` applies `inter.className` to the same element — class specificity beats element, so Inter
renders and Poppins is downloaded and discarded on every page. Both are removed.

Layout fix: `main` currently has `pt-[50px]` against an `h-[64px]` navbar, so 14 px of every page loads
beneath the header. The new `SiteHeader` owns its own height token.

## 8. Landing page

1. **Hero** — poster-first `HeroVideo` on black. Eyebrow, one headline, one supporting sentence, primary
   **Inquire for Sauce**, secondary **Meet Classic Gold**. One keyboard-accessible pause control. No
   particle field, no mouse parallax, no animated gradient text, no competing CTAs.
2. **Proof rail** — three or four approved claims only. Nothing renders that is not `Approved`.
3. **Buyer paths** — three cards in fixed order: Direct Orders, Wholesale Distribution, Retail
   Partnerships. Each: one real photograph, one sentence, two or three example needs, one CTA carrying
   `buyer` and `source`. Deterministic — the current grid randomises tile size and order per render
   (`SectionExploreGrid.tsx:33-72`), which changes navigation between refreshes and guarantees mobile CLS.
4. **Film-to-bottle** — §9.
5. **Flavour and use** — flavour profile, heat position (gated on claim 3), real applications.
6. **Product readiness** — sizes, case formats, MOQ, sample availability, service regions, lead time.
   Rows with `Pending` claims are omitted, not filled with marketing language.
7. **Story preview** — one full-bleed real photograph, two short passages.
8. **Final inquiry block** — buyer-type chips plus a verified email alternative.
9. **Footer** — brand line, four links, verified socials, one verified email, legal, copyright.

Deleted: `SectionProductSneak` (524), `SectionExploreGrid` (748), `SectionNewsletter` (486),
`SectionSocial` (323). `SectionHero` (349) is replaced by a much smaller `HeroVideo` island.

## 9. Film-to-bottle

```
<ProductStage>            server-rendered, fixed aspect-ratio box
  ├─ <img poster>         absolute inset-0, opacity 1   → paints immediately
  └─ <canvas>             absolute inset-0, opacity 0   → crossfades in
```

Both children fill the same box, so the crossfade cannot shift layout.

**Capability gate.** The viewer never loads when any of these hold: `prefers-reduced-motion: reduce`,
`navigator.connection.saveData`, `deviceMemory < 4`, or a failed WebGL2 context probe. In each case the
poster is the final state and all copy and CTAs are identical.

**Sequence.** `IntersectionObserver(rootMargin: "200px")` → dynamic `import()` of the viewer chunk → mount
hidden → on model and environment ready, crossfade 600 ms → guided rotation of ~30° with a warm key light
travelling across the label → settle → stop invalidating → enable drag. `frameloop="demand"` throughout;
zero RAF at idle.

**Camera match.** Because the video is CG of the same jar, the GLB is rendered offline at candidate camera
parameters and diffed against the extracted handoff frame until it converges. The same rig then produces
all three outputs — live viewer, poster, and fallback stills — so they match by construction.

**Budgets.** GLB ≤ 800 KB after Draco and KTX2. DPR capped at 2 desktop, 1.5 mobile. No physics, no
postprocessing pass. Full disposal of geometries, materials, textures, and environment on unmount, plus
`gl.dispose()`. `webglcontextlost` falls back to the poster permanently.

**Accessibility.** All product information is normal HTML. The canvas is `aria-hidden`. A "Rotate product"
button provides keyboard access. Drag is never required. No scroll-jacking.

**Dependency work required.** The lockfile currently needs `--legacy-peer-deps`: `drei@9.121.4` declares
peers `fiber ^8` and `react ^18` against installed `fiber 9.0.0-rc.7` and `react 19.0.0`;
`@react-three/postprocessing@3.0.0-rc.2` pins `fiber` to exactly `9.0.0-rc.5`. `@react-spring/three`,
`maath`, and `three-stdlib` are imported at seven call sites but declared in neither `package.json` —
they resolve only as drei transitives, which breaks immediately under pnpm's strict `node_modules`. A
duplicate `three@0.170.0` is nested under `stats-gl` alongside the top-level `0.172.0`; two THREE instances
break `instanceof` checks. Resolution: drei to v10, fiber to stable, drop `cannon` and `postprocessing`
entirely, declare the three transitives directly, dedupe THREE.

## 10. Inquiry pipeline

### 10.1 Schema

A Zod discriminated union on `buyerType`. Shared base: name, email, optional phone, region, preferred
contact method, message, consent, and hidden `source` / `landingPage` / `referrer` / UTM fields, plus a
honeypot, a client render timestamp, and an idempotency key.

- `consumer` — sizes, quantity, use (individual, event, food truck, subscription, gifting), needed-by date,
  fulfilment preference, recurring interest.
- `wholesale` — company, role, website, business type, territory, estimated first order, monthly volume,
  preferred formats, sample request, target start date.
- `retail` — retailer, buyer role, website, store type, store count, regions, desired SKU, launch window,
  estimated opening order, packet request.
- `other` — organisation, partnership type.

### 10.2 Order of operations

```
validate → honeypot + minimum-submit-time → rate limit (Postgres) → idempotency check
        → INSERT lead (reference SI-2026-0001) → Resend to routed inbox
        → Resend customer acknowledgement → 200 { leadId }
```

Persistence precedes notification. If either send fails after the insert, the lead is already durable:
mark `deliveryStatus: failed`, alert, retry. The visitor never resubmits.

### 10.3 Defects being fixed

- **Header injection.** The current route writes `` client.write(`Subject: ${subject}\r\n`) `` with
  `subject` taken directly from the JSON body; CRLF injects arbitrary headers. The message body is
  terminated with `\r\n.\r\n` without dot-stuffing. Subject becomes server-controlled.
- **Hanging function.** The promise settles only on the final SMTP step or an `error` event. An SMTP 4xx
  or 5xx is neither, so the function hangs to platform timeout, burning full billed duration.
- **No STARTTLS.** `AUTH LOGIN` sends base64 credentials in cleartext on port 587.
- **Rate limiting.** A module-level object keyed on the caller's own email, reset on every cold start,
  incremented before the send attempt. Replaced with Postgres keyed on hashed IP plus email.
- **Error leakage.** Raw `err.message` returned at 500.

### 10.4 Persistence

One `leads` table: id, reference, buyer type, payload JSONB, source, landing page, referrer, UTM, IP hash,
created-at, delivery status, routed-to. Unique index on the idempotency key. A second `rate_limits` table
keyed on identifier and window.

## 11. Deletion

Measured against 27,740 LOC of `.ts`/`.tsx` under `src/`.

| PR | Target | LOC | Packages |
|---|---|---|---|
| 0 | Rotate 18 credentials, revoke the Pexels key, untrack `env.local`, purge history, remove `Archive.zip` (4.2 MB) and `README copy.md` | — | — |
| 1 | Dead code — 13 components with zero importers, two 0-byte files, duplicate `api/lib/shopify.ts`, unused CSS module, `ZelioonWild-BLOm5.otf`, scaffold SVGs, duplicate `public/media/*` PNGs (~2.26 MB) | see note | 17 |
| 2 | Accounts, cart, Shopify, Prisma. None of it ever executed — the three files in `api/auth/` are misnamed for the App Router and never mounted | 540 | 7 |
| 3 | Content portal — recipes (4,444), useCaseData (2,238, harvested first), events (1,496), blog, gridData, aggregator, serpapi, pinterest, eventbrite, oauth | 12,954 | — |
| 4 | `/shop`, `/contact/*`, `/explore/about`, `/explore/locations`, four home sections, both legal pages (rewritten, not ported) | 10,010 | — |
| 5 | `/explore/products` — replaced by `ProductViewer`; `cannon` and `postprocessing` dropped | 1,705 | 5 |
| 6 | Toolchain repair — see §12 | — | +4 dev |

**Deleted by PRs 2–5: 25,209 LOC (90.9%).** PR 1's dead code is not added to that total — most of it sits
inside the same directories and is already counted (`SectionParallax` in `components/home`, `FlameShader`
in `explore/products`); it is listed separately because it can land first, with zero behaviour change.

**2,531 LOC survive deletion, and most of that is replaced rather than kept** — `Navbar` (410), `Footer`
(570), and `Sidebar` (270) are rewritten as `SiteHeader` and `SiteFooter`. What genuinely carries forward
is content, not code: `storyData.ts` (120), `productsData.ts` (78), `faqData.ts` (112), plus the harvested
nutrition values and use-case lines — roughly 400 LOC, all of it migrated into `src/content/` as `Claim<T>`.

Dependencies removed: 29 direct, ~51 transitive lock entries.

Retirement of URLs: `/shop` → 308 `/sauce`; `/explore/products` → 308 `/sauce#product-viewer`;
`/explore/about` → 308 `/story`; `/contact/inquiries` → 308 `/inquire`; `/explore/locations` → 308
`/story#production`. `/explore/blog`, `/explore/events`, `/contact/careers`, `/submit-recipe`, and the
account routes return **410 Gone**. Unrelated retired URLs are not redirected to the homepage.

Eight dead internal links are removed rather than redirected: `/explore/scoville`, `/legal/accessibility`,
`/legal/cookies`, `/scoville`, `/testimonials` (the Careers tile points at it), `/submit-recipe`,
`/api/events`. Twelve hardcoded `sunnyislandpepper.myshopify.com` links across eight files are removed —
note `env.local` names a different store, `ss4c13-jj.myshopify.com`.

## 12. Toolchain

The current toolchain does not run. `prettier` is a required, non-optional peer of
`eslint-plugin-prettier@5.2.3` and is absent from `package.json` entirely, while `eslint.config.mjs:35`
sets `"prettier/prettier": "error"` — `npm run lint` throws. `autoprefixer` appears in neither
`package.json` nor `postcss.config.mjs`, so no vendor prefixes are generated. `eslint.config.mjs:6,22`
`require()`s `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser`, neither declared.
`eslint-config-next` is installed but never extended, so no Next-specific rule has ever fired.

Repair: add `prettier`, `autoprefixer`, and both typescript-eslint packages; add `.prettierrc`; register
`autoprefixer` in `postcss.config.mjs`; extend `eslint-config-next`; move `@types/react` from
`dependencies` to `devDependencies`; add `"typecheck": "tsc --noEmit"`; migrate `lint` off the deprecated
`next lint`. `tsconfig.json` explicitly includes `"src/app/api/auth/[...nextauth.ts]"`, which pulls the
dead Prisma and NextAuth imports into the TS program — removed with PR 2.

Package manager: pnpm, per project convention.

## 13. Performance

Field targets at p75, mobile and desktop: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.

Project budgets: homepage initial JS ≤ 150 KB gzip excluding deferred 3D; no Three or R3F in the initial
hero bundle; no long task over 50 ms from decorative animation on mid-tier mobile; no hydration warnings;
no layout shift when fonts, video, form, or viewer load; no RAF loop when the product is idle; two font
families; zero console errors; stable memory across repeated viewer mount and unmount.

Hydration defects removed: `Footer.tsx:439-462` and `SectionProductSneak.tsx:117-144` compute initial
positions from `Math.random() * window.innerWidth` during render; `SunnyIslandLogo.tsx:23` reads
`window.innerWidth` in a `useState` initialiser.

Measurement: Lighthouse CI budgets on the five routes, real-user Web Vitals, bundle analysis at release
review, and test profiles for slow 4G, Save-Data, reduced motion, and no WebGL.

## 14. Accessibility

WCAG 2.2 AA. Skip link and semantic landmarks. One H1 per page. Full keyboard access to navigation, form,
video control, accordion, and rotation. Visible focus. No hover-only content. Reduced motion removes the
handoff and non-essential transitions. Pause control for the hero film. No required canvas interaction.
Validation errors associated with fields and summarised. 200% zoom and reflow. Screen-reader pass over the
complete inquiry path.

Baseline: six `prefers-reduced-motion` blocks exist today, three on pages being deleted and one in dead
code. The `StickyAccessibility` widget documents its own toggles as `(placeholder)`, sets `noAnimations`
without reading it, and is never mounted. Motion accessibility starts from zero.

## 15. SEO

Metadata API on every route: specific title and description, canonical, Open Graph image, robots
directives, route-specific structured data. Today exactly one `metadata` export exists site-wide and every
page shares one title.

Structured data only where visible content supports it: Organization, Product, FAQPage. No review, rating,
offer, price, or availability markup — none of those facts are displayed or current.

## 16. Definition of done

- Header has three links plus one CTA. No account, cart, or checkout UI anywhere.
- All three buyer types route to `/inquire` with correct `buyer` and `source` parameters.
- The hero works with video blocked and with reduced motion enabled.
- The product story works with WebGL unavailable.
- Three and R3F are absent from the initial bundle; the GLB meets its budget.
- No animation runs indefinitely without a control; no random value affects rendered content or layout.
- Every rendered claim is `Approved` with a recorded source; `pnpm ledger` shows no `Pending` claim on a
  live surface.
- A test inquiry for each buyer type is durably stored, correctly routed, acknowledged, and observable.
- Legal documents describe the site that exists — no accounts, passwords, payments, or recipe submissions.
- Retired URLs return an intentional 308 or 410.
- All 18 credentials rotated and absent from git history.
- Core Web Vitals targets met; no critical or serious accessibility findings; no console or hydration
  errors.

## 17. Out of scope

Restoring a recipe library, an events calendar, or a blog; any CMS; onsite payments; user accounts in any
form; new photography; a public admin UI for leads (the inbox plus a SQL query is sufficient at this
volume).
