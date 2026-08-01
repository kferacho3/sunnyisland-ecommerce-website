import { z } from "zod";

/**
 * Inquiry contract.
 *
 * One discriminated union keyed on `buyerType`. Each buyer path carries only the
 * fields that path actually needs, so the server can never receive a retail
 * store count on a consumer inquiry, and `/partners` copy can be written against
 * a real type rather than an optional-everything bag.
 */

/* ------------------------------------------------------------------ scalars */

const trimmed = (max: number) => z.string().trim().max(max);
const required = (max: number, label: string) =>
  trimmed(max).min(1, `${label} is required`);

/**
 * Strips CR/LF from any value that could reach a mail header.
 * The previous implementation interpolated the subject straight into
 * `Subject: ${subject}\r\n`, which allowed arbitrary header injection.
 */
const headerSafe = (max: number, label: string) =>
  required(max, label).transform((s) => s.replace(/[\r\n]+/g, " "));

const email = trimmed(254)
  .min(1, "Email is required")
  .email("Enter a valid email address")
  .transform((s) => s.toLowerCase());

/** Permissive on purpose — international formats vary and this is a lead, not a payment. */
const phone = trimmed(32)
  .refine(
    (s) => s === "" || /^[\d\s()+.\-x]{7,}$/i.test(s),
    "Enter a valid phone number",
  )
  .optional()
  .transform((s) => (s ? s : undefined));

const url = trimmed(2048)
  .refine(
    (s) =>
      s === "" || /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#][^\s]*)?$/i.test(s),
    "Enter a valid website",
  )
  .optional()
  .transform((s) =>
    s ? (/^https?:\/\//i.test(s) ? s : `https://${s}`) : undefined,
  );

export const CONTACT_METHODS = ["email", "phone", "either"] as const;
export const FULFILMENT = ["pickup", "delivery", "shipping", "unsure"] as const;

/* ------------------------------------------------------------------- shared */

const base = z.object({
  name: headerSafe(120, "Name"),
  email,
  phone,
  /** City/state, or the region a business serves. */
  region: trimmed(120)
    .optional()
    .transform((s) => (s ? s : undefined)),
  preferredContact: z.enum(CONTACT_METHODS).default("email"),
  message: required(4000, "Message"),
  // zod v4: custom messages use `error`, not v3's `errorMap` (which is ignored silently).
  consent: z.literal(true, {
    error: () => "Please agree to be contacted about this inquiry",
  }),

  // Attribution — populated by the form, never shown to the visitor.
  source: trimmed(120).optional(),
  landingPage: trimmed(2048).optional(),
  referrer: trimmed(2048).optional(),
  utmSource: trimmed(120).optional(),
  utmMedium: trimmed(120).optional(),
  utmCampaign: trimmed(120).optional(),

  // Abuse controls.
  /**
   * Honeypot. Real users never see this field, so any content means a bot.
   *
   * Deliberately permissive here: if the schema rejected it, the caller would
   * get a 422 naming the field and learn the trap exists. The route accepts the
   * value, then returns a plausible success without sending anything.
   */
  company_website: z.string().max(200).optional().default(""),
  /** ms since the form mounted. Sub-2s submissions are automated. */
  elapsedMs: z.number().int().nonnegative().optional(),
  /** Client-generated, stable across retries of the same submission. */
  idempotencyKey: z.string().uuid().optional(),
});

/* --------------------------------------------------------------- per buyer */

export const SIZES = ["2oz", "8oz", "16oz", "32oz", "64oz", "unsure"] as const;
export const CONSUMER_USES = [
  "personal",
  "gift",
  "event",
  "farmers-market",
  "food-truck",
  "subscription-box",
  "other",
] as const;

const consumer = base.extend({
  buyerType: z.literal("consumer"),
  /** 8oz is the primary consumer bottle. */
  sizes: z
    .array(z.enum(SIZES))
    .min(1, "Choose at least one size")
    .max(SIZES.length),
  quantity: trimmed(80).optional(),
  useCase: z.enum(CONSUMER_USES).optional(),
  neededBy: trimmed(40).optional(),
  fulfilment: z.enum(FULFILMENT).default("unsure"),
  recurring: z.boolean().default(false),
});

export const BUSINESS_TYPES = [
  "distributor",
  "broker",
  "foodservice",
  "commercial-kitchen",
  "restaurant-group",
  "ecommerce",
  "subscription-box",
  "other",
] as const;

const wholesale = base.extend({
  buyerType: z.literal("wholesale"),
  company: headerSafe(160, "Company"),
  role: trimmed(120).optional(),
  website: url,
  businessType: z.enum(BUSINESS_TYPES),
  territory: trimmed(200).optional(),
  firstOrder: trimmed(80).optional(),
  monthlyVolume: trimmed(80).optional(),
  formats: z.array(z.enum(SIZES)).default([]),
  sampleRequest: z.boolean().default(false),
  startDate: trimmed(40).optional(),
});

export const STORE_TYPES = [
  "grocery",
  "supermarket",
  "caribbean-market",
  "specialty-food",
  "boutique",
  "convenience",
  "other",
] as const;

const retail = base.extend({
  buyerType: z.literal("retail"),
  retailer: headerSafe(160, "Retailer"),
  buyerRole: trimmed(120).optional(),
  website: url,
  storeType: z.enum(STORE_TYPES),
  storeCount: trimmed(40).optional(),
  locations: trimmed(200).optional(),
  skus: z.array(z.enum(SIZES)).default([]),
  launchWindow: trimmed(60).optional(),
  openingOrder: trimmed(80).optional(),
  packetRequest: z.boolean().default(false),
});

const other = base.extend({
  buyerType: z.literal("other"),
  organisation: headerSafe(160, "Organisation").optional(),
  partnershipType: trimmed(160).optional(),
});

/** Plain feedback — the owner wants this path alongside the sales paths. */
const feedback = base.extend({
  buyerType: z.literal("feedback"),
  rating: z.number().int().min(1).max(5).optional(),
  purchasedAt: trimmed(160).optional(),
});

/* ------------------------------------------------------------------ export */

export const InquirySchema = z.discriminatedUnion("buyerType", [
  consumer,
  wholesale,
  retail,
  other,
  feedback,
]);

export type Inquiry = z.infer<typeof InquirySchema>;
export type BuyerType = Inquiry["buyerType"];

export const BUYER_TYPES = [
  "consumer",
  "wholesale",
  "retail",
  "other",
  "feedback",
] as const satisfies readonly BuyerType[];

export const BUYER_LABELS: Record<BuyerType, string> = {
  consumer: "Direct Order",
  wholesale: "Wholesale Distribution",
  retail: "Retail Partnership",
  other: "Other Partnership",
  feedback: "Feedback",
};

/** Minimum time a human plausibly takes to complete the form. */
export const MIN_ELAPSED_MS = 2_000;
