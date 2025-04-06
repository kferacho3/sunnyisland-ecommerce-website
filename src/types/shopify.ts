// types/shopify.ts

export interface CartLineNode {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
    };
    price: {
      amount: number;
      currencyCode: string;
    };
    image: {
      url: string;
    };
  };
}

export interface CartLines {
  edges: {
    node: CartLineNode;
  }[];
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  lines?: CartLines;
}

export interface CartLinesAddResponse {
  cartLinesAdd: {
    cart: Cart;
  };
}

export interface CartCreateResponse {
  cartCreate: {
    cart: Cart;
  };
}

export interface GetCartResponse {
  cart: Cart;
}
