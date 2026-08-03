import type { Metadata } from "next";

import { LegalDoc, type LegalSection } from "@/components/legal/LegalDoc";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The terms for using sunnyislandpepper.com. An inquiry is a request to talk, not an order — pricing and supply terms are agreed separately in writing.",
  alternates: { canonical: "/legal/terms" },
};

/**
 * Rewritten for an inquiry-first site.
 *
 * The inherited terms governed a storefront: orders, shipping, returns,
 * refunds, account termination. None of that applies — nothing can be bought
 * here. Terms describing a checkout that does not exist would be the first
 * thing a wholesale buyer's counsel flagged.
 *
 * NOTE FOR THE OWNER: governing law and venue are deliberately absent rather
 * than guessed. Those are a real legal choice with real consequences, and
 * inventing a jurisdiction would be worse than leaving the clause for counsel
 * to add.
 */
const SECTIONS: LegalSection[] = [
  {
    id: "scope",
    title: "What these terms cover",
    body: [
      "They cover your use of sunnyislandpepper.com. Using the site means you accept them. If you do not, please do not use the site — you can always reach us directly at info@sunnyislandpepper.com instead.",
    ],
  },
  {
    id: "not-a-store",
    title: "This is not a store",
    body: [
      "You cannot place an order on this site. There is no cart, no checkout, and no payment is taken. Every price, quantity, lead time, and supply term is agreed separately, in writing, between you and Sunny Island.",
    ],
  },
  {
    id: "inquiries",
    title: "An inquiry is not a contract",
    body: [
      "Submitting the form starts a conversation. It does not reserve stock, lock a price, guarantee supply, or create any obligation on either side. Nothing on this site is an offer capable of acceptance.",
      "Please send accurate information. If you inquire on behalf of a business, you are confirming you are allowed to do so.",
    ],
  },
  {
    id: "product",
    title: "Product information",
    body: [
      "We describe the sauce as carefully as we can, but the physical label on the bottle you hold is what governs — ingredients, allergens, net weight, and nutrition are stated there and take precedence over anything on this site.",
      "If you have an allergy, read the label, and write to us before buying if anything is unclear. Photography is illustrative; packaging and labelling change over time.",
    ],
  },
  {
    id: "recipes",
    title: "Recipes",
    body: [
      "The recipes here are shared for home cooking, as-is. Cook safely, use your own judgement on heat and seasoning, and take care with hot oil and fresh peppers. We are not responsible for how a dish turns out.",
    ],
  },
  {
    id: "ip",
    title: "What belongs to whom",
    body: [
      "The Sunny Island name, the logo, the label artwork, the photography, the film, and the writing on this site belong to Sunny Island. You are welcome to link to any page, quote us with credit, and cook the recipes for yourself or your customers.",
      "You may not reuse the brand marks or artwork commercially, present our material as your own, or imply a partnership that has not been agreed. Ask us — for genuine retail and distribution partners the answer is usually yes, and we will send you proper assets.",
    ],
  },
  {
    id: "use",
    title: "Using the site properly",
    body: [
      "Do not attempt to break, overload, or probe the site, and do not use the inquiry form to send bulk, automated, unlawful, or abusive messages. We rate-limit submissions and will block abuse.",
    ],
  },
  {
    id: "availability",
    title: "Availability",
    body: [
      "We run this site as reliably as we can, but we do not promise it will always be available or error-free, and we may change or remove any part of it. The site is provided as-is, without warranties beyond those the law does not let us exclude.",
    ],
  },
  {
    id: "liability",
    title: "Liability",
    body: [
      "To the extent the law allows, Sunny Island is not liable for indirect or consequential loss arising from your use of this site. Nothing here limits liability for death or personal injury caused by negligence, for fraud, or for anything else that cannot lawfully be limited — including our responsibilities for the food we sell.",
    ],
  },
  {
    id: "changes",
    title: "Changes",
    body: [
      "We may update these terms. The date at the top of the page shows when they last changed, and the version in force is the one published here at the time you use the site.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: ["Questions about these terms go to info@sunnyislandpepper.com."],
  },
];

export default function TermsPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title="An inquiry is a conversation, not an order."
      lede="Nothing can be bought on this site. These terms cover using it, what our product information means, and what belongs to whom."
      updated="2 August 2026"
      sections={SECTIONS}
    />
  );
}
