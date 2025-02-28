import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
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

  const endpoint = "https://serpapi.com/search";
  const url = new URL(endpoint);
  url.searchParams.set("engine", "google_images");
  url.searchParams.set("q", query);
  url.searchParams.set("api_key", serpApiKey);
  // You can add additional parameters (location, gl, hl, etc.) if needed

  const res = await fetch(url.toString());
  const data = await res.json();
  return NextResponse.json(data);
}
