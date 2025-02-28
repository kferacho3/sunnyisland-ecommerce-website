// src/app/api/eventbrite/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Use a base URL so that req.url is parsed as an absolute URL.
  const { searchParams } = new URL(req.url, "http://localhost");
  const query = searchParams.get("query");
  if (!query) {
    return NextResponse.json(
      { error: "Missing query parameter" },
      { status: 400 },
    );
  }

  const eventbriteApiKey = process.env.EVENTBRITE_API_KEY;
  if (!eventbriteApiKey) {
    return NextResponse.json(
      { error: "Eventbrite API key not configured" },
      { status: 500 },
    );
  }

  // Build the Eventbrite API URL.
  const endpoint = "https://www.eventbriteapi.com/v3/events/search/";
  const url = new URL(endpoint);
  url.searchParams.set("q", query);
  url.searchParams.set("expand", "venue"); // Request venue details

  // Call Eventbrite using Bearer token authentication.
  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${eventbriteApiKey}`,
    },
    cache: "no-store",
  });

  const data = await res.json();
  return NextResponse.json(data);
}
