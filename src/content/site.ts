import { approved, pending, type Claim } from "./claim";

/** Verified against the physical label artwork, 2026-08-01. */
const LABEL = "16oz label PDF, front and back panels";

export const site = {
  name: "Sunny Island Pepper Sauce",
  shortName: "Sunny Island",
  domain: "sunnyislandpepper.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sunnyislandpepper.com",

  email: approved("info@sunnyislandpepper.com", LABEL),
  allergyEmail: approved("TheFerachoGroup@gmail.com", LABEL),
  instagram: approved(
    {
      handle: "@sunnyislandpepper",
      url: "https://www.instagram.com/sunnyislandpepper",
    },
    `${LABEL} + embedded QR code`,
  ),

  // Only Instagram is corroborated by the label. The other four social links on
  // the old site had hardcoded follower counts and no verification.
  otherSocial: pending(
    "Which other accounts are real and actively maintained?",
  ),
  phone: pending("Is there a business line intended to be public?"),
  address: pending("Is the production address intended to be public?"),
} as const;

export const nav = [
  { href: "/sauce", label: "Sauce" },
  { href: "/partners", label: "Partners" },
  { href: "/story", label: "Story" },
] as const;

export const CTA = {
  href: "/inquire",
  label: "Inquire for Sauce",
} as const;

/** Buyer paths. Order is fixed and identical on every page. */
export const buyerPaths = [
  {
    key: "consumer",
    label: "Direct Orders",
    href: "/inquire?buyer=consumer",
    lede: "For your own table, your market stall, your truck, or a room full of people.",
    needs: [
      "Bottles for home or gifting",
      "Events, markets, and food trucks",
      "Standing monthly orders",
    ],
  },
  {
    key: "wholesale",
    label: "Wholesale Distribution",
    href: "/inquire?buyer=wholesale",
    lede: "For distributors, brokers, and food-service programs buying by the case.",
    needs: [
      "16, 32, and 64 oz formats",
      "Territory and volume planning",
      "Samples and sell sheets",
    ],
  },
  {
    key: "retail",
    label: "Retail Partnerships",
    href: "/inquire?buyer=retail",
    lede: "For grocers, Caribbean markets, and specialty shops placing it on a shelf.",
    needs: [
      "8 oz retail-ready bottle",
      "Single store through regional",
      "Buyer packet on request",
    ],
  },
] as const;

/**
 * The proof rail. Four facts, each defensible from the label. Anything that
 * needed a certificate, a lab result, or a follower count is deliberately absent.
 */
export const proofPoints: readonly Claim<string>[] = [
  approved("Five generations", LABEL),
  approved("St. Vincent & Trinidad", LABEL),
  approved("Scotch bonnet–led", `${LABEL} ingredient statement`),
  approved("Small-batch", "Owner-confirmed production method"),
];
