// src/app/api/shopify/product/route.ts
import { shopifyClient } from "@/lib/shopify";
import { gql } from "graphql-request";
import { NextResponse } from "next/server";

const PRODUCT_QUERY = gql`
  query getProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export async function GET(request: Request) {
  // Optional: parse the handle from search params if you want multiple products
  const { searchParams } = new URL(request.url);
  const handle =
    searchParams.get("handle") || "sunny-island-pepper-sauce-classic-gold";

  try {
    const data = await shopifyClient.request(PRODUCT_QUERY, { handle });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 },
    );
  }
}
