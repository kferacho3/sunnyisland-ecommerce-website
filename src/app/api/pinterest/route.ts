// File: src/app/api/pinterest/route.ts
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  // Check that a non-empty query parameter is provided
  if (!query || query.trim() === "") {
    return new Response(
      JSON.stringify({ error: "Query parameter is missing" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Ensure the Pinterest access token is available
  const PINTEREST_ACCESS_TOKEN = process.env.NEXT_PUBLIC_PINTEREST_ACCESS_TOKEN;
  if (!PINTEREST_ACCESS_TOKEN) {
    return new Response(
      JSON.stringify({ error: "Pinterest access token not configured" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Build the Pinterest API URL with the encoded query parameter
  const url = `https://api.pinterest.com/v5/search/pins?query=${encodeURIComponent(query)}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${PINTEREST_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  // Optionally, you can log the error from Pinterest if needed:
  // if (!response.ok) console.error("Pinterest API error", data);

  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
