import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Supply a base URL to ensure req.url parses correctly.
  const { searchParams } = new URL(req.url, "http://localhost");
  const query = searchParams.get("query");
  if (!query) {
    return NextResponse.json(
      { error: "Missing query parameter" },
      { status: 400 },
    );
  }

  const serpApiKey = process.env.SERPAPI_API_KEY;
  if (!serpApiKey) {
    return NextResponse.json(
      { error: "SerpAPI API key not configured" },
      { status: 500 },
    );
  }

  const endpoint = "https://serpapi.com/search.json"; // Using the JSON endpoint.
  const url = new URL(endpoint);
  url.searchParams.set("engine", "google_events");
  url.searchParams.set("q", query);
  url.searchParams.set("hl", "en"); // Language: English
  url.searchParams.set("gl", "us"); // Country: US
  url.searchParams.set("api_key", serpApiKey);

  const res = await fetch(url.toString());
  const data = await res.json();
  return NextResponse.json(data);
}
