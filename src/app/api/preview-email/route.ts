import { render } from "@react-email/render";
import { NextResponse } from "next/server";

import { CustomerAckEmail } from "@/emails/CustomerAckEmail";
import type { Inquiry } from "@/lib/inquiries/schema";

// Dev-only preview. Removed before commit.
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "not available" }, { status: 404 });
  }
  const inquiry = {
    buyerType: "retail",
    name: "Kamal Feracho",
    email: "kferacho64@gmail.com",
    preferredContact: "email",
    message:
      "Branded email test — checking the flame mark, the ember band across the masthead, and the wreath ornament above the wellness message. All three should render from sunnyislandpepper.com.",
    consent: true,
    retailer: "Islands Grocery Co.",
    storeType: "caribbean-market",
    skus: [],
    packetRequest: true,
    company_website: "",
  } as unknown as Inquiry;

  const html = await render(
    CustomerAckEmail({
      inquiry,
      reference: "SI-2026-37SH00",
      replyTo: "info@sunnyislandpepper.com",
    }),
  );
  return new NextResponse(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
