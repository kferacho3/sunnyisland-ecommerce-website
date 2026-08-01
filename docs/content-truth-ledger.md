# Content Truth Ledger

Every factual claim the site may render. **Nothing renders unless `status: approved`.**

Source of record for `label-16oz`: `Sunny Island Pepper Sauce New and Improved (16 oz).pdf`, text extracted
2026-08-01. All four size labels (2/16/32/64 oz) were checked and carry byte-identical nutrition and
ingredient text.

Status values: `approved` (evidence on file) · `pending` (needs owner evidence) · `rejected` (proven false).

---

## 1. Product identity

| Claim | Value | Status | Source |
|---|---|---|---|
| Product name | Sunny Island Pepper Sauce | approved | label-16oz front panel |
| Net contents (16 oz SKU) | 16 FL OZ (473 ml) | approved | label-16oz front panel |
| **Primary consumer SKU** | **8 FL OZ (250 g)** | **approved** | Owner-confirmed 2026-08-01. This is the main bottle sold to consumers. Corroborated by `faqData.ts:16` and `PepperSauceBottleShopDisplay.webp`. |
| Sizes with additional artwork on file | 2 oz, 16 oz, 32 oz, 64 oz | approved | four label PDFs |
| Which of 2/16/32/64 oz ship today | — | **pending** | Artwork exists ≠ SKU ships. Which can a buyer order now? |

The 8 oz bottle is the hero product for `/sauce` and the Direct-to-Consumer buyer path. The larger
formats (16/32/64 oz) are the wholesale and food-service story on `/partners`.

Dual declaration "8 FL OZ (250 g)" — volume plus net weight — is a standard and correct format.
| Multi-flavour range (FIESTA, BLAZE, INFERNO, VERDE) | — | **pending** | `productsData.ts` lists five; only OG has a model and no label artwork exists for the other four. |

## 2. Ingredients and nutrition

| Claim | Value | Status | Source |
|---|---|---|---|
| Ingredient statement | Scotch Bonnet Peppers, Vinegar, Onion, Garlic, Yellow Mustard, Green Papaya, Salt | approved | label-16oz |
| Serving size | 1 tsp (5.7 g) | approved | label-16oz |
| Calories | 0 | approved | label-16oz |
| Total fat | 0 g (0%) | approved | label-16oz |
| Cholesterol | 0 mg (0%) | approved | label-16oz |
| Sodium | **90 mg (4%)** | approved | label-16oz |
| Total carbohydrate | 0 g (0%) | approved | label-16oz |
| Total sugars | 0 g | approved | label-16oz |
| Protein | 0 g (0%) | approved | label-16oz |
| Servings per container | — | **rejected — see §2.1** | label says 48 on all four sizes |
| Allergy contact | TheFerachoGroup@gmail.com | approved | label-16oz nutrition panel |

**Superseded by the above — must not be reused:** `nutrition.tsx:16-34` lists sodium as 100 mg (5%) and
gives the ingredient statement as "Peppers, Garlic, Water, Vinegar, **Fruit**, **Condiments**, Salt".
"Fruit" and "Condiments" are categories, not declarable ingredients. Delete, do not migrate.

### 2.1 ⚠️ Label defect — servings per container

All four of the 2/16/32/64 oz labels state **"48 Servings per container"**. That cannot be true across a
32× size range.

At the label's own serving size of 5.7 g, 48 servings = **273.6 g**. That is the 8 oz consumer bottle's
panel — 250 g actual, which works out to **43.9 servings**, so 48 is ~9% over even there. The 8 oz panel
was then carried onto all four larger labels without recalculation.

Approximate corrected values, assuming ~1.05 g/ml for a vinegar-based sauce:

| Label | Volume | Approx. net weight | Servings should be ≈ |
|---|---|---|---|
| **8 oz (consumer)** | 237 ml | **250 g (stated)** | **~44** (label says 48) |
| 2 oz | 59 ml | ~62 g | ~11 |
| 16 oz | 473 ml | ~497 g | ~87 |
| 32 oz | 946 ml | ~994 g | ~174 |
| 64 oz | 1,893 ml | ~1,987 g | ~349 |

Only the 8 oz row uses a stated net weight; the rest assume density. Exact figures must come from
measured fill weight per SKU.

