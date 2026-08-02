import { approved, pending, type Claim } from "./claim";

const LABEL = "16oz label PDF, nutrition and ingredient panels";

/**
 * Product facts, sourced from the physical label rather than the old code.
 *
 * Superseded and NOT carried over: nutrition.tsx listed sodium as 100mg (5%)
 * and gave the ingredient statement as "Peppers, Garlic, Water, Vinegar, Fruit,
 * Condiments, Salt" — "Fruit" and "Condiments" are categories, not declarable
 * ingredients.
 */
export const product = {
  name: "Classic Gold",
  legalName: "Sunny Island Pepper Sauce",

  /** The consumer hero SKU. */
  heroSize: approved("8 FL OZ (250 g)", "Owner-confirmed 2026-08-01"),

  ingredients: approved(
    [
      "Scotch Bonnet Peppers",
      "Vinegar",
      "Onion",
      "Garlic",
      "Yellow Mustard",
      "Green Papaya",
      "Salt",
    ],
    LABEL,
  ),

  servingSize: approved("1 tsp (5.7 g)", LABEL),

  nutrition: [
    { label: "Calories", claim: approved("0", LABEL) },
    { label: "Total fat", claim: approved("0 g (0%)", LABEL) },
    { label: "Cholesterol", claim: approved("0 mg (0%)", LABEL) },
    { label: "Sodium", claim: approved("90 mg (4%)", LABEL) },
    { label: "Total carbohydrate", claim: approved("0 g (0%)", LABEL) },
    { label: "Total sugars", claim: approved("0 g", LABEL) },
    { label: "Protein", claim: approved("0 g (0%)", LABEL) },
    // All four larger labels carry an identical "48 servings per container",
    // which cannot be true across a 32x size range. Withheld until corrected.
    // See docs/content-truth-ledger.md §2.1.
    {
      label: "Servings per container",
      claim: pending(
        "Label states 48 on every size; needs per-SKU correction.",
      ),
    },
  ] as const satisfies readonly { label: string; claim: Claim<string> }[],

  /** Formats. Artwork exists for all five; which of them ship is unconfirmed. */
  formats: [
    {
      label: "Consumer bottle",
      claim: approved("8 FL OZ (250 g)", "Owner-confirmed"),
    },
    { label: "Small format", claim: pending("Is the 2 oz in production?") },
    {
      label: "Food-service",
      claim: pending("Are 16 / 32 / 64 oz shipping today?"),
    },
    { label: "Case pack", claim: pending("Units per case, per SKU.") },
    { label: "Minimum order", claim: pending("MOQ for wholesale and retail.") },
    {
      label: "Lead time",
      claim: pending("Production and replenishment lead time."),
    },
    {
      label: "Shelf life",
      claim: pending("Needs pH / water-activity results."),
    },
    { label: "UPC / GTIN", claim: pending("Per-SKU barcode assignment.") },
  ] as const satisfies readonly { label: string; claim: Claim<string> }[],

  /** Heat. The old productsData.ts contradicted itself, so nothing ships yet. */
  heat: pending(
    "productsData.ts gives VERDE the same 150,000-325,000 SHU as the hotter OG, " +
      "and BLAZE a lower range at a higher spice level. Needs HPLC results or " +
      "a descriptive position instead of a number.",
  ),

  /** Descriptive, not a heat claim — safe to publish. */
  flavourNotes: approved(
    [
      "Scotch bonnet, forward and fruity rather than flat",
      "Green papaya for body and a clean finish",
      "Yellow mustard and vinegar carrying the tang",
      "Onion and garlic underneath, not on top",
    ],
    "Derived from the label ingredient statement",
  ),

  waysToUse: approved(
    [
      {
        title: "Marinate",
        note: "Chicken, pork, fish — overnight or an hour.",
      },
      {
        title: "Grill",
        note: "Brush on in the last minutes so it does not scorch.",
      },
      { title: "Finish", note: "Straight over rice, peas, stew, or roti." },
      { title: "Dip", note: "Cut into mayo or yoghurt for something milder." },
      { title: "Cook in", note: "A spoon into the pot early, for depth." },
      {
        title: "Serve",
        note: "On the table, where it usually ends up anyway.",
      },
    ],
    "Harvested from useCaseData.tsx, first-party application copy",
  ),

  dietary: {
    vegan: pending("Certified, or self-attested?"),
    glutenFree: pending("Certified, or tested to <20 ppm?"),
    allergens: pending(
      "faqData.ts says 'none of the Big Nine' — consistent with the US list, " +
        "which excludes mustard. Yellow mustard IS a major allergen in Canada " +
        "and the EU, so export needs it declared. Also contradicted by " +
        "nutrition.tsx's shared-facility statement.",
    ),
  },
} as const;
