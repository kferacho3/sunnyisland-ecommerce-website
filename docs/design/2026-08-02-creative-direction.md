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

---

# Revision — 2026-08-09 · The island becomes the world

Owner-directed. Brief: "immersion but not gimmicky — extremely professional and
next level," with Truff's premium commerce polish as the reference, and an
explicit instruction to **re-baseline performance honestly** rather than defend
the old numbers.

## R1. This document had already drifted

Recorded so the next reader does not treat the sections above as current:

| §  | Says                            | Actually shipped                                            |
| -- | ------------------------------- | ----------------------------------------------------------- |
| §5 | Fraunces display voice          | **Archivo** (`--si-font-display`), per a later owner call    |
| §1 | ink → cream two-world palette   | **All-dark "forge"**; tokens.css: "no tan, no cream, anywhere" |
| §2 | "we're on Next 15.1.6"          | Next **15.5.22** — View Transitions are now available        |

## R2. Decisions overturned

§2 and §9 are amended. The research behind them stands; the conclusions were
drawn for a page whose 3D was one small pinned chapter.

| Rejected in §9                   | Now                                                                                                                                                                             |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "cursor-following image trails"  | **Adopted, narrowed.** `pointer-trail-emitter`, Canvas 2D, no WebGL. Scoped to the island stage only — never over the inquiry form, so the emitter's rAF is nowhere near form INP. |
| "second WebGL context, ever"     | **Upheld.** Still exactly one canvas. The world grew inside it.                                                                                                                 |
| "scroll hijack" · native scroll  | **Upheld.** No Lenis, no ScrollSmoother, no wheel capture.                                                                                                                      |

Added: `falling-leaves`, as instanced tumbling ash inside the existing context.
Driven by **scroll progress, not wall clock**, so §7's "0 RAF at idle" holds and
the field scrubs backwards exactly like everything else in the scene.

Skills installed from `github.com/MengTo/skills` (verified, MIT):
`build-threejs-scroll-worlds`, `falling-leaves`, `pointer-trail-emitter`.

## R3. Nine defects found and fixed

The island was not underperforming its design — large parts of it had never run.

1. **The dawn-lighting arc was dead code.** `keyRef`/`fillRef`/`hemiRef`/
   `ambientRef` were driven every frame while the JSX attached bare, unref'd
   lights, and no `hemisphereLight` existed at all. The key sat frozen at
   `#f05400` int 2.2 from `[-9,2.2,6]` — light from the camera's shoulder, not
   from the sun at `[-17,·,-24]`. This is why the island read as a flat muddy
   cone. **Single highest-impact fix on the site.**
2. **The starfield was mathematically invisible.** Stars on a shell of `r=62`
   against night fog of `near 17 / far 40` → fog factor saturated at 1.0, every
   star painting solid `#05070d` on a `#05070d` background. Never seen by anyone.
3. **Sun and clouds**, same defect — the sun ~56% crushed to fog at midday.
4. **`<Eruption>` shared a Suspense boundary with the jar GLB**, gating the
   chapter's earliest beat (p=0.03) behind its largest asset (1.07 MB, third
   origin, plus a Draco decoder from a fourth).
5. **Jar transmission ran a full extra scene pass every frame** from mount —
   `frustumCulled` passes on a zero-scale jar, so it never idled.
6. **`webglcontextlost` was bound to `window` in the bubble phase** for an event
   that does not bubble. The entire downgrade-to-static path was dead.
7. **222 of 246 draw calls were six palm trees** — 90% of draws for 7% of tris.
8. **The CPU capability gate was too tight.** 2M iterations in ≤10 ms, against a
   clean-machine time of 7–9 ms. It failed twice during this session's own
   measurements on a capable M4 and silently served the static island. Raised to
   18 ms, still well clear of the 27 ms throttled profile it exists to exclude.
9. **DPR 2 with MSAA** over a full-viewport canvas of flat-shaded geometry.

## R4. Re-baselined budgets (measured, 1440×900, SwiftShader, `next build && start`)

§8 is superseded for the home route by the table below. These are measurements,
not targets.

| Budget                      | Old §8 gate | Before | After |
| --------------------------- | ----------- | -----: | ----: |
| Route JS, `/`               | ≤ 200 KB    | 142 KB | **142 KB** |
| Draw calls / frame, no jar  | (unstated)  |    246 | **27** |
| Draw calls / frame, jar live| (unstated)  |   ~490 | **28** |
| Palms                       | —           |      6 | **14** |
| Ash flakes                  | —           |      0 | **90 (1 draw)** |
| Console errors              | 0           |      0 | **0** |

Honest caveats, stated rather than buried:

- **The "desktop Lighthouse ≥99" claim is an artifact** and must not be quoted.
  It only holds when headless Chrome has no WebGL at all; with a real rasteriser
  the island costs ~580 ms TBT. Any future Lighthouse gate must be run with
  WebGL genuinely enabled or it is measuring a page that does not exist.
- The deferred 3D chunk is **~210 KB gz** of three + R3F + loaders before any of
  our own code. That is the real ceiling against §8's ≤250 KB, so future world
  growth must be bought with geometry and authored data, never new libraries.
