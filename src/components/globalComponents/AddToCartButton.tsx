"use client";

import { useState } from "react";

// Adjust to your local helpers if needed
import { getCartId, setCartId } from "@/app/api/lib/useCart";

interface AddToCartButtonProps {
  variantId: string;
  quantity: number;
}

export default function AddToCartButton({
  variantId,
  quantity,
}: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleAddToCart() {
    setLoading(true);

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variantId,
          quantity,
          cartId: getCartId(),
        }),
      });

      if (!res.ok) {
        console.error("Add to cart failed, status:", res.status);
        alert("Error adding product to cart");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setLoading(false);

      if (data && data.id) {
        setCartId(data.id);
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        alert("Error adding product to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Error adding product to cart");
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white font-semibold uppercase"
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}