Severity: the 8 oz discrepancy is small and may be a rounding or formulation difference worth confirming.
**The 2 / 16 / 32 / 64 oz labels are wrong by 4× to 7×** and are the ones to stop at the printer.

**Action: owner to confirm with the label printer before any further print run.** Servings-per-container is
a required and enforceable field. This is a product issue, not a website issue, and it outranks the website.

**Site consequence:** `/sauce` renders the per-serving panel (which is consistent) and **omits
servings-per-container entirely** until corrected values exist.

### 2.2 Allergen position

| Claim | Status | Note |
|---|---|---|
| "Contains none of the Big Nine allergens" (`faqData.ts:52`) | **pending** | Technically consistent with the US Big Nine, which excludes mustard. **Yellow mustard is a major declarable allergen in Canada and the EU.** Any export or cross-border wholesale conversation must declare it. |
| "Made in a facility that processes various ingredients" (`nutrition.tsx:230`) | **pending** | Contradicts the above. Which is on the physical label? |
| Vegan | **pending** | Ingredient list is consistent with vegan. Certified or self-attested? |
| Gluten-free | **pending** | Certified or self-attested? Tested to <20 ppm? |
| Shelf stable | **pending** | Needs pH and water-activity results. |

## 3. Heritage

| Claim | Value | Status | Source |
|---|---|---|---|
| Origin | "Originating in the early 1900s on St. Vincent Island and refined in Trinidad & Tobago" | approved | label-16oz "Our History" panel |
| Generations | Five | approved | label-16oz — "the five-generation-old Sunny Island Pepper Sauce" |
| US market status | "now debuts in the United States" | approved | label-16oz |
| Recipe date on seal | "Recipe est. 1950s" | **pending** | Conflicts with "early 1900s" on the same label. Which is the recipe and which is the family's arrival? |
| "Est. 1994" | — | **rejected** | Asserted at `about:86`, `about:548`, `Footer.tsx:206`. Contradicted by the physical label. Remove everywhere. |

## 4. Mission

| Claim | Value | Status | Source |
|---|---|---|---|
| Wellness message | "Your Well-being is your greatest treasure; Health, Happiness and self-care are your compass to a fulfilled life. Prioritize them fearlessly." | approved | label-16oz "A Special Message" panel, attributed "A Message From the Feracho Brand" |
| Mental-health / wellness focus | narrative | approved | `storyData.ts` sections 3-4, corroborated by the label |
| Small-business support | narrative | approved | `storyData.ts` section 3 |
| Named non-profit or registered charity | — | **pending** | `faqData.ts:77` implies one. Legal name and registration status? |
| "$25K+ donated" | — | **rejected** | `supportUs:649`. No substantiation. |

## 5. Contact and identity

| Claim | Value | Status | Source |
|---|---|---|---|
| Website | www.sunnyislandpepper.com | approved | label-16oz |
| General email | info@sunnyislandpepper.com | approved | label-16oz |
| Allergy/info email | TheFerachoGroup@gmail.com | approved | label-16oz |
| Instagram | @sunnyislandpepper | approved | label-16oz + embedded QR |
| Inquiry routing address(es) | — | **pending** | Which inbox is monitored, and one or three queues? Blocks `/inquire`. |
| Postal address | — | **pending** | Only publish if intended public. `Footer.tsx:329` currently reads "123 Pepper Lane". |
| Phone | — | **pending** | `Footer.tsx:337` currently reads `tel:+1234567890`. |
| ® registered mark | — | **pending** | ® used at `faqData.ts:33`, `Footer.tsx:368`. Registered or not? |
| Other social accounts | — | **pending** | Only Instagram is corroborated by the label. Facebook/TikTok/X/YouTube links must be verified or dropped. |

## 6. Commercial readiness — all pending

Required before `/partners` can render anything beyond narrative.

