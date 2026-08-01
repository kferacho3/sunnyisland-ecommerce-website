# Image Manifest

Per-file disposition of the 21 owner-supplied images (all AI-generated 2026-08-01), triaged individually
against the owner-approved policy in the design spec §4.3.

**Policy:** use abstract/decorative graphics and product-beauty renders with no people; use food-only
compositions with no faces, captioned "Serving suggestion"; skip anything depicting people, staff,
customers, crowds, a market stall, a food truck, a staffed kitchen, or a fulfilment operation.

Approved files are staged, optimised, in `public/brand/concept/`.

---

## Approved — 12 of 21

| Staged file | Src | Slot | Notes |
|---|---|---|---|
| `hero-ground-banner.webp` | f09 | landing hero ground | 2000×667. Badge left, empty black centre — headline and CTA sit in the dead space. `alt=""`, `aria-hidden`. |
| `badge-emblem.webp` | f03 | landing hero, centred mark | Badge in a flame vortex. Real alt text. |
| `divider-jars-sunset.webp` | f01 | landing section divider | ⚠️ **Crop before use** — see §Label defects. |
| `divider-flourish.webp` | f04 | landing section divider | Flourish right, empty left two-thirds for a headline. `alt=""`. |
| `texture-tile.webp` | f02 | divider bands, footer strip | Tileable. Use as a CSS `background-image` at low opacity, not an `<img>`. |
| `sauce-product-hero.webp` | f06 | `/sauce` product hero | ⚠️ **Crop before use** — see §Label defects. |
| `ways-to-use-1.webp` | f15 | `/sauce#ways-to-use` tile 1 | ⚠️ Visible "Serving suggestion" caption mandatory. Hands only, no faces. |
| `ways-to-use-2.webp` | f21 | `/sauce#ways-to-use` tile 2 | ⚠️ Visible "Serving suggestion" caption mandatory. Hands only, no faces. |
| `story-ground.webp` | f07 | `/story` ground | ⚠️ **Illustrated volcano fantasy.** Must never be captioned or alt-texted as a real place, farm, or sourcing location. Decorative ground only, behind a dark overlay. |
| `partners-header-band.webp` | f05 | `/partners` header band | Empty right region for headline + CTA. `alt=""`. |
| `partners-panel-ground.webp` | f10 | `/partners` body panel ground | Near-black, debossed badge. Pairs with the header band without competing. |
| `brand-mark-{256,512,1024}.webp` | f08 | header, footer, favicon, `/partners` trust mark | Supplied on flat white; white keyed to alpha and squared here so it works on the dark ground. |

## Rejected — 9 of 21

| Src | Depicts | Reason |
|---|---|---|
| f11 | Six people, faces visible, family kitchen, five jars | Fabricated customer base with identifiable faces |
| f12 | 9+ people at a barbecue, ~8 jars, "8.4 FL OZ" label | Fabricated crowd and brand event; invented SKU size |
| f13 | Four uniformed cooks in a branded kitchen under a lit sign | Asserts a kitchen team and foodservice operation that does not exist |
| f14 | Staffed market booth, sampling, customer crowd | Fabricated venue, staff, crowd, and provenance copy ("MADE LOCAL", "ALOHA") |
| f16 | Four workers packing and labelling jars, printed cartons | **Most damaging to a distributor** — implies co-packing capacity, headcount, fulfilment infrastructure |
| f17 | Five people at a brunch table, six jars | Identifiable faces staged as documented customers |
| f18 | Branded food truck, uniformed staff, queue, chalkboard menu | Fabricated venue, staff, crowd, menu, and a second product line |
| f19 | 6+ people at a candlelit dinner, composited wall logo | Staged testimonial; composited badge makes it read as a brand event photo |
| f20 | Six people including a child, domestic kitchen | Multigenerational endorsement; a minor's likeness adds separate exposure. Do not attempt a crop. |

---

## Label defects in approved files

Real facts: black label, circular flame/palm badge, "SUNNY ISLAND / PEPPER SAUCE".
Real sizes: **8 oz (primary consumer SKU)**, plus 2 / 16 / 32 / 64 oz.

> **Corrected 2026-08-01.** An earlier revision of this file flagged "8 FL OZ (250g)" as an invented size
> and as a unit error. Both were wrong. 8 FL OZ (250 g) is the **primary consumer bottle**, and a dual
> volume-plus-net-weight declaration is standard. The crop requirements on f06, f15, and f21 are lifted.

**`sauce-product-hero.webp` (f06)** — ✅ **cleared for use as-is.**
- Small jars read "8 FL OZ (250g)" — the real primary consumer SKU.
- Large jar reads "64 FL OZ (1893ml)" — also real.
- Remaining caveat: it shows three jars across two sizes, so it reads as a two-size line. Fine as a
  product hero; do not caption it as "the full range".
