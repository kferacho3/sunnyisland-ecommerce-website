import { shopifyClient } from "@/lib/shopify";
import { gql } from "graphql-request";
import { NextRequest, NextResponse } from "next/server";

const CUSTOMER_ACCESS_TOKEN_CREATE = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  try {
    const res = await shopifyClient.request(CUSTOMER_ACCESS_TOKEN_CREATE, {
      input: { email, password },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.error("customerAccessTokenCreate error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