| Field | Status |
|---|---|
| Case pack per SKU | pending |
| Minimum order quantity | pending |
| Wholesale / distributor pricing tiers | pending |
| Production lead time | pending |
| Replenishment lead time | pending |
| Service regions | pending |
| Interstate shipping licence status | pending — `faqData.ts:95` says "as soon as we are licensed" while `shop.tsx:303` and `Header.tsx:29` advertise free shipping over $50 and $100 |
| UPC / GTIN per SKU | pending |
| Case dimensions and weight | pending |
| Shelf life | pending |
| Storage requirements | pending |
| Lot coding | pending |
| Certificate of insurance | pending |
| W-9 / vendor paperwork | pending |
| Sample policy | pending |
| Sell sheet | pending |

`/partners` renders **only** rows that reach `approved`. Rows in any other state are omitted, not
labelled "coming soon".

## 7. Social proof — all rejected

Nothing in this section may render. Zero social proof is the correct state until real evidence exists.

| Claim | Location | Status |
|---|---|---|
| 4 customer reviews, 3 flagged `verified: true` | `ratingsReview.tsx:18-73` | rejected — invented |
| 4.9★ average / 120 reviews / rating distribution | `ratingsReview.tsx:63-70` | rejected — invented |
| 3 employee testimonials | `careers/page.tsx:582` | rejected — invented |
| 3 customer testimonials | `supportUs/page.tsx:710` | rejected — invented |
| "1M+ / 50,000+ / 10K+ / 1000+ Happy Customers" | four locations, mutually contradictory | rejected |
| Follower counts (FB 15K, TikTok 50K, IG 25K, X 10K, YT 30K) | `SectionSocial.tsx:26-74` | rejected — hardcoded, no API |
| Growth figures +125% / +200% / +300% | `supportUs:79-131` | rejected |
| "50+ Countries Served", "30+ Years of Excellence", "50K+ Bottles Sold", "5K+ Community Members" | various | rejected |
| "🏆 Award Winning" / "Award-Winning Recipe" | `SectionHero.tsx:308`, `supportUs:68` | rejected — no competition, year, or category named |
| Randomised recipe hearts / prep time / servings / difficulty | `recipes/page.tsx:228` | rejected — `Math.random()` at render |

## 8. Imagery

| Asset | Status | Note |
|---|---|---|
| `explore/locations/locations1–10.webp` | approved | Real photographs of the licensed commercial kitchen. Primary `/partners` and `/story#production` imagery. |
| `explore/aboutUs/about8.webp` | approved | Only authentic product-in-use lifestyle photo on file. |
| Label-extracted flame mark (1024², alpha) | approved | Extracted from label SVG. Best isolated mark available. |
| Label-extracted wreath ornament (1024², alpha) | approved | Editorial ornament. |
| Label front panel (1052×1495) | approved | Product detail imagery. |
| `SunnyIslandPepperSauceFINAL.glb` | approved | Real product model, 1.07 MB. |
| Hero video (S3) | approved | CG render of the real product. |
| `explore/aboutUs/about1–5.webp` | rejected | DALL·E 1024² squares presented as brand photography. |
| `about6/7`, `careers/*`, `supportUs/*` | rejected | Licensed stock with the badge composited in; no licence record in repo. |
| `explore/recipes/RecipeId2–150.webp` | rejected | ~149 third-party food photos re-hosted on Sunny Island S3. |
| Supplied AI image set (21 files, 2026-08-01) | partial | See `docs/image-manifest.md`. Abstract and food-only approved; people, staff, market stall, food truck, and fulfilment scenes rejected. |
| Vector logo master | **pending** | Does not exist. Label SVGs embed 8.96 MB of PNG rasters with zero live text and no vector mark. |

## 9. Open questions, ordered by how hard they block

1. **Which inbox receives inquiries, and one queue or three?** Blocks `/inquire` entirely.
2. **Which SKUs ship today?** Blocks `/sauce` and anything offered to a distributor.
3. **Servings-per-container correction.** Blocks the `/sauce` nutrition panel; blocks reprinting labels.
4. **Interstate shipping licence status.** Blocks what `/inquire` may promise any buyer type.
5. **Allergen position** — Big Nine claim vs shared-facility statement, and mustard for export.
6. **Recipe date** — "early 1900s" vs "est. 1950s" on the same label.
7. **Commercial readiness fields** (§6). Blocks `/partners` beyond narrative.
8. **Registered non-profit** behind the wellness mission, if any.
9. **® status.**
10. **Which social accounts are real** beyond Instagram.
