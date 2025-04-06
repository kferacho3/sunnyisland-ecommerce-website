// src/app/api/cart/fetch/route.ts
import { shopifyClient } from "@/lib/shopify";
import { GetCartResponse } from "@/types/shopify";
import { gql } from "graphql-request";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cartId = request.nextUrl.searchParams.get("cartId");
  if (!cartId) {
    return NextResponse.json({ error: "Missing cartId" }, { status: 400 });
  }

  const query = gql`
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                  }
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyClient.request<GetCartResponse>(query, {
      cartId,
    });
    return NextResponse.json(data.cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 },
    );
  }
}
