// File: src/app/api/pinterest/route.ts
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  // Use the public access token from your environment
  const PINTEREST_ACCESS_TOKEN = process.env.NEXT_PUBLIC_PINTEREST_ACCESS_TOKEN;
  const url = `https://api.pinterest.com/v5/search/pins?query=${encodeURIComponent(query)}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${PINTEREST_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
