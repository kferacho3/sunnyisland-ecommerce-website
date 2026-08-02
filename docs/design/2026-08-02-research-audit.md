# SUNNY ISLAND PEPPER SAUCE — COMPLETE DESIGN AUDIT
**Synthesis of 8 research tracks · 2026-08-02 · For the creative director**

**The thesis, in one line:** the premium Caribbean pepper-sauce lane is empty — the closest heritage competitor (Mama Maisa's, https://mamamaisas.com, same-era St. Lucia story) executes at flea-market level, and the category's luxury leader TRUFF (https://truff.com) runs zero WebGL and zero video. Sunny Island's 7.4s CG film + real-time jar GLB is an ownable asset stack nobody in the category has. The register to borrow is Michelin, not Shopify: because there is no cart, the site can adopt fine-dining grammar (Eleven Madison Park's sequence storytelling, https://www.elevenmadisonpark.com; Atomix's experience-named nav, https://www.atomixnyc.com) that ecommerce competitors structurally cannot.

**Project baseline (verified locally):** next@^15.1.6, react@^19, framer-motion@^12.0.6, @react-three/fiber@^9.0.0-rc.5, drei@^9.121.3, three@^0.172.0, zod@^4. GSAP, Lenis, and react-hook-form are NOT installed. `@react-three/cannon`, `@react-three/postprocessing`, `react-grid-layout`, `react-window` are installed and flagged for removal audit. Hero media already shipped: `hero.v2.poster.webp` 32 KB, `hero.v2.1080.webm` 360 KB, `.mp4` 464 KB, mobile 376 KB.

---

## 1. Hero ideas (3 buildable concepts)

### Concept A — "The Relay" (recommended)
The film becomes touchable. Derived from the film-to-GLB handoff pattern (Ratafia Almond Spirit's persistent-protagonist bottle, https://almondspirit.com/en/, documented at https://www.awwwards.com/inspiration/3d-model-animation-ratafia-almond-spirit) plus the Graza one-video/one-sentence/one-button hero recipe (https://graza.co) and CIAO ENERGY's loader-to-hero dark-world continuity (https://www.awwwards.com/sites/ciao-energy-launch-website).

**First 5 seconds:** 0.0s — server-rendered ink #0B0D0D field with gold Fraunces wordmark and H1 already painted (this is the LCP element). 0.3s — the preloaded 32 KB poster paints behind the type; the 7.4s film (muted, playsinline, autoplay) begins: jar rotating on black, embers drifting, glowing wordmark. 0.5–5s — one Fraunces statement holds bottom-left ("Five generations. One jar."), two actions: primary "Partner With Us," secondary "The Story." Meanwhile the 1.07 MB GLB downloads silently. At the film's final pose, crossfade video→R3F canvas with camera matched to the last frame; the jar settles, then responds to drag. The video "becomes" the product. Zero new asset bytes — both halves already exist.

### Concept B — "The Altar"
Direct adaptation of Hungry Tiger's SOTD hero (observed live, https://www.eathungrytiger.com/, award record https://www.awwwards.com/sites/hungry-tiger): the proven pattern for a one-SKU jar brand with no food footage, upgraded because our jar is real-time 3D, not a static cutout.

**First 5 seconds:** 0.0s — ink field with faded label-art botanicals baked into the background texture; Inter Tight small-caps kicker "CARIBBEAN SCOTCH BONNET PEPPER SAUCE." 0.4s — viewport-wide Fraunces headline (clamp(3.25rem, 1.5rem + 11vw, 12rem), gold) resolves via masked line reveal; behind it, tone-on-tone ghost type "SCOTCH BONNET" in warmer black (Agency Eats watermark device, https://www.awwwards.com/inspiration/food-for-thought-agency-eats). 1.5s — the GLB jar fades in dead-center below the headline, slow idle rotation, ember motes behind. 3s — slow CSS marquee of the true seven-ingredient litany crosses beneath in Fraunces italic gold.

### Concept C — "The Arrival Mark"
The most restrained option, from SAKAZUKI's single-symbol first frame (https://www.awwwards.com/sites/sakazuki) and La Revoltosa's full-viewport color flood (https://www.awwwards.com/sites/la-revoltosa).

**First 5 seconds:** 0.0s — the entire viewport is maroon #780024 with only the cream flame/palm badge centered: one color, one symbol, zero words. 0.9s — badge yields via the signature clip-path wipe (see §8) into the ink world where the film hero plays. 1.5–5s — first-person heritage line types on in Fraunces italic: "I was born in St. Vincent in the early 1900s." then the primary statement and CTAs. The sauce speaks — no invented people, content-truth safe.

All three: reduced-motion swaps film for poster still; headline is real HTML text and never starts below opacity 0.01 (NO_LCP bug, https://renaissance-design.net/2024/fixing-the-no_lcp-error-in-lighthouse/).

## 2. Navigation

**Invert the DTC placement.** Every DTC comp audited (Graza, Fly By Jing, Brightland, Jacobsen, Diaspora, Fishwife) buries wholesale in the footer because their conversion is the cart. Ours IS the trade inquiry, so trade goes in the header — this is the single most important IA decision in the research.

- **Structure (Hungry Tiger split-pill model, https://www.eathungrytiger.com/):** left group = browsing (The Sauce, The Story, Recipes); center = wordmark; right group = converting ("For Chefs & Retailers" + persistent gold "Inquire" pill).
- **Experience naming (Atomix pattern, https://www.atomixnyc.com):** sections named for experiences, not functions — The Sauce / The Story / The Kitchen / Partner With Us, never "Products / About / Contact."
- **Mobile:** left group collapses into an overlay (`inert` on background, `role=dialog`, Esc-close, focus return — https://blog.logrocket.com/using-html-inert-property-manage-user-focus/); the Inquire pill never hides behind the hamburger.
- **Sitemap (recommended "Island Pantry" tier):** `/` · `/sauce` · `/story` · `/kitchen` · `/recipes` (+ `/recipes/[slug]`) · `/partners` · `/inquire` · `/accessibility` + legal. Keep legacy `/shop` and account routes out of the sitemap and robots.
- **Footer as designed ending** (Awwwards footer collections, https://www.awwwards.com/websites/footer-design/): full-bleed ink, oversized Fraunces wordmark, wreath ornament, heritage sign-off ("St. Vincent, early 1900s — Trinidad & Tobago — now debuting in the US"), one final inquiry band, then hello@ email, Instagram, accessibility, legal.

## 3. Motion language — "EMBER CADENCE"

One vocabulary, applied everywhere. The award set proves consistency beats variety: every winner studied commits to one or two signature mechanics inside a two-color world (Bucks Sauce, https://www.awwwards.com/sites/bucks-sauce; SAKAZUKI; Imperiale Bolgheri, https://www.awwwards.com/sites/imperiale-bolgheri).

**Durations:**
- Micro-interactions (hover, focus, pill states): 150–250ms
- Content reveals (clip-path, line-mask, fades): 600–900ms — the Aesop "calm pacing" band (https://work.co/clients/aesop/)
- Route enter: 500–700ms
- Ingredient marquee: 60s+ loop (fast marquees read carnival; slow reads editorial — Codrops CSS marquee, https://tympanus.net/codrops/2020/03/31/css-only-marquee-effect/)
- Scrubbed scenes: no duration — scroll is the playhead ("scroll position is the playhead of a paused timeline," https://tympanus.net/codrops/2026/07/30/building-an-infinite-gsap-scroll-gallery-with-parallax-and-flip-transitions/)

**Easings:** one pair site-wide — `power2.out` (GSAP) / `[0.22, 1, 0.36, 1]` (Framer Motion) for reveals; `expo.out` reserved for the hero relay settle. Optional signature: `steppedEase` on one jar rotation moment for Bucks Sauce's handmade stop-motion feel.

**What moves:** transform, opacity, clip-path only. The jar (rotation), line-masked Fraunces headlines, clip-path image reveals, the marquee, gold highlight sweeps on key phrases (https://tympanus.net/codrops/2024/04/17/some-on-scroll-text-highlight-animations/), ember particles.

**What NEVER moves:** layout properties (top/left/width/height), body text, the phone-quality kitchen photos (motion magnifies their resolution limits — static archive artifacts only), filters per frame, feTurbulence parameters (per-frame turbulence recalculation tanks scroll — https://css-tricks.com/grainy-gradients/), and anything under `prefers-reduced-motion: reduce`, gated globally via one `gsap.matchMedia` registration + `<MotionConfig reducedMotion="user">`.

## 4. Typography

Fraunces is licensed OFL-1.1 (https://github.com/undercasetype/Fraunces) and descends from Windsor/Cooper — early-1900s storefront faces, literally the era of the recipe (https://www.beautifulwebtype.com/fraunces/). The official specimen (https://fraunces.undercase.xyz/) is accidental proof-of-concept: Fraunces Black on pure black with gold accents is the brand palette.

**Four voices, tokens not one-offs:**
| Token | Settings | Use |
|---|---|---|
| `si-display` | Fraunces, `'opsz' 144, 'SOFT' 40, 'WONK' 1`, wght 600, lh 0.92, ls −0.02em | Hero + section statements only |
| `si-quote` | Fraunces, `'opsz' 72, 'SOFT' 60, 'WONK' 0`, wght 480 | Pull-quotes, label history panels |
| `si-body-serif` | Fraunces, `'opsz' 9`, wght 400, ≥16px | Long-form story text only |
| `si-ui` | Inter Tight; caption voice = uppercase, +0.08em tracking, 11–13px | All UI, nav, forms, kickers, captions |

**Fluid scale (Utopia model, rem-mixed for WCAG 1.4.4 zoom, https://utopia.fyi/type/calculator/):** `display-xl: clamp(3.25rem, 1.5rem + 11vw, 12rem)` · `display-lg: clamp(2.5rem, 1.25rem + 6vw, 7rem)` · `display-md: clamp(2rem, 1.1rem + 3.5vw, 4.5rem)`. Wire as Tailwind fontSize tokens. `text-wrap: balance` on all display elements.

**Rules:** never positive letter-spacing at display sizes (opsz 144 is pre-tightened); WONK on 1–2 hero words max, never at body size; gold #FCC000 never as body text on cream (fails AA — marks, rules, and large display on dark only); section pattern = Inter Tight small-caps kicker ("ST. VINCENT, EARLY 1900s") above a large Fraunces line (Brightland pattern, https://brightland.co); hollow type signature = solid cream primary line + one `-webkit-text-stroke: 1.5px #FCC000` secondary line over the film, with `@supports` solid-gold fallback (~96.7% support, https://caniuse.com/text-stroke). Self-host subset variable woff2 via next/font; audit the currently-shipped axes (~488 KB total, 164 KB preloaded, measured in build) — instance fixed SOFT/WONK values to get preload toward ~100 KB.

## 5. Photography direction — "One Lens"

The library is mixed (CG film frames, 10 phone-quality kitchen photos, 2 AI spreads, GLB renders). The unifying strategy has three layers, all from the Diaspora Co. documentation model (https://www.diasporaco.com) and the Matcha Cartel archive conceit minus its gating (https://www.awwwards.com/sites/matcha-cartel):

1. **Universal grade + grain (`.si-media` wrapper):** `filter: contrast(1.06) saturate(0.82) sepia(0.16) brightness(1.02)`, an ember/maroon soft-light gradient wash, and one static 8%-opacity feTurbulence grain overlay (`baseFrequency 0.65, numOctaves 3` as data-URI, https://css-tricks.com/grainy-gradients/) with `isolation: isolate`. Every asset class reads as one film stock. Separable blend modes only (multiply/soft-light/overlay) — Safari's partial mix-blend-mode support concerns non-separable modes (https://caniuse.com/mix-blend-mode).
2. **Two named duotones** (feColorMatrix grayscale → feComponentTransfer, `color-interpolation-filters="sRGB"`, https://tympanus.net/codrops/2019/02/05/svg-filter-effects-duotone-images-with-fecomponenttransfer/): **Archive** (maroon #780024 → cream #FAF6EF; tableValues R "0.4706 0.9804", G "0 0.9647", B "0.1412 0.9373") for kitchen photos; **Ember** (ink → gold; R "0.0431 0.9882", G "0.0510 0.7529", B "0.0510 0") for background texture.
3. **Archive-plate framing:** kitchen photos as family-record artifacts — cream mat, 44px caption zone, ±1.2° rotation, real `<figcaption>` in Inter Tight caps with honest specifics ("BATCH DAY — LICENSED COMMERCIAL KITCHEN, 2025"). Documentary framing converts phone quality into proof of authenticity (EMP kitchen-ops logic).

**Hard rules:** phone photos never render above 600px CSS width — small-photo-large-type modules only, 3–4 per page; AI spreads live exclusively inside recipe contexts and always carry "SERVING SUGGESTION" in the caption system, making the truth-policy disclosure part of the design language.

## 6. Spacing system & grid

**Magazine spreads, not a feed.** The consistent award structure is 5–7 named full-viewport chapters with hard art-directed breaks (Hungry Tiger's titled micro-chapters; SAKAZUKI's Philosophy→Craft→Founder order; Imperiale Bolgheri's few big spreads). A small brand fills five strong spreads credibly; fifteen feed sections would expose thin content instantly.

- **Homepage = five spreads:** ARRIVAL (ink) → ORIGIN (cream) → CRAFT (cream) → TABLE (cream) → TRADE (ink). Each is a landmark `<section>` with a real h2, a Fraunces folio number and running head (aria-hidden), one idea per spread.
- **Grid:** 12-column fluid grid, content max-width ~1440px for text spreads, full-bleed for media spreads; the small-photo-large-type module places display type across 7–8 columns with the photo plate offset on 3, separated by a hairline gold rule.
- **Space scale:** fluid clamp() steps mirroring the type scale (Utopia's paired space calculator model) — section padding `clamp(4rem, 10vh, 9rem)`, generous by default; whitespace is the Aesop restraint signal and it is free.
- **Section dividers:** the wreath ornament as inline SVG (24px, gold) — brand texture in the Fly By Jing zigzag role.

## 7. Color & lighting

**Two-color chassis with scarce hot accents.** Every measured winner runs one warm-dark + one warm-cream (Bucks #100B06/#F5E4C7; Imperiale #000/#e6ddaa; SAKAZUKI #C30D23/#E1D6CE). Sunny Island already owns the strongest version:

- **Ink #0B0D0D** — the "night/product" world: arrival, film, jar, trade/inquiry spreads.
- **Cream #FAF6EF** — the "day/kitchen" world: story, kitchen, recipes.
- **Gold #FCC000, ember #F05400, maroon #780024** — accents, ingredient chapter fields, the loader mark, duotone endpoints. **Rule: no spread ever shows more than dark + cream + one accent.** Zero palette additions, ever (Aesop's ~5-color discipline).

**Glass & depth policy:**
- **Allowed:** the jar's glass rendered cheaply in R3F — custom `<Environment>` with 2–3 drei Lightformers (warm gold rect key high-right, cool narrow strip left, dim ring behind for halo separation; "like a real light without the expense," http://drei.docs.pmnd.rs/staging/lightformer) plus a ~15-line Fresnel rim tint in gold on the glass mesh. Static env → `frames={1}`, near-zero runtime cost. Also allowed: dimming gradient overlays on video for text contrast.
- **Banned:** `MeshTransmissionMaterial` and any real refraction/transmission pass — it forces an extra scene render per transmissive object (https://drei.docs.pmnd.rs/shaders/mesh-transmission-material) to refract a pure-black background behind opaque sauce; Maxime Heckel's dispersion pipeline (https://blog.maximeheckel.com/posts/refraction-dispersion-and-other-shader-light-effects/) documents exactly why. Also banned: glassmorphism/backdrop-blur UI chrome — SaaS grammar, not this brand.
- Re-capture all static jar fallback images from the upgraded lighting rig so 2D and 3D match.

## 8. Page transitions

**Adjudication.** The research splits three ways: Codrops track suggests View Transitions as progressive enhancement now; the motion-architecture track proves `experimental.viewTransition` requires Next ≥15.2 (project is on 15.1.6) and Vercel explicitly says not production-recommended (https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition); Larose's own guide concedes App Router has no official exit-animation support (https://blog.olivierlarose.com/articles/nextjs-page-transition-guide). **Verdict: enter-only transitions via `app/template.tsx` now.**

- 300–500ms enter: an ink curtain wipe using the **signature clip shape** derived from the flame/palm badge (Codrops clip-path layer animations, https://tympanus.net/codrops/2023/10/31/image-layer-animations-with-clip-path/) — the same shape used for image reveals and the ink↔cream section handoff (BALANS Kitchen's sticky + expanding clip-path, https://www.awwwards.com/sites/balanskitchen). One shape everywhere = art direction; five shapes = template demo.
- Layout chrome (nav + persistent R3F canvas) lives in `layout.tsx` so the jar never re-initializes across routes.
- Explicitly rejected: the FrozenRouter/LayoutRouterContext exit-animation hack (depends on Next internals); enabling the experimental flag; Barba-style DOM routers. Revisit `next-view-transitions` (https://github.com/shuding/next-view-transitions) or the official flag after upgrading Next — design enter animations so a native shared-element jar morph can replace them without IA changes.
- Reduced motion: instant swap with 150ms fade; focus moves to the new page's h1.

## 9. Micro-interactions & hover states

- **Card/photo hovers:** CSS double-image clip-path slice + 1.03 scale with an ember duotone top layer (https://tympanus.net/codrops/2023/03/01/double-image-hover-effects-with-clip-path-animations/) — 80% of the "crafted hover" feel at zero GPU cost; identical treatment on `:focus-visible`. No WebGL hover-distortion planes (they'd contend with the jar's GPU budget) and no SVG feTurbulence distortion (CPU-rasterized jank).
- **SKU/format grid:** hover/focus expands a tile toward the inquiry CTA with 100ms hover-intent debounce; clip coordinates computed from the grid gutter (https://tympanus.net/codrops/2025/05/27/animated-product-grid-preview-with-gsap-clip-path/). Touch: first tap expands, second activates.
- **Gold highlight sweep** on one key phrase per section ("Scotch Bonnet," "five generations") via background-size animation.
- **Magnetic pull** on the gold Inquire pill only (Larose Magnetic Button, https://blog.olivierlarose.com/), desktop `pointer: fine` only — one magnetic element per page.
- **Photo lightbox and format selector:** Framer Motion `layoutId` shared-element FLIP (adjudicated over GSAP Flip — FM is installed and lifecycle-aware; two systems on one element's transform is the canonical flicker bug, https://motion.dev/docs/gsap-vs-motion).
- **Voice-consistent microcopy** on every utility surface (labels, empty states, confirmations) in the Ghia model (https://drinkghia.com) — hospitality is copywriting, not chrome.

## 10. Scrolling behaviour

**Smooth-scroll verdict: NATIVE SCROLL. No Lenis, no ScrollSmoother, no Locomotive.** This is the audit's biggest adjudication — the motion-architecture track built a strong Lenis single-clock case (https://github.com/darkroomengineering/lenis), but four of six tracks (Codrops, 3D, performance, IA) reject wrapper libraries, and the performance evidence is decisive for THIS site: a smooth-scroll wrapper is a permanent per-frame main-thread loop competing with the inquiry forms that are our entire conversion surface (INP is a field metric Lighthouse won't surface; 2025 Web Almanac mobile median TBT is already 1,916ms — https://www.corewebvitals.io/pagespeed/improve-inp-ditch-javascript-scrolling). Even Lenis's maintainers attribute mobile frame drops in Lenis+GSAP+R3F stacks to the 3D scene (https://github.com/darkroomengineering/lenis/discussions/431) — our GPU budget belongs to the jar. The "expensive" damped feel is recovered without hijack: ScrollTrigger `scrub: 0.5–1` smooths scroll-linked values over frames, and useFrame lerp damps the jar's rotation.

**Pinning rules:**
- Maximum ONE GSAP pinned+scrubbed scene per page; everything else uses plain `position: sticky`.
- Pin distance ≤200vh on mobile; function-based start/end values; triggers created in scroll order; `ScrollTrigger.refresh()` after Fraunces and next/image load; no CSS `scroll-behavior: smooth` (all from https://gsap.com/resources/st-mistakes/).
- Ambient scroll effects (ember drift, label-art parallax, kitchen-column lag using the distance-from-center formula from https://tympanus.net/codrops/2025/06/03/elastic-grid-scroll-creating-lag-based-layout-animations-with-gsap-scrollsmoother/ — the formula, never the plugin) go to CSS scroll-driven animations behind `@supports (animation-timeline: scroll())` (Chrome/Edge 115+, Safari 26+, Firefox 156+, 83.66% global — verified) with IntersectionObserver fallback; 0%-states must be presentable.
- Reduced motion: pins killed, sections stack, scrubbed timelines set to end state. No infinite loops, no Observer-hijacked input on brand pages.

## 11. Cursor behaviour

**Verdict: no custom cursor, site-wide, final.** Current evidence is unambiguous: macOS scales CSS cursors with the user's pointer-size accessibility setting (oversized art becomes comic), Windows ignores scaling entirely, and JS canvas cursors with `cursor: none` break with the Fullscreen API (https://dbushell.com/2025/10/27/custom-cursor-accessibility/; Funka: "that's not creative, it's exclusion," https://stiftelsenfunka.org/about-us/columns/the-curse-of-the-custom-cursor/). The touch-majority audience never sees cursor effects anyway, and restraint is the premium signal. **The one allowance:** semantic system cursors `grab`/`grabbing` on the R3F jar viewer, gated behind `@media (any-hover: hover) and (pointer: fine)` — and the jar must also rotate via arrow keys, so the cursor is decoration on an already-accessible control. If pointer flourish is ever wanted, it is an in-canvas ember glow following the pointer — an effect in the scene, never a cursor replacement. Image-trail cursor effects: rejected outright (needs hundreds of images; we have 12; https://tympanus.net/codrops/2023/10/18/ideas-for-image-motion-trail-animations/).

## 12. Loading sequence — the first 800ms script

**Adjudication:** the Awwwards track recommends a brand-field loader (Bucks Sauce's concentric sauce-drop rings, CIAO's counter); the performance and IA tracks reject blocking loaders (total hero payload <500 KB needs no gate; blocking loaders lose up to ~1 in 4 visitors, directional per https://www.pravinkumar.co/blog/skeleton-screens-vs-page-loaders-webflow-design-2026). **Resolution: the SSR first paint IS the brand field — no JS-gated loader exists.**

- **0ms:** server-rendered ink #0B0D0D field, gold Fraunces wordmark, one-line promise ("Five generations. One jar.") — pure HTML/CSS, instant, and the honest version of the Bucks Sauce arrival.
- **~300ms:** preloaded poster (`<link rel="preload" as="image" fetchpriority="high">`, 32 KB) paints; film begins streaming at low priority (`preload="metadata"`). The poster or H1 is the LCP element; the poster→video swap never re-triggers LCP (https://www.debugbear.com/blog/optimize-video-lcp; https://web.dev/articles/lcp).
- **≤800ms:** optional 600–900ms clip-shape radial reveal from wordmark to hero (Framer Motion), always interruptible by scroll.
- Never: percentage counters, spinners, sessionStorage-gated intros, skeleton shimmer. If a heavy 3D "experience" page is ever added later, its intro mark must be contentful (real img, opacity ≥0.01, not full-viewport) so the removed-element LCP rule works honestly (Chrome M88 changelog, https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/speed/metrics_changelog/2020_11_lcp_2.md).

## 13. Video usage

We have a CG product film, not food footage — and that is an advantage: it out-luxuries TRUFF's static hero and requires no styling budget.

- **Role:** arrival moment only. Full-bleed, muted, playsinline, autoplay (muted autoplay is always allowed — https://developer.chrome.com/blog/autoplay), poster-first, subtle dimming gradient for text contrast (Graza recipe), looping OR playing once into the Relay handoff (Concept A).
- **Never scroll-scrub `video.currentTime`** — decode-bound, "quite miserable" on mobile, no frame updates mid-scroll (empirical: https://www.ghosh.dev/posts/playing-with-video-scrubbing-animations-on-the-web/). The GLB is what gets scrubbed.
- **Never extract the film to a frame sequence at launch** — OPTIKKA needed 1,182 WebP frames for what our 1.07 MB GLB does free (https://tympanus.net/codrops/2025/10/16/creating-smooth-scroll-synchronized-animation-for-optikka-from-html5-video-to-frame-sequences/). If a pinned film chapter is ever demanded: 60–90 pre-rendered WebP frames ≤960px, ≤2 MB, canvas-drawn, lazy-loaded one viewport early, skipped on Save-Data — WebP over AVIF for decode speed.
- **Secondary uses:** film stills (graded via `.si-media`) as spread backgrounds and og-images; a masked mid-page reveal of the film inside the signature clip shape (Matcha Cartel's scroll-revealed pour, structure only).
- **Never:** `<link rel=preload as=video>` (unsupported in Chrome, steals poster bandwidth); autoplay audio; video as an unskippable gate. `aria-hidden` decorative; reduced-motion gets the poster with a play control.

## 14. Product showcase — GLB moments, ranked by impact-per-kilobyte

1. **The Relay** (hero, Concept A): film → pose-matched crossfade → live drag. ~0 new KB. The single moment that justifies WebGL on the whole site.
2. **Scroll label tour** (`/sauce`): ScrollTrigger `scrub: 1` pins the jar ~2 viewport-heights while it rotates front label → history panel → wellness panel, real label artwork as adjacent DOM copy (Codrops cinematic 3D scroll, https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/). Ship the flat label-panel column FIRST (it is genuinely good real artwork), layer the scrub as enhancement. ~40 KB gz (gsap+ScrollTrigger), product route only.
3. **Ember motes:** one Points buffer, 200–400 sprites, AdditiveBlending, ember→gold gradient, brightness keyed to rotation velocity — the connective tissue to the film's world. <5 KB, one draw call, pauses to 0 RAF when idle/off-screen.
4. **Drag-to-inspect polish:** keep the existing settle-then-stop viewer (`ProductViewer.client.tsx` already correct); upgrade lighting to Environment + Lightformers + Fresnel rim (§7).
5. **Format lineup:** the same GLB at four scales on cream ("8 oz The Table Jar / 16–32–64 oz for the kitchen"), rendered via one canvas with drei `<View frames={1}>` (https://drei.docs.pmnd.rs/portals/view) or pre-rendered stills — tone-on-tone staging replaces photography (Fly By Jing red-on-red logic, https://flybyjing.com).
6. **Cut first:** sauce-mass wobble shader (https://www.montek.dev/post/real-time-fluid-shaders-in-react-three-fiber-a-deep-dive-into-chai-cup-liquid) — opaque mash barely benefits; only if the sauce is already a separate mesh.

**Iron rules:** one WebGL context per page, ever; canvas consumes scroll, never owns it (no drei ScrollControls — it fabricates its own scroll container and fights ScrollTrigger, https://drei.docs.pmnd.rs/controls/scroll-controls); `frameloop="demand"` + `invalidate()` discipline; DPR capped 1.5–2; the retired 536 KB `/explore/products` route is the in-repo cautionary tale.

## 15. Recipe presentation

The Hungry Tiger model (Awwwards-credited recipe interactions): cards with structured metadata — prep/cook time, servings, ingredient count — opening into step-by-step detail. Framed in Jacobsen's working-kitchen voice: "What We're Making" (https://jacobsensalt.com). Titles name the dish, not the product (Fly By Jing's "Dumpling Lasagna" discipline).

- Cards are typographic + label-art; the 2 AI overhead spreads appear ONLY here, small, always captioned "SERVING SUGGESTION" in the caption system.
- Detail opens as a Framer Motion modal (role=dialog, inert background, Esc, focus return) AND exists at a real `/recipes/[slug]` URL — the modal is enhancement, not the only path.
- Food-fact cards fill depth truthfully with zero photography ("Scotch Bonnets measure 100,000–350,000 Scoville" — Agency Eats facts pattern).
- Every recipe ends with the trade hook: "Serving this in your restaurant? Ask about food-service sizes → /inquire?intent=wholesale."

## 16. Story/about treatment

**First person. The sauce (or the family, collectively) narrates — no invented individuals.** La Revoltosa's SOTD concept is the drink speaking its own 70 years ("Seventy years in the same glasses, at the same bars"); ours: "I was born in St. Vincent in the early 1900s. Trinidad taught me fire. Five generations carried me here." Content-truth safe by construction.

- **Philosophy before product** (SAKAZUKI chapter order): the family story is the luxury; the jar is its proof.
- **Structure:** a dated, place-named timeline — early-1900s St. Vincent → refined in Trinidad & Tobago → five generations → US debut — as era-labeled Fraunces history cards whose chapter marks are the existing label artifacts (flame/palm badge, wreath, history panel text). Specificity is the authenticity mechanism (Fly By Jing's named Chengdu; Burlap & Barrel's named farmers, https://www.burlapandbarrel.com/pages/wholesale); Mama Maisa's proves the identical story asserted via badges reads cheap.
- One pinned scene maximum: sticky jar left, timeline scrolling right, dates in line-masked Fraunces. Reduced motion: plain ordered list.
- `/kitchen` is the trust layer: the 10 photos as the archive contact sheet (§5) under "Bottled by hand in our licensed commercial kitchen" — operational fact stated plainly (SingleThread's ethos-copy mechanism, https://www.singlethreadfarms.com).

## 17. Wholesale & retail experience

**The Diaspora Co. + Fishwife concierge model** (https://www.diasporaco.com/pages/wholesale; https://eatfishwife.com/pages/wholesale), in a luxury register — this is the PRIMARY conversion, not a footer link:

- `/partners` ("For Chefs & Retailers"): three warm sentences addressing restaurants, grocers, and specialty shops together (Burlap & Barrel's brevity — at this tier, three sentences + form beats a B2B microsite) → formats table (8 oz consumer; 16/32/64 oz food service) → process strip ("Write → Taste → Stock") → inline inquiry form.
- **The Fishwife conversion mechanics:** minimal fields, a NAMED artifact ("our pricing & formats sheet"), a stated reply window ("within 2 business days"), and a pre-populated mailto fallback. The promise is the trust signal — no fabricated logos needed.
- Plain-text greeting email beside every form (hello@sunnyislandpepper.com — Brightland's goodday@ pattern) — signals a human answers.
- **Pre-stockist honesty:** no store locator until stockists exist. Instead, demand capture — "Want Sunny Island at your local shop? Introduce us." (zip + store name; WeStock pattern, https://www.westock.io) — which becomes retailer-pitch ammunition and graduates into a true locator without IA change.
- No Faire dependency at launch (it forfeits the direct hospitality conversation); no "B2B solutions" language, no gated line sheets, no portals. Reserve a layout slot for a future REAL stockist logo bar (Omsom pattern, https://omsom.com) so honesty now doesn't require redesign later.

## 18. Contact/inquiry experience

- **One hub: `/inquire`** with an intent switcher — Wholesale pricing / Retail partnership / Direct order / Something else — as a radiogroup (not tabs), adjusting 3–5 fields per intent. Field set from Diaspora's suggested template: business name, location, sizes of interest, approximate volume, timeline, notes.
- Context pre-selects intent: `/sauce` bulk formats pass `?intent=wholesale`; recipes pass wholesale; the "Order direct" door passes `direct`. Maximum one click to the form from anywhere via the persistent gold pill.
- **Forms:** Zod validation (installed) on blur/submit — never per keystroke (INP); visible labels, never placeholder-as-label; `aria-describedby` errors via aria-live; server action submission. Note: react-hook-form is the house standard but is NOT currently installed — add it (see §26).
- Confirmation states the exact next step: "Our pricing & formats sheet (8 oz, 16/32/64 oz) arrives within 2 business days." Treat inquiry like a tasting-room appointment, not a ticket system — voice-consistent microcopy throughout (Ghia).

## 19. Three.js opportunities — and explicit rejections

**Build:** the Relay handoff; scroll label tour; ember Points buffer; Lightformer studio rig + Fresnel rim; drei `<View>` if the jar appears in multiple sections (one context, scissored); fake heat-haze via `onBeforeCompile` + scrolling noise texture if atmosphere is wanted (The Sleepers technique, https://tympanus.net/codrops/2026/07/10/the-sleepers-creating-an-atmospheric-webgl-experience-with-lightweight-techniques/) instead of postprocessing bloom.

**Reject, by name:**
- `MeshTransmissionMaterial` / real refraction (extra scene pass to refract a black void)
- drei `ScrollControls` (second scroll owner)
- A second WebGL context anywhere (hover-distortion planes, shader galleries — the jar drops frames and the brand's best asset suffers)
- GPGPU/thousand-particle systems for embers (garnish gets one Points buffer)
- Permanent-RAF turntables (the retired `/explore/products` failure)
- Frame-sequence scroll film at launch
- 3D lifestyle fabrication — rendered kitchens, CG food styling, 3D hands (content-truth violation)
- WebGL on content pages: recipes, kitchen, partners, inquire get ZERO canvas. The jar owns exactly two surfaces (hero relay, product tour) or it dilutes both.
- Audit-and-likely-remove: `@react-three/cannon` (physics on a product jar) and `@react-three/postprocessing` (replaceable per The Sleepers).

## 20. Accessibility commitments

- One global motion gate: `gsap.matchMedia('(prefers-reduced-motion: reduce)')` for all GSAP + `<MotionConfig reducedMotion="user">` for all Framer Motion (~94.7% support for the query, https://caniuse.com/prefers-reduced-motion). Every animation in this document has a defined reduced state: pins unpin, scrubs jump to end state, marquee freezes to a static ingredient line, film shows poster, embers freeze, jar holds the settle angle.
- Overlays/modals: `inert` background, `role=dialog` + `aria-modal`, Esc-close, focus return — Bucks Sauce shipped SOTD with 6.2/10 accessibility; that is the genre's documented weak spot and our differentiator.
- Real HTML text always — no canvas headlines; SplitText 3.13's built-in aria handling; split after `document.fonts.ready`; content never stranded at opacity 0 if JS fails.
- Canvas `aria-hidden`/`role=img` with alt; all product facts duplicated in DOM text; jar rotation keyboard-operable.
- Contrast pairs pre-verified: cream/ink and ink/cream pass AA; gold on ink for large text only; gold never body text on cream; focus rings gold-on-ink at ≥3:1 non-text contrast.
- rem-mixed clamp() type (200% zoom works); skip-link past any pinned sequence; `aria-current="page"` in nav; marquee clones `aria-hidden`; `data-lenis-prevent` irrelevant (no Lenis) — native scroll preserves keyboard paging and find-in-page by default.
- CSS-first tier ships before GSAP scenes: the site fully legible and navigable with JS disabled, protecting the inquiry path.

## 21. Performance budgets & techniques

**Hard budgets (from the performance track, enforced in CI with @next/bundle-analyzer):**
- Hero media: poster ≤40 KB (current 32 ✓), video ≤500 KB/variant (current 360–464 ✓), no other >50 KB image above the fold, zero third-party requests before LCP. Lab LCP ≤1.8s on Moto-G throttling → field p75 ≤2.5s.
- JS first-load gz: marketing/inquiry routes ≤170 KB; home ≤200 KB before the 3D chunk; three/R3F/drei jar chunk ≤250 KB, `next/dynamic ssr:false`, mounted via IntersectionObserver post-LCP with a real jar `<img>` fallback (three alone is ~155 KB gz, https://github.com/pmndrs/react-three-fiber/discussions/812); GSAP ≤40 KB confined to routes using it; GSAP and Framer Motion never animate the same element and never both drive one route's scroll.
- Fonts: ≤160 KB woff2/page, ≤2 preloaded files, latin subset; next/font metric overrides for zero CLS; kill the current ~488 KB/164 KB-preloaded footprint by instancing fixed axes; ban raw OTF @font-face.
- Deferred 3D/scrub assets: GLB recompressed with gltfpack/meshopt toward ≤700 KB; any future frame sequence ≤2 MB; skip on Save-Data + reduced-motion.

**Techniques:** poster preload with `fetchpriority=high` (Google Flights gained ~700ms, https://addyosmani.com/blog/fetch-priority/); opacity floor 0.01 on all above-fold reveals; transform/opacity-only scrubs; ≤2 concurrent animated clip-paths; will-change scoped to active animations only; validate preloads on throttled traces, NOT the Lighthouse score (lantern punishes good preloading — https://github.com/GoogleChrome/lighthouse/issues/16539); measure with 5-run median production builds, then trust Vercel Speed Insights/CrUX field p75 as ground truth; test at 4x CPU throttle before merging any motion PR; remove `react-grid-layout`/`react-window` if unreferenced post-parallax-removal.

## 22. SEO implications

- Every headline is server-rendered HTML (never canvas/SVG-only text) — the editorial type system doubles as the crawlable content layer.
- The `ssr:false` canvas means the jar must also exist as a real `<img alt>` — this is simultaneously the LCP fallback, the no-JS render, and the image-search asset.
- Recipes at real URLs (`/recipes/[slug]`) with Recipe structured data (prep/cook/servings metadata is already in the card design); modals are enhancement so crawlers get full pages.
- The heritage timeline as a semantic ordered list = rich, dated, place-named content for "Caribbean pepper sauce," "Scotch Bonnet hot sauce," "St. Vincent" queries — a genuine gap, since the Caribbean heritage category has no premium web flagship (Marie Sharp's blocked/423, Matouk's domain parked — verified in research).
- Keep retired `/shop` and account routes out of sitemap/robots; canonical URLs on all spreads; graded film stills as og-images pre-baked (CSS filters don't apply to og scraping).
- Semantic landmarks per spread (`<section>` + real h2) give both a11y and document outline; footer heritage sign-off is crawlable brand text on every page.

## 23. Storytelling arc

- **`/` (Home):** "A five-generation Caribbean recipe has arrived in the US — watch it, touch it, then invite it in."
- **`/sauce`:** "Seven real ingredients and one jar, presented like a vintage, not a SKU."
- **`/story`:** "I was born in St. Vincent in the early 1900s; Trinidad taught me fire; five generations carried me here."
- **`/kitchen`:** "This is the actual room, the actual hands, the actual license — nothing staged."
- **`/recipes`:** "Here is what we're making — the jar earns its place at your table."
- **`/partners`:** "Bringing the island to your shelves is a relationship, and it starts with one short note."
- **`/inquire`:** "A person reads this, and you'll have our pricing sheet within two business days."
- **Footer, every page:** "St. Vincent → Trinidad & Tobago → your table."

## 24. Verified fact-checks

- **GSAP licensing:** 100% free for all users including all formerly-paid Club plugins (ScrollTrigger, SplitText, MorphSVG, DrawSVG, ScrollSmoother, Inertia) since April 30, 2025, under the GSAP Standard License following Webflow's acquisition — re-verified live this session at https://gsap.com/pricing/ ("GSAP is now 100% free for all users, thanks to Webflow's support"); corroborated at https://gsap.com/community/standard-license/, https://webflow.com/blog/gsap-becomes-free, https://gsap.com/blog/3-13/. Only restrictions: no Webflow-competing animation builders, no reverse engineering. npm confirms gsap@3.15.0 ships the "no charge" license.
- **Lenis status:** current package is `lenis` (@studio-freight/* deprecated), MIT, actively maintained (v1.3.25, 2026-06), React-19-compatible via `lenis/react` — https://github.com/darkroomengineering/lenis. Verified healthy; rejected here on INP grounds, not maintenance grounds (§10).
- **View Transitions:** Next's `experimental.viewTransition` exists from 15.2 (https://nextjs.org/blog/next-15-2) but docs explicitly say "not recommended for production" (https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition); this project is on 15.1.6, below the floor; React's `<ViewTransition>` remains experimental in React 19.x. Browser View Transitions API: ~88.5% (Chrome/Edge 111+, Safari 18+, Firefox 144+, https://caniuse.com/view-transitions) — future progressive enhancement only.
- **CSS scroll-driven animations:** re-verified live this session at https://caniuse.com/mdn-css_properties_animation-timeline_scroll — 83.66% global; Chrome/Edge 115+, Safari 26+, Firefox 156+. Usable only behind `@supports` with presentable static fallbacks.
- **Video LCP rules:** poster paint or first frame, whichever earlier; swap never re-triggers LCP; Chrome cannot preload video files (https://web.dev/articles/lcp; https://www.debugbear.com/blog/optimize-video-lcp). Full-viewport elements and opacity:0 elements are excluded from LCP candidacy (heuristics, not guarantees).
- **Video scrubbing:** `currentTime` scrubbing empirically fails on mobile; pre-rendered frames 3–4.5x faster than client extraction (https://www.ghosh.dev/posts/playing-with-video-scrubbing-animations-on-the-web/).
- **Fraunces:** OFL-1.1, axes wght 100–900 / opsz 9–144 / SOFT 0–100 / WONK 0–1 (https://github.com/undercasetype/Fraunces).
- **Disclosed fetch limitations from the research (do not cite these visually beyond what was captured):** balanskitchen.pl 403; buckssauce.com 429 (loader screenshotted, interactions from the Awwwards catalogue); Atomix rendered nav labels only; aesop.com 403 (findings via https://work.co/clients/aesop/); geyer.dev 403 (spritesheet figures unverified first-hand); Heatonist wholesale 404.

## 25. The anti-pattern blacklist

**Commerce chrome:** carts, "Shop"/"Buy Now," price grids, bundles, account icons, announcement bars, discount popups, free-shipping bars, fake urgency (countdowns, "low stock"), checkout theatre of any kind. **Fabricated proof:** testimonials, star ratings, review counts, "as seen in" logos without real coverage, stockist maps before stockists, invented locations, AI/stock people, implied operations — content-truth policy outranks every trend, and notably NONE of the award winners studied lean on social proof. **The Mama Maisa's kit:** clip-art starbursts, emoji bullets, rainbow gradients, glossy red buttons, borrowed-logo slapping, heritage asserted via badges instead of narrated in sequence. **Motion sins:** site-wide scroll hijacking (Lenis/ScrollSmoother/Observer loops on brand pages), scrubbing video currentTime, frame-sequence film extraction at launch, blocking preloaders (>1s, or any JS gate), replaying intros per route, autoplay audio, image-trail cursors, custom cursors, per-character SplitText on body copy, animated feTurbulence, scroll-linked filter/layout animation, unpausable fast marquees, effect buffets (3+ signature mechanics per page), motion without a reduced-motion twin, pinned scenes >200vh mobile. **3D sins:** second WebGL context, MeshTransmissionMaterial, drei ScrollControls, permanent RAF, GPGPU embers, 3D on content pages, CG lifestyle fabrication. **Craft sins:** phone photos above 600px or full-bleed, AI spreads uncaptioned or hero-scale, ken-burns/parallax on phone photos, gold body text on cream, pure-vw type, positive tracking on display Fraunces, timid mid-size sans headings, canvas-rendered headlines, non-separable blend modes, raw OTF @font-face, glassmorphism UI, skeleton-shimmer loading, corporate wholesale language ("B2B solutions," "request a quote," gated line sheets, portal-first Faire routing at launch), and the Shopify template rhythm (hero carousel → feature bullets → bundle grid → Instagram embed).

## 26. Asset gaps (to commission or produce)

1. **Bulk-format visuals (16/32/64 oz):** no imagery or 3D exists for the food-service sizes — commission renders (or photograph real bottles) or the formats table is type-only. Interim: same GLB at scale with honest "shown: 8 oz jar" captioning.
2. **Relay handoff data:** the film's final-frame camera pose must be manually matched to an R3F camera/rotation state — a half-day art task, not a commission, but it blocks Concept A.
3. **Simplified vector paths** of the wreath ornament and flame/palm badge (<200 points, clean SVG) for the signature clip shape, section dividers, morphs, and favicon — current label art may be raster or too complex; commission a vectorization pass.
4. **Static jar renders per color field** (ink, maroon, cream + the new Lightformer rig) for reduced-motion/no-WebGL fallbacks, og-images, and email — self-producible from the GLB once the lighting rig lands.
5. **Recompressed GLB** (gltfpack/meshopt, target ≤700 KB) and a check whether the sauce is a separate mesh (gates the optional wobble).
6. **The pricing & formats linesheet (PDF)** promised by the inquiry flow, plus the printable "introduce us to your grocer" one-pager (Goode Foods pattern) — both in the label-art system.
7. **hello@sunnyislandpepper.com** (greeting address) live and monitored, with the 2-business-day reply commitment operationalized.
8. **First-person heritage copy** written in the family's voice with verifiable dates/places (the design depends on specificity; placeholder copy will read as costume).
9. **Dependencies to add:** `gsap`, `@gsap/react`, `react-hook-form` (assumed by the form standard but not installed). **To audit/remove:** `@react-three/cannon`, `@react-three/postprocessing`, `react-grid-layout`, `react-window`.
10. **Future-slot assets (earned, not commissioned):** real press mentions and stockist logos for the reserved proof bar; professional people/founder photography if the family ever wants faces on the site — until then the design deliberately needs none.
11. **Accessibility statement content** for `/accessibility` (linked from every footer).

---

**Where the research disagreed, the rulings were:** native scroll over Lenis (four tracks vs two; INP + forms + one-GPU-owner logic wins); install GSAP scoped-per-route over the typography track's "skip it" (the pinned jar chapter and SplitText line reveals need it; the skip verdict was scoped to typography work only); no blocking loader over the Awwwards track's brand-field loader (the SSR ink-field first paint delivers the same arrival at zero visitor cost); enter-only template.tsx transitions over View Transitions now (Next version floor + Vercel's own production warning); GLB scroll-scrub over any film frame sequence (bandwidth math is not close); Framer Motion layoutId over GSAP Flip for shared elements (one system per element). Everything else across the eight tracks converged.