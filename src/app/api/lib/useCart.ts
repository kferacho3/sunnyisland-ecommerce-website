export const CART_ID_KEY = "shopify_cart_id";

export function getCartId(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(CART_ID_KEY);
  }
  return null;
}

export function setCartId(cartId: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_ID_KEY, cartId);
  }
}

export function clearCartId() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CART_ID_KEY);
  }
}
