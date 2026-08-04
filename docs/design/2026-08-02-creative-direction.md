# Sunny Island — Creative Direction

**"The Family Table"** · 2026-08-02 · Approved for build

Derived from an 8-agent research sweep (Awwwards food winners, Codrops taxonomy, luxury food brands,
motion architecture, 3D showcases, typography, performance forensics, inquiry-first IA). Research
citations live in `docs/design/2026-08-02-research-audit.md`.

---

## 1. Concept

The site is a **meal at a family table that happens to be a masterclass in restraint**. Not a store,
not a dashboard — a sequence of five magazine spreads that move from cinema (ink) to hospitality
(cream) and end at a table setting where the visitor is asked, warmly, what they need.

One protagonist: **the jar** — as film, as real-time object, as label art. It is the same object in
every medium, which is the site's structural trick: the CG film and the GLB _are the same jar_, so the
experience can pass it from cinema to interaction without a seam.

The register is **product-object cinema** (Porsche/fragrance), not documentary food cinema — because
no live-action food footage exists and we do not fake what we do not have. The design leaves a
commissioned-film-sized hole it will gladly accept later.

## 2. Adjudicated decisions (where research disagreed)

| Question                             | Decision                    | Why                                                                                                                                                |
| ------------------------------------ | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Smooth scroll (Lenis/ScrollSmoother) | **Native scroll only**      | Permanent rAF loop threatens INP on the form; wrappers break `position: sticky` pinning; award feel comes from choreography, not scroll takeover   |
| Preloader                            | **None**                    | Hero payload < 500 KB; first paint is server-rendered ink + wordmark. Loader = theater that costs visitors                                         |
| Scrubbing the film                   | **Never**                   | Unanimous: `currentTime` scrubbing is decode-bound jank. Film plays once; **scroll drives the GLB**                                                |
| View Transitions API                 | **Not yet**                 | Needs Next ≥ 15.2; we're on 15.1.6. Enter-only `template.tsx` transitions; VT later as progressive enhancement                                     |
| Motion stack                         | **gsap + @gsap/react only** | Verified 100 % free commercially (Webflow, Apr 2025). Framer Motion is not installed; GSAP owns scroll choreography. No second WebGL context, ever |

## 3. Sitemap ("The Island Pantry")

```
/            The five-spread experience (below)
/sauce       The product: label tour (scroll-driven GLB), ingredients, formats
/recipes     Editorial index — 6 T&T house recipes
/recipes/[slug]   One dish per spread: doubles, curry-chicken-roti, chicken-pelau,
                  callaloo, corn-soup, pepper-shrimp
/story       Heritage editorial: St. Vincent → Trinidad → five generations → US
/partners    Trade page, tasting-room register (wholesale + retail)
/inquire     The adaptive form (existing pipeline, restyled)
```

Header: **Sauce · Recipes · Story · For Chefs & Retailers** + gold _Inquire_ pill. The research's one
structural inversion: DTC brands bury wholesale in the footer; an inquiry-first brand puts trade in
the header.

## 4. The homepage — five spreads

### I. ARRIVAL (ink)

First 5 seconds: ink field + gold wordmark paint server-side at 0 ms → Fraunces headline sets by
SplitText line-mask (after `document.fonts.ready`) → the film fades up behind at ~600 ms → hollow
gold-stroke secondary line. Two actions only. The film is an in-page hero, never a gate.
Type signature: solid cream primary line + one `-webkit-text-stroke` gold hollow line.

### II. ORIGIN (ink → cream via signature wipe)

First-person heritage, La Revoltosa register: _"Five generations, one recipe."_ A dated, place-named
timeline (early 1900s St. Vincent → Trinidad & Tobago → US debut) with the badge and wreath as chapter
marks. The ink→cream handoff uses the **signature clip-path** — a circle-with-flame-notch derived from
the badge — the ONE reveal shape used everywhere (images, section wipes, page transitions).

### III. CRAFT (cream)

