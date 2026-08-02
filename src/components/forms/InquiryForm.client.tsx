"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { ButtonEl } from "@/components/core/Button";
import { cn } from "@/lib/cn";
import {
  BUSINESS_TYPES,
  BUYER_LABELS,
  BUYER_TYPES,
  CONSUMER_USES,
  CONTACT_METHODS,
  FULFILMENT,
  SIZES,
  STORE_TYPES,
  type BuyerType,
} from "@/lib/inquiries/schema";
import {
  CheckField,
  ChipGroup,
  Honeypot,
  SelectField,
  TextArea,
  TextField,
} from "./Field";

/**
 * The site's one conversion surface.
 *
 * Asks which kind of inquiry this is, then reveals only that path's fields.
 * Values survive switching buyer type, so nobody retypes their name because
 * they picked the wrong option first.
 */

type Values = Record<string, string | boolean | string[]>;

const opts = (xs: readonly string[]) =>
  xs.map((v) => ({
    value: v,
    label: v
      .replace(/-/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase())
      .replace(/(\d+)oz/, "$1 oz"),
  }));

const SIZE_OPTS = SIZES.map((v) => ({
  value: v,
  label: v === "unsure" ? "Not sure yet" : v.replace("oz", " oz"),
}));

const BUYER_BLURB: Record<BuyerType, string> = {
  consumer: "Bottles for you, your stall, your truck, or an event.",
  wholesale: "Case volume for distribution or food service.",
  retail: "Shelf placement in a store or a group of stores.",
  other: "Collaborations, sponsorships, anything else.",
  feedback: "Tell us what you thought. No sales pitch.",
};

