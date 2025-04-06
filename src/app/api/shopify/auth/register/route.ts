import { shopifyClient } from "@/lib/shopify";
import { gql } from "graphql-request";
import { NextRequest, NextResponse } from "next/server";

const CUSTOMER_CREATE = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
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
  const { firstName, lastName, email, password } = body;

  try {
    const res = await shopifyClient.request(CUSTOMER_CREATE, {
      input: {
        firstName,
        lastName,
        email,
        password,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.error("customerCreate error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
