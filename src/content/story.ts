import { approved, pending } from "./claim";

const LABEL = "16oz label PDF, 'Our History' and 'A Special Message' panels";

/**
 * The heritage narrative comes off the physical label, in the brand's own words.
 *
 * Superseded: "Est. 1994" appeared three times in the old site (about:86,
 * about:548, Footer.tsx:206) and is contradicted by the label. Removed.
 */
export const story = {
  origin: approved(
    "Originating in the early 1900s on St. Vincent Island and refined in Trinidad & Tobago, " +
      "the five-generation-old Sunny Island Pepper Sauce now debuts in the United States, " +
      "bringing a taste of Caribbean heritage.",
    LABEL,
  ),

  generations: approved("Five", LABEL),

  /** Printed on every bottle, attributed to the Feracho Brand. */
  wellnessMessage: approved(
    {
      quote:
        "Your Well-being is your greatest treasure; Health, Happiness and self-care " +
        "are your compass to a fulfilled life. Prioritize them fearlessly.",
      attribution: "A message from the Feracho Brand",
    },
    LABEL,
  ),

  /** Harvested from storyData.ts — first-party narrative, edited down. */
  chapters: approved(
    [
      {
        eyebrow: "Where it starts",
        title: "A recipe that travelled",
        body:
          "It began on St. Vincent in the early 1900s and was refined in Trinidad & Tobago — " +
          "a family sauce, made the same way, handed down five times before it ever had a label.",
      },
      {
        eyebrow: "What is in it",
        title: "Seven things, and nothing else",
        body:
          "Scotch bonnet peppers, vinegar, onion, garlic, yellow mustard, green papaya, salt. " +
          "The papaya is the part people cannot place — it gives body and a clean finish " +
          "where most sauces just get hotter.",
      },
      {
        eyebrow: "Where it is made",
        title: "A licensed commercial kitchen",
        body:
          "Batches are made by hand in a licensed shared commercial facility — the same room " +
          "for test batches and full production runs, which is what makes a wholesale " +
          "conversation possible at all.",
      },
      {
        eyebrow: "Why it exists",
        title: "Well-being, printed on the bottle",
        body:
          "Every label carries a message about health, happiness and self-care. It is not " +
          "marketing added later. It has been on the product from the start.",
      },
    ],
    "storyData.ts sections 1-5, edited; corroborated by the label",
  ),

  /**
   * storyData.ts section 8 ("Recipe Submissions") is dropped — it solicits
   * account-based submissions, and accounts are removed.
   */

  facility: approved(
    "Made by hand in a licensed shared commercial kitchen, in batches small enough to " +
      "taste every one — with the equipment to scale from a test batch to a full production run.",
    "explore/locations/page.tsx:183-230, first-party copy",
  ),

  recipeDate: pending(
    "The label front says 'early 1900s'; the seal says 'Recipe est. 1950s'. " +
      "Which is the recipe and which is the family's arrival?",
  ),

  nonProfit: pending(
    "faqData.ts:77 implies a registered mental-health non-profit. Legal name and status?",
  ),
} as const;