export function InquiryForm() {
  const params = useSearchParams();
  const router = useRouter();

  const initialBuyer = useMemo<BuyerType>(() => {
    const q = params.get("buyer");
    return (BUYER_TYPES as readonly string[]).includes(q ?? "")
      ? (q as BuyerType)
      : "consumer";
  }, [params]);

  const [buyerType, setBuyerType] = useState<BuyerType>(initialBuyer);
  const [v, setV] = useState<Values>({
    preferredContact: "email",
    fulfilment: "unsure",
    sizes: [],
    formats: [],
    skus: [],
    recurring: false,
    sampleRequest: false,
    packetRequest: false,
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");
  const [formError, setFormError] = useState<string | null>(null);

  const mountedAt = useRef(Date.now());
  const idempotencyKey = useRef<string>("");
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    idempotencyKey.current = crypto.randomUUID();
  }, []);

  const set = (k: string, val: Values[string]) =>
    setV((prev) => ({ ...prev, [k]: val }));

  const toggle = (k: string, val: string) =>
    setV((prev) => {
      const cur = (prev[k] as string[]) ?? [];
      return {
        ...prev,
        [k]: cur.includes(val) ? cur.filter((x) => x !== val) : [...cur, val],
      };
    });

  const str = (k: string) => (v[k] as string) ?? "";
  const arr = (k: string) => (v[k] as string[]) ?? [];
  const bool = (k: string) => (v[k] as boolean) ?? false;

  function pickBuyer(next: BuyerType) {
    setBuyerType(next);
    setErrors({});
    // Keep the URL honest so the choice survives a refresh or a shared link.
    const q = new URLSearchParams(params.toString());
    q.set("buyer", next);
    router.replace(`/inquire?${q.toString()}`, { scroll: false });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setFormError(null);
    setErrors({});

    // Only send the fields this buyer path actually declares.
    const shared = {
      buyerType,
      name: str("name"),
      email: str("email"),
      phone: str("phone") || undefined,
      region: str("region") || undefined,
      preferredContact: str("preferredContact") || "email",
      message: str("message"),
      consent: bool("consent"),
      source: params.get("source") ?? "inquire-page",
      landingPage: "/inquire",
      referrer: typeof document !== "undefined" ? document.referrer : undefined,
      utmSource: params.get("utm_source") ?? undefined,
      utmMedium: params.get("utm_medium") ?? undefined,
      utmCampaign: params.get("utm_campaign") ?? undefined,
      company_website: str("company_website"),
      elapsedMs: Date.now() - mountedAt.current,
      idempotencyKey: idempotencyKey.current,
    };

    const perPath: Record<BuyerType, Record<string, unknown>> = {
      consumer: {
        sizes: arr("sizes"),
        quantity: str("quantity") || undefined,
        useCase: str("useCase") || undefined,
        neededBy: str("neededBy") || undefined,
        fulfilment: str("fulfilment") || "unsure",
        recurring: bool("recurring"),
      },
      wholesale: {
        company: str("company"),
        role: str("role") || undefined,
        website: str("website") || undefined,
        businessType: str("businessType") || "distributor",
        territory: str("territory") || undefined,
        firstOrder: str("firstOrder") || undefined,
        monthlyVolume: str("monthlyVolume") || undefined,
        formats: arr("formats"),
        sampleRequest: bool("sampleRequest"),
        startDate: str("startDate") || undefined,
      },
      retail: {
        retailer: str("retailer"),
        buyerRole: str("buyerRole") || undefined,
        website: str("website") || undefined,
        storeType: str("storeType") || "grocery",
        storeCount: str("storeCount") || undefined,
        locations: str("locations") || undefined,
        skus: arr("skus"),
        launchWindow: str("launchWindow") || undefined,
        openingOrder: str("openingOrder") || undefined,
        packetRequest: bool("packetRequest"),
      },
      other: {
        organisation: str("organisation") || undefined,
        partnershipType: str("partnershipType") || undefined,
      },
      feedback: {
        rating: str("rating") ? Number(str("rating")) : undefined,
        purchasedAt: str("purchasedAt") || undefined,
      },
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...shared, ...perPath[buyerType] }),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        router.push(
          `/inquire/thank-you?ref=${encodeURIComponent(data.reference)}&buyer=${buyerType}`,
        );
        return;
      }

      setStatus("failed");
      setErrors(data.fieldErrors ?? {});
      setFormError(
        data.error ?? "Something went wrong. Please try again or email us.",
      );
      requestAnimationFrame(() => summaryRef.current?.focus());
    } catch {
      setStatus("failed");
      setFormError(
        "We couldn't reach the server. Please check your connection, or email info@sunnyislandpepper.com.",
      );
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  const busy = status === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <Honeypot
        value={str("company_website")}
        onChange={(x) => set("company_website", x)}
      />

      {/* 1 — which kind of inquiry */}
      <fieldset>
        <legend className="font-display text-heading tracking-display text-on-cream">
          What kind of inquiry is this?
        </legend>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {BUYER_TYPES.map((b) => {
            const on = b === buyerType;
            return (
              <button
                key={b}
                type="button"
                aria-pressed={on}
                onClick={() => pickBuyer(b)}
                className={cn(
                  "border p-5 text-left transition-all duration-medium ease-si",
                  on
                    ? "border-gold bg-cream-raised shadow-gold"
                    : "border-cream-line bg-cream-raised hover:border-gold",
                )}
              >
                <span className="block font-body text-[0.9375rem] font-semibold text-on-cream">
                  {BUYER_LABELS[b]}
                </span>
                <span className="mt-1 block text-sm text-on-cream-muted">
                  {BUYER_BLURB[b]}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {formError ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mt-8 border border-maroon bg-cream-raised p-5"
        >
          <p className="font-body text-sm font-semibold text-maroon">
            {formError}
          </p>
          {Object.keys(errors).length > 0 ? (
            <ul className="mt-2 list-inside list-disc text-sm text-on-cream-muted">
              {Object.entries(errors).map(([k, msg]) => (
                <li key={k}>{msg}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      {/* 2 — path-specific */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {buyerType === "consumer" ? (
          <>
            <ChipGroup
              className="sm:col-span-2"
              label="Which sizes?"
              hint="The 8 oz bottle is our main consumer size."
              required
              options={SIZE_OPTS}
              selected={arr("sizes")}
              onToggle={(x) => toggle("sizes", x)}
              error={errors.sizes}
            />
            <TextField
              name="quantity"
              label="Roughly how many?"
              placeholder="e.g. 12 bottles, or 2 cases"
              value={str("quantity")}
              onChange={(e) => set("quantity", e.target.value)}
              error={errors.quantity}
            />
            <SelectField
              name="useCase"
              label="What's it for?"
              value={str("useCase")}
              onChange={(e) => set("useCase", e.target.value)}
              options={[
                { value: "", label: "Select…" },
                ...opts(CONSUMER_USES),
              ]}
              error={errors.useCase}
            />
            <TextField
              name="neededBy"
              label="Needed by"
              placeholder="e.g. Sept 12, or no rush"
              value={str("neededBy")}
              onChange={(e) => set("neededBy", e.target.value)}
              error={errors.neededBy}
            />
            <SelectField
              name="fulfilment"
              label="How would you like it?"
              value={str("fulfilment")}
              onChange={(e) => set("fulfilment", e.target.value)}
              options={opts(FULFILMENT)}
              error={errors.fulfilment}
            />
            <CheckField
              className="sm:col-span-2"
              name="recurring"
              label="I'd be interested in a standing or recurring order"
              checked={bool("recurring")}
              onChange={(x) => set("recurring", x)}
            />
          </>
        ) : null}

        {buyerType === "wholesale" ? (
          <>
            <TextField
              name="company"
              label="Company"
              required
              value={str("company")}
              onChange={(e) => set("company", e.target.value)}
              error={errors.company}
            />
            <TextField
              name="role"
              label="Your role"
              value={str("role")}
              onChange={(e) => set("role", e.target.value)}
              error={errors.role}
            />
            <TextField
              name="website"
              label="Website"
              placeholder="example.com"
              value={str("website")}
              onChange={(e) => set("website", e.target.value)}
              error={errors.website}
            />
            <SelectField
              name="businessType"
              label="Business type"
              required
              value={str("businessType")}
              onChange={(e) => set("businessType", e.target.value)}
              options={opts(BUSINESS_TYPES)}
              error={errors.businessType}
            />
            <TextField
              name="territory"
              label="Territory you serve"
              placeholder="e.g. FL, GA, SC"
              value={str("territory")}
              onChange={(e) => set("territory", e.target.value)}
              error={errors.territory}
            />
            <TextField
              name="firstOrder"
              label="Estimated first order"
              placeholder="e.g. 40 cases"
              value={str("firstOrder")}
              onChange={(e) => set("firstOrder", e.target.value)}
              error={errors.firstOrder}
            />
            <TextField
              name="monthlyVolume"
              label="Monthly volume"
              placeholder="e.g. 120–150 cases"
              value={str("monthlyVolume")}
              onChange={(e) => set("monthlyVolume", e.target.value)}
              error={errors.monthlyVolume}
            />
            <TextField
              name="startDate"
              label="Target start"
              placeholder="e.g. Q4 2026"
              value={str("startDate")}
              onChange={(e) => set("startDate", e.target.value)}
              error={errors.startDate}
            />
            <ChipGroup
              className="sm:col-span-2"
              label="Formats of interest"
              options={SIZE_OPTS}
              selected={arr("formats")}
              onToggle={(x) => toggle("formats", x)}
            />
            <CheckField
              className="sm:col-span-2"
              name="sampleRequest"
              label="Please send samples"
              checked={bool("sampleRequest")}
              onChange={(x) => set("sampleRequest", x)}
            />
          </>
        ) : null}

        {buyerType === "retail" ? (
          <>
            <TextField
              name="retailer"
              label="Retailer"
              required
              value={str("retailer")}
              onChange={(e) => set("retailer", e.target.value)}
              error={errors.retailer}
            />
            <TextField
              name="buyerRole"
              label="Your role"
              value={str("buyerRole")}
              onChange={(e) => set("buyerRole", e.target.value)}
              error={errors.buyerRole}
            />
            <TextField
              name="website"
              label="Website"
              placeholder="example.com"
              value={str("website")}
              onChange={(e) => set("website", e.target.value)}
              error={errors.website}
            />
            <SelectField
              name="storeType"
              label="Store type"
              required
              value={str("storeType")}
              onChange={(e) => set("storeType", e.target.value)}
              options={opts(STORE_TYPES)}
              error={errors.storeType}
            />
            <TextField
              name="storeCount"
              label="How many stores?"
              placeholder="e.g. 6"
              value={str("storeCount")}
              onChange={(e) => set("storeCount", e.target.value)}
              error={errors.storeCount}
            />
            <TextField
              name="locations"
              label="Where?"
              placeholder="e.g. Brooklyn, Queens"
              value={str("locations")}
              onChange={(e) => set("locations", e.target.value)}
              error={errors.locations}
            />
            <TextField
              name="launchWindow"
              label="Launch window"
              placeholder="e.g. October reset"
              value={str("launchWindow")}
              onChange={(e) => set("launchWindow", e.target.value)}
              error={errors.launchWindow}
            />
            <TextField
              name="openingOrder"
              label="Estimated opening order"
              placeholder="e.g. 12 cases per store"
              value={str("openingOrder")}
              onChange={(e) => set("openingOrder", e.target.value)}
              error={errors.openingOrder}
            />
            <ChipGroup
              className="sm:col-span-2"
              label="SKUs you'd shelve"
              options={SIZE_OPTS}
              selected={arr("skus")}
              onToggle={(x) => toggle("skus", x)}
            />
            <CheckField
              className="sm:col-span-2"
              name="packetRequest"
              label="Please send a sample and buyer packet"
              checked={bool("packetRequest")}
              onChange={(x) => set("packetRequest", x)}
            />
          </>
        ) : null}

        {buyerType === "other" ? (
          <>
            <TextField
              name="organisation"
              label="Organisation"
              value={str("organisation")}
              onChange={(e) => set("organisation", e.target.value)}
              error={errors.organisation}
            />
            <TextField
              name="partnershipType"
              label="What kind of partnership?"
              placeholder="e.g. chef collaboration, event"
              value={str("partnershipType")}
              onChange={(e) => set("partnershipType", e.target.value)}
              error={errors.partnershipType}
            />
          </>
        ) : null}

        {buyerType === "feedback" ? (
          <>
            <SelectField
              name="rating"
              label="How was it?"
              value={str("rating")}
              onChange={(e) => set("rating", e.target.value)}
              options={[
                { value: "", label: "Select…" },
                { value: "5", label: "★★★★★" },
                { value: "4", label: "★★★★" },
                { value: "3", label: "★★★" },
                { value: "2", label: "★★" },
                { value: "1", label: "★" },
              ]}
            />
            <TextField
              name="purchasedAt"
              label="Where did you get it?"
              placeholder="e.g. a festival, a friend"
              value={str("purchasedAt")}
              onChange={(e) => set("purchasedAt", e.target.value)}
            />
          </>
        ) : null}
      </div>

      {/* 3 — always */}
      <div className="mt-12 grid gap-6 border-t border-cream-line pt-12 sm:grid-cols-2">
        <TextField
          name="name"
          label="Your name"
          required
          autoComplete="name"
          value={str("name")}
          onChange={(e) => set("name", e.target.value)}
          error={errors.name}
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          value={str("email")}
          onChange={(e) => set("email", e.target.value)}
          error={errors.email}
        />
        <TextField
          name="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          value={str("phone")}
          onChange={(e) => set("phone", e.target.value)}
          error={errors.phone}
        />
        <TextField
          name="region"
          label={buyerType === "consumer" ? "City / state" : "Region you serve"}
          value={str("region")}
          onChange={(e) => set("region", e.target.value)}
          error={errors.region}
        />
        <SelectField
          name="preferredContact"
          label="Best way to reach you"
          value={str("preferredContact")}
          onChange={(e) => set("preferredContact", e.target.value)}
          options={opts(CONTACT_METHODS)}
          error={errors.preferredContact}
        />
        <TextArea
          className="sm:col-span-2"
          name="message"
          label="Tell us what you need"
          required
          hint="The more specific you are, the faster we can give you a real answer."
          value={str("message")}
          onChange={(e) => set("message", e.target.value)}
          error={errors.message}
        />
        <CheckField
          className="sm:col-span-2"
          name="consent"
          label="I agree to be contacted about this inquiry. No newsletter, no account."
          checked={bool("consent")}
          onChange={(x) => set("consent", x)}
          error={errors.consent}
        />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <ButtonEl type="submit" size="lg" disabled={busy}>
          {busy ? "Sending…" : "Submit inquiry"}
        </ButtonEl>
        <p className="text-sm text-on-cream-muted">
          Or email{" "}
          <a
            href="mailto:info@sunnyislandpepper.com"
            className="text-ember underline underline-offset-4"
          >
            info@sunnyislandpepper.com
          </a>
        </p>
      </div>
      <p aria-live="polite" className="sr-only">
        {busy ? "Sending your inquiry" : ""}
      </p>
    </form>
  );
}
