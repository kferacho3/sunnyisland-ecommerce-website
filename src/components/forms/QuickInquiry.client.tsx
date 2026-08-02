"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * The hero's fast lane.
 *
 * Three fields on one line, posting to the same validated endpoint as the
 * full form. It exists because a visitor who already knows what they want
 * should not have to reach the bottom of the page to say so — but it is
 * deliberately minimal, so anyone with a real brief still gets routed to the
 * adaptive form where the right questions get asked.
 *
 * Consent is stated inline at the point of submission rather than collected
 * as a checkbox: the notice sits directly under the button, in the same
 * visual group as the action it describes.
 */
export function QuickInquiry({ className }: { className?: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [need, setNeed] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const mountedAt = useRef(Date.now());
  const key = useRef("");
  useEffect(() => {
    key.current = crypto.randomUUID();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerType: "consumer",
          name,
          email,
          message: need,
          consent: true,
          sizes: ["unsure"],
          fulfilment: "unsure",
          recurring: false,
          preferredContact: "email",
          source: "hero-quick",
          landingPage: "/",
          company_website: hp,
          elapsedMs: Date.now() - mountedAt.current,
          idempotencyKey: key.current,
        }),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        router.push(
          `/inquire/thank-you?ref=${encodeURIComponent(data.reference)}&buyer=consumer`,
        );
        return;
      }
      setStatus("error");
      setError(
        data.fieldErrors
          ? (Object.values(data.fieldErrors)[0] as string)
          : (data.error ?? "Something went wrong."),
      );
    } catch {
      setStatus("error");
      setError("We couldn't reach the server. Please try again.");
    }
  }

  const busy = status === "sending";
  const field =
    "min-h-[3rem] w-full border border-on-ink/25 bg-ink/60 px-4 font-body text-[0.9375rem] " +
    "text-on-ink backdrop-blur-sm transition-colors duration-fast ease-si " +
    "placeholder:text-on-ink-muted focus:border-gold focus:outline-none";

  return (
    <form onSubmit={onSubmit} className={cn("w-full max-w-[46rem]", className)}>
      {/* Honeypot — off-screen, never display:none. */}
      <div
        aria-hidden
        className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
      >
        <label htmlFor="quick_company_website">Company website</label>
        <input
          id="quick_company_website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
        />
      </div>

      <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
        <label className="sr-only" htmlFor="quick-name">
          Your name
        </label>
        <input
          id="quick-name"
          className={field}
          placeholder="Your name"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="sr-only" htmlFor="quick-email">
          Email
        </label>
        <input
          id="quick-email"
          type="email"
          className={field}
          placeholder="Email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          disabled={busy}
          className={cn(
            "min-h-[3rem] whitespace-nowrap border border-gold bg-gold px-7 font-body text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink",
            "transition-colors duration-fast ease-si hover:bg-transparent hover:text-gold",
            "disabled:pointer-events-none disabled:opacity-60",
          )}
        >
          {busy ? "Sending…" : "Inquire"}
        </button>
      </div>

      <label className="sr-only" htmlFor="quick-need">
        What do you need?
      </label>
      <input
        id="quick-need"
        className={cn(field, "mt-2")}
        placeholder="What do you need? (a few bottles, a case, a shelf…)"
        required
        value={need}
        onChange={(e) => setNeed(e.target.value)}
      />

      <p className="mt-3 font-body text-xs text-on-ink-muted">
        {error ? (
          <span role="alert" className="font-semibold text-gold">
            {error}
          </span>
        ) : (
          <>
            Submitting means we may contact you about this inquiry. No account,
            no newsletter.{" "}
            <a
              href="/inquire"
              className="border-b border-current text-on-ink transition-colors duration-fast ease-si hover:text-gold"
            >
              Buying wholesale or for retail?
            </a>
          </>
        )}
      </p>
    </form>
  );
}
