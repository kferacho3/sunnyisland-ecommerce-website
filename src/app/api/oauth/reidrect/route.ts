// src/app/api/oauth/eventbrite/redirect/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url, "http://localhost");
  const code = searchParams.get("code");
  if (!code) {
    return NextResponse.json(
      { error: "Missing code parameter" },
      { status: 400 },
    );
  }

  const clientId = process.env.EVENTBRITE_CLIENT_ID; // e.g., SAEG3SPQ726TD5C2ZU
  const clientSecret = process.env.EVENTBRITE_CLIENT_SECRET; // e.g., AEN7W47HLAG7PPV2RPPNHSEUR2XV3DICDWXYXU3G57HUYI6JBF
  const redirectUri = process.env.NEXT_PUBLIC_EVENTBRITE_REDIRECT_URI; // Must match one registered in Eventbrite

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      { error: "Missing Eventbrite OAuth configuration" },
      { status: 500 },
    );
  }

  const tokenEndpoint = "https://www.eventbrite.com/oauth/token";
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
  });

  const res = await fetch(tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
