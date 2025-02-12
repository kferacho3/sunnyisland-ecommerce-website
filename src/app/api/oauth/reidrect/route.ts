// src/app/api/oauth/reidrect/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Missing authorization code" },
      { status: 400 },
    );
  }

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", process.env.EVENTBRITE_CLIENT_ID!);
  params.append("client_secret", process.env.EVENTBRITE_CLIENT_SECRET!);
  params.append("code", code);
  params.append("redirect_uri", process.env.EVENTBRITE_REDIRECT_URI!);

  const tokenRes = await fetch("https://www.eventbrite.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!tokenRes.ok) {
    const errorText = await tokenRes.text();
    console.error("❌ Token exchange failed:", errorText);
    return NextResponse.json(
      { error: "Token exchange failed", details: errorText },
      { status: 500 },
    );
  }

  const tokenData = await tokenRes.json();
  return NextResponse.json({ access_token: tokenData.access_token });
}
