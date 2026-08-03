import type { Metadata } from "next";

import { LegalDoc, type LegalSection } from "@/components/legal/LegalDoc";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What Sunny Island Pepper Sauce collects when you send an inquiry, who sees it, and how to have it deleted. No accounts, no tracking, no cookies.",
  alternates: { canonical: "/legal/privacy" },
};

/**
 * Written against what this codebase actually does, not against a template.
 *
 * The policy this replaces was inherited from the e-commerce build and
 * described account creation, shopping-cart data, payment details, cookies and
 * third-party tracking — none of which exist here any more. A policy that
 * claims more collection than actually happens is not a safe default; it is
 * simply inaccurate, and it trains people to ignore the document.
 *
 * Every claim below is checkable in the repo: the only inbound data path is
 * POST /api/inquiries, the only processors are Resend and AWS, and there is no
 * analytics, pixel, cookie or localStorage use anywhere in the marketing tree.
 */
const SECTIONS: LegalSection[] = [
  {
    id: "scope",
    title: "What this site is",
    body: [
      "sunnyislandpepper.com is a brand and inquiry site. There is no account to create, no cart, no checkout, and no payment taken here. The only way to send us anything is the inquiry form.",
    ],
  },
  {
    id: "collect",
    title: "What we collect",
    body: [
      "Only what you type into the inquiry form, plus a small amount of technical information the form needs in order to work:",
      [
        "Your name and email address, which are required.",
        "Your phone number, your region, and how you would prefer to be contacted — all optional.",
        "Your message, and the details for the path you picked: sizes and quantities for a direct order; company, territory and volumes for wholesale; retailer, store count and launch window for retail.",
        "Anti-spam signals: how long the form was open before submission, and a hidden field that only automated submissions fill in.",
        "A one-time submission identifier, so that a double-click or a retry cannot create two inquiries.",
        "The page you submitted from, the page that referred you, and any campaign tags in the link you followed.",
      ],
      "We do not ask for and have no way to receive payment details, government identifiers, or health information.",
    ],
  },
  {
    id: "use",
    title: "What we do with it",
    body: [
      "We email it to the Sunny Island inbox that handles your kind of inquiry, and we send you an acknowledgement so you have a record with a reference number. Then we reply to you.",
      "We do not sell it, rent it, trade it, or use it to build advertising audiences. We do not add you to a mailing list — there is no newsletter to be added to.",
    ],
  },
  {
    id: "processors",
    title: "Who else can see it",
    body: [
      "Two service providers necessarily handle your inquiry on the way to us:",
      [
        "Resend, which delivers the email.",
        "Amazon Web Services, which hosts the site and runs the code that receives the form.",
      ],
      "Beyond those, your inquiry goes only to Sunny Island. We will also disclose information if the law requires it of us.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and tracking",
    body: [
      "This site sets no cookies, and it runs no analytics, no advertising pixels, and no third-party scripts. Nothing is written to your browser's local storage. There is no consent banner because there is nothing to consent to.",
      "The product film and the 3D island scene run entirely in your browser and report nothing back.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: [
      "Your inquiry lives in our email, and we keep it as long as it is useful for the conversation it started and for our own business records. If you would rather we did not, ask and we will delete it.",
    ],
  },
  {
    id: "rights",
    title: "Your rights",
    body: [
      "Email us and we will tell you what we hold about you, correct it, or delete it. Depending on where you live you may have a formal right to these; we will honour the request either way, and we will not make you create an account to exercise it.",
    ],
  },
  {
    id: "children",
    title: "Children",
    body: [
      "This site is not directed at children, and we do not knowingly collect information from anyone under 13. If you believe a child has sent us something, tell us and we will delete it.",
    ],
  },
  {
    id: "changes",
    title: "Changes",
    body: [
      "If this policy changes we will update the date at the top of the page. Material changes will be described here rather than slipped in.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      "Questions about this policy, or a request about your information, go to info@sunnyislandpepper.com.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title="We collect what you send us. Nothing else."
      lede="No accounts, no cart, no cookies, and no tracking of any kind. The only information this site receives is what you choose to put in the inquiry form."
      updated="2 August 2026"
      sections={SECTIONS}
    />
  );
}