Seven ingredients, one honest room. Ingredient chapters in editorial type (no stock photography), then
the **archive plates**: the 10 real kitchen photos as small (≤ 420 px), duotone-graded, captioned
contact-sheet artifacts — documentary evidence, not heroes. Phone photos rendered large read as cheap;
rendered small, graded, and captioned they read as provenance.

### IV. TABLE (cream)

The recipes teaser: three of the six T&T dishes as typographic spread cards + the two AI food tiles at
modest scale, always captioned _serving suggestion_. Leads to `/recipes`.

### V. TRADE (ink)

The tasting-room close. Three Fraunces-headed panels — Direct Order / Wholesale (16–64 oz) / Retail —
each opening the inquiry with buyer preselected. Ends with the label's wellness message. No checkout
theater, no invented proof.

## 5. Type system (Fraunces voices)

| Voice      | Axes                                             | Use                          |
| ---------- | ------------------------------------------------ | ---------------------------- |
| display    | opsz 144 · SOFT 40 · WONK 1 · wght 600 · lh 0.92 | Spread headlines             |
| quote      | opsz 72 · SOFT 60 · WONK 0 · wght 480            | Pull quotes, heritage lines  |
| body-serif | opsz 14                                          | Recipe intros only           |
| ui         | Inter Tight                                      | Everything a buyer must read |

Fluid scale, rem-mixed clamps (never pure vw — breaks zoom, WCAG 1.4.4):
`display-xl: clamp(3.25rem, 1.5rem + 11vw, 12rem)` · `display-lg: clamp(2.5rem, 1.25rem + 6vw, 7rem)`
· `display-md: clamp(2rem, 1.1rem + 3.5vw, 4.5rem)`.

## 6. Photographic treatment (one system for a mixed library)

- `.si-media` grade on ALL photography: `contrast(1.06) saturate(.82) sepia(.16) brightness(1.02)` +
  soft-light ember wash + 8 % grain. One grade = one brand eye.
- Two SVG duotones defined once: **archive** (maroon → cream) for kitchen photos; a warm ink variant
  for anything on dark ground.
- Kitchen photos: archive plates — cream mat, caption zone, ± 1.2° rotation, honest Inter Tight
  captions. Never > 420 px wide, never ungraded.
- AI food tiles: small, always captioned. AI people scenes: **never** (policy upheld).

## 7. Motion language

- **One gate:** `gsap.matchMedia('(prefers-reduced-motion: reduce)')` — pins skipped, scrubs jump to
  end state, film replaced by poster. Every GSAP scene is created inside `withMotion()`.
- **What moves:** headlines (line-mask up, 90 ms stagger), the signature clip-path, the jar (scroll-
  scrubbed rotation), archive plates (2–6 px settle). **What never moves:** body text, forms, nav.
- Transforms/opacity only. Durations from existing tokens; ease `cubic-bezier(0.16,1,0.3,1)`.
- ScrollTrigger on native scroll; `refresh()` after fonts + images; function-based start/end.
- R3F: `frameloop="demand"`, scrub calls `invalidate()`, 0 RAF at idle, DPR cap 2/1.5.

## 8. Performance budgets (hard gates per iteration)

Hero media ≤ 500 KB · poster ≤ 40 KB · route JS ≤ 170 KB gz (home ≤ 200 KB before deferred 3D chunk
≤ 250 KB) · fonts ≤ 160 KB woff2, ≤ 2 preloads · no above-fold element starts at `opacity: 0` (LCP
exclusion trap — reveal via clip/transform) · Lighthouse mobile, `next build && start`, 5-run median.

## 9. What we reject (from research, permanently)

Announcement bars · discount language · star ratings/review counts/testimonial carousels (truth
policy + Shopify tell) · store locator before stockists exist · preloader gates · scroll hijack ·
cursor-following image trails · second WebGL context · MeshTransmissionMaterial on the jar ·
full-bleed phone photography · pure-vw type · fabricated people.

## 10. Commission list (the design accepts these later without rework)

1. Live-action food film (the Arrival spread's film slot is format-agnostic)
2. Real family/founder photography → drops into Origin's reserved plate slots
3. Studio bottle photography → replaces label-art stills in Table/Trade
4. Per-dish recipe photography → recipe spreads currently type-led by design
