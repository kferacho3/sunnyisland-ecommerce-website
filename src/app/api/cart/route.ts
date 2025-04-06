// src/app/api/cart/route.ts
import { shopifyClient } from "@/lib/shopify";
import { CartCreateResponse, CartLinesAddResponse } from "@/types/shopify";
import { gql } from "graphql-request";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { variantId, quantity, cartId } = await request.json();

  const mutation = gql`
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
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
    }
  `;

  const createCartMutation = gql`
    mutation createCart($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `;

  try {
    if (cartId) {
      const response = await shopifyClient.request<CartLinesAddResponse>(
        mutation,
        {
          cartId,
          lines: [{ quantity, merchandiseId: variantId }],
        },
      );
      return NextResponse.json(response.cartLinesAdd.cart);
    } else {
      const response = await shopifyClient.request<CartCreateResponse>(
        createCartMutation,
        {
          lines: [{ quantity, merchandiseId: variantId }],
        },
      );
      return NextResponse.json(response.cartCreate.cart);
    }
  } catch (error) {
    console.error("Shopify API error:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 },
    );
  }
}