- Label art is an AI approximation of the real black circular-badge label, not production artwork.

**`ways-to-use-1.webp` / `ways-to-use-2.webp` (f15, f21)** — ✅ **cleared for use.**
- The legible jar reads ~"8 FL OZ (250g)" — the real consumer SKU.
- f21's badge carries garbled sub-lettering and a fabricated barcode, so **hold the scale so fine label
  detail does not resolve**, or crop the barcode out.
- "Serving suggestion" caption still mandatory (food styling, not a product claim).

**`divider-jars-sunset.webp` (f01)** — ⚠️ **still needs cropping.**
- Front three jars read **"6 FL OZ (250g)"**. 6 oz is not a listed SKU, and 6 fl oz ≈ 186 g, so pairing it
  with 250 g is internally inconsistent regardless.
- Back jars read "64 FL OZ (1893ml)" — correct.
- **Action:** crop or scale so no net-contents text is legible. Never place adjacent to sizing, case-pack,
  or spec content.

**Cross-cutting — every decorative file (f02, f03, f04, f05, f07, f09, f10)**
- None assert a SKU, so none is a label risk. But **all of them render long cayenne-type peppers rather
  than Scotch Bonnets.** For a Scotch-bonnet-led product this is a brand-accuracy defect. They must never
  be captioned or `aria-label`led as depicting the actual ingredients, and should not sit next to
  ingredient copy without a real Scotch Bonnet photograph nearby to correct the read.

**Sauce colour** is rendered throughout as a thick golden-mustard. That is plausible given the real recipe
(Scotch Bonnet, green papaya, yellow mustard) but is **unverified** — no photograph of the actual sauce
exists on file.

---

## Shot list — what a real shoot must capture

The approved set is decorative graphics plus AI-rendered jars. **There is not one photograph of the actual
product.** Every slot below is currently unfillable.

### Product and spec — blocks `/sauce` and `/partners`
1. **Hero jar, straight-on, 16 oz** — real production jar and real printed label; seamless white and
   seamless black versions; 3:2 and 4:5. Replaces `sauce-product-hero.webp`.
2. **Full range line-up** — 2, 16, 32, 64 oz in one frame, left to right, consistent lighting, labels
   legible. This is the single image `/partners` most needs and nothing in the set substitutes.
3. **Label macro set** — four frames: front panel net contents, ingredient declaration, nutrition panel,
   barcode and lot area. Buyers verify spec from these; they must be photographs of the printed label.
4. **Three-quarter jar with cap detail** — closure type, tamper band, fill line.
5. **Sauce texture** — poured from the real jar onto a white spoon or bowl, showing true colour,
   viscosity, and pulp.

### Ingredients and provenance — safe to shoot immediately, no people needed
6. **Scotch Bonnet peppers, loose** — real Scotch Bonnets. Every approved graphic renders the wrong
   pepper; this is the only correction.
7. **Full ingredient flat-lay** — Scotch Bonnet, green papaya, onion, garlic, yellow mustard, vinegar,
   salt on a dark ground. No hands, no jar.
8. **Green papaya close-up** — the ingredient that most differentiates the formulation, absent from the set.

### Wholesale — shoot only once the underlying fact is true
9. **Case pack** — sealed shipping case closed and open, units per case visible, case markings legible.
10. **Pallet or master carton stack** — only if real inventory exists. Do not stage.
11. **Shelf-ready facing** — jars front-faced on shelf or in a PDQ tray, if a retail display exists.

### Story
12. **A real place** — the actual origin: kitchen, coastline, town, home counter. `story-ground.webp` is
    fantasy scenery and can never be captioned as origin, so `/story` has zero factual imagery today.
13. **Founder portrait or hands at work** — only with a real, consenting person. `/story` currently has
    no human presence and no synthetic substitute is permissible.

### Format gaps
14. **Vector brand mark** — SVG plus alpha PNG, and a mono/knockout version for dark grounds. The label
    SVGs contain no vector mark (see spec §4.4).
15. **Portrait crops** — the entire approved set is landscape, wide-banner, or square. There is no 4:5 or
    9:16 asset, so mobile heroes on `/`, `/story`, and `/partners` have no correctly-shaped ground.
16. **Open Graph image, 1200×630** — `badge-emblem.webp` serves as an interim; the shipping OG image
    should carry the real product.
17. **`/inquire` imagery** — appears in no slot. `partners-panel-ground.webp` or `texture-tile.webp` can
    serve at low opacity as an interim.

### Not photography, but what actually converts a wholesale buyer
18. FDA registration, certificate of insurance, allergen and nutrition statements, co-packer details,
    sell sheet. No image in this set substitutes for these.
