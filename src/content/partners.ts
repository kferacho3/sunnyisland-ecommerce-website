import { approved, pending, type Claim } from "./claim";

/**
 * Wholesale and retail.
 *
 * Almost everything a buyer needs is still unverified, and that is the honest
 * state. Rows render only when approved — a distributor reading "TBD" trusts
 * you less than a distributor reading a short, complete list.
 */
export const partners = {
  wholesale: {
    title: "Wholesale Distribution",
    lede: "For distributors, brokers, commercial kitchens, and food-service programs buying by the case.",
    fit: [
      "You buy recurring volume, not one-off orders",
      "You serve independent grocers, restaurants, or institutional kitchens",
      "You can work with a small producer scaling deliberately",
    ],
    formats: "16, 32, and 64 oz artwork is complete and print-ready.",
  },

  retail: {
    title: "Retail Partnerships",
    lede: "For grocers, supermarkets, Caribbean markets, and specialty shops putting it on a shelf.",
    fit: [
      "You carry condiments with real provenance",
      "You can start with a single store or a region",
      "You want a Caribbean sauce that is not a supermarket house brand",
    ],
    formats: "The 8 FL OZ (250 g) bottle is the retail-facing unit.",
  },

  /** The readiness table. Statuses are honest; unapproved rows do not render. */
  readiness: [
    {
      label: "Ingredient statement",
      claim: approved("Available", "Printed on the current label"),
    },
    {
      label: "Nutrition panel",
      claim: approved("Available", "Printed on the current label"),
    },
    {
      label: "Consumer SKU",
      claim: approved("8 FL OZ (250 g)", "Owner-confirmed"),
    },
    {
      label: "Bulk artwork",
      claim: approved("2 / 16 / 32 / 64 oz", "Label PDFs on file"),
    },
    { label: "Sell sheet", claim: pending("Not yet produced.") },
    { label: "UPC / GTIN", claim: pending("Per-SKU assignment needed.") },
    { label: "Case pack & dimensions", claim: pending("Not yet specified.") },
    {
      label: "Shelf life",
      claim: pending("Needs pH / water-activity testing."),
    },
    { label: "Storage requirements", claim: pending("Needs confirmation.") },
    { label: "Lot coding", claim: pending("Needs confirmation.") },
    {
      label: "Certificate of insurance",
      claim: pending("Needs confirmation."),
    },
    { label: "W-9 / vendor paperwork", claim: pending("Needs confirmation.") },
    {
      label: "Allergen statement",
      claim: pending("Mustard position for export."),
    },
    { label: "Minimum order", claim: pending("Not yet set.") },
    { label: "Lead time", claim: pending("Not yet measured.") },
    {
      label: "Service regions",
      claim: pending("Depends on shipping licence."),
    },
    { label: "Sample policy", claim: pending("Not yet set.") },
  ] as const satisfies readonly { label: string; claim: Claim<string> }[],

  process: [
    {
      step: "01",
      title: "Tell us what you need",
      body: "Format, volume, territory, and when you would want it. Two minutes, no account.",
    },
    {
      step: "02",
      title: "We review and reply",
      body: "A real person reads it. If we cannot serve you yet, we will say so plainly.",
    },
    {
      step: "03",
      title: "Samples",
      body: "Where it makes sense, we get product in your hands before anything is agreed.",
    },
    {
      step: "04",
      title: "Terms and first order",
      body: "Pricing, paperwork, lead time, and a first run sized to actually arrive on time.",
    },
  ],

  shippingStatus: pending(
    "faqData.ts:95 says shipping arrives 'as soon as we are licensed', while the old " +
      "shop advertised free shipping over both $50 and $100. What is the actual " +
      "interstate licence status? This gates what /inquire may promise.",
  ),
} as const;