- Mobile still has **no world** (768 px gate). Unchanged this pass, and the
  largest remaining gap.

## R5. The chapter ledger

`src/components/spreads/island-ledger.ts` — five authored chapters replacing the
two-beat orbit, each with its own camera endpoint, FOV, mobile override and
daylight value. The pinned stage grew 2.6 → 4.2 viewport heights.

| # | id | beat | camera change |
| - | -- | ---- | ------------- |
| 1 | `open-water` | Born on an island | Establishing wide, low over water. The only frame where the island is small. |
| 2 | `the-crossing` | Carried five generations | Approach — the sun's path on the sea becomes the leading line. |
| 3 | `the-vent` | Scotch bonnet, straight from the fire | Reveal, the only shot looking UP: crater rim on the skyline. |
| 4 | `the-grove` | Green papaya, sun, and time | Passage — descends INTO the palms; first frame with foreground occlusion. |
| 5 | `the-landing` | It all ends up in the jar | Inspection, the only static hold. Pose preserved verbatim from the original. |

The ledger imports nothing from `three` on purpose: `IslandChapter` reads it in
the main bundle for captions and pin length, so a THREE type here would drag the
3D chunk out from behind its dynamic import. Captions are generated FROM the
ledger, so copy and composition cannot drift apart the way they did when the
`at`/`until` pairs lived in a second hardcoded array.

Three composition bugs found by looking at rendered keyframes, not by reasoning:

- **Stops discarded the last weight.** N chapters make N−1 spans; accumulating
  N−1 weights and overwriting the final entry with 1 stretched the closing span
  to 42% of the scroll. Spans are now weighted by the mean of the two chapters
  they join.
- **`day: 0` rendered a black rectangle.** The forge palette bottoms out at
  rgb(12,8,5), so a literal zero gave the establishing shot nothing to
  establish. Now 0.12 — still unambiguously night, but with a readable horizon.
- **Furled palm crowns read as floating debris.** Frond unfurl is keyed to
  daylight; from 25 units out the trunks are sub-pixel, so fourteen closed
  crowns hovered beside the volcano like dark blobs. The unfurl now floors at
  0.42 — dawn still visibly opens the canopy, but it starts from a palm.

## R6. Mobile gets the world — the compact tier

Owner direction, 2026-08-09: performant, mobile-first, accommodate every case.
The width gate moves 768 → 380 and phones now travel the same five chapters.

That gate was set when the scene cost 246 draw calls and ran a full extra
transmission pass per frame. At 27 draws the arithmetic that justified excluding
phones no longer holds. What actually costs on a phone is the GLB, fill rate and
scroll length — so those are tiered rather than answered by refusing to render.

| | desktop | compact (< 900 px or coarse pointer) |
| --- | --- | --- |
| camera | authored endpoints | ledger `mobile` overrides: pulled back, wider lens |
| DPR cap | 1.75 | **1.25** |
| MSAA | on | **off** |
| `powerPreference` | high-performance | default |
| ash flakes | 90 | **34** |
| pin length | 4.2 vh | **3 vh** |
| ember trail | yes | **not mounted at all** |

**The fallback ladder, in order.** Every one of these still selects the complete
static island before three, Draco, a canvas or a pin is mounted:
reduced motion → Save-Data → `deviceMemory < 4` → CPU probe → no `webgl2` →
width < 380 px. A cheap phone on a metered plan is still served the poster.

Verified at 1440 / 820 / 390 / 360, plus reduced-motion at 1440 and 390: 6
ScrollTriggers and 1 pin at every width that should have them, 0 console errors,
one `h1`, no missing `alt`, and no focusable node inside the pinned stage.

Preconnects to the S3 and gstatic origins are rendered ONLY in scene mode, so a
visitor on the static fallback never opens sockets it will not use.

### R6.1 The bug that made this possible to find

`withMotion` registered `gsap.matchMedia` with `{ reduce, wide: (min-width:
1024px) }`. gsap activates a context when at least one named query matches — and
on a phone with no reduced-motion preference **neither did**, so the build
callback never ran. Measured: `ScrollTrigger.getAll()` returned 6 at 1440 px and
**0** at 390 px.

Every scroll entrance on the site — `Lines`, `Settle`, `Formation`,
`SlicedHeading` — had therefore been silently dead below 1024 px, on every page,
since the motion system was written. The island pin simply made it visible,
because a missing pin is obvious in a way a missing fade is not. Fixed by adding
an exhaustive `narrow: (max-width: 1023.98px)` condition.

## R7. Still open

- The jar GLB is 94% texture (571 KB + 483 KB WebP) and needs a re-export to
  shrink; preconnect only removes the handshake latency, not the bytes. This is
  now the single largest mobile cost.
- The DOM spreads (Origin, Craft, Table) were not touched in this pass.
- No real-device testing. Everything above is Chromium + SwiftShader at emulated
  viewports, which models composition and correctness but not thermal throttling
  or true mobile GPU fill rate.
