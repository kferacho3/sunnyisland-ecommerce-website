"use client";

import { useState } from "react";

interface BuyNowButtonProps {
  variantId: string;
  quantity: number;
}

export default function BuyNowButton({
  variantId,
  quantity,
}: BuyNowButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleBuyNow() {
    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variantId,
          quantity,
          cartId: null, // always create a fresh cart for immediate checkout
        }),
      });

      if (!res.ok) {
        console.error("Buy Now error, status:", res.status);
        alert("Error creating checkout.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setLoading(false);

      if (data && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert("Error creating checkout.");
      }
    } catch (error) {
      console.error("Buy Now exception:", error);
      setLoading(false);
      alert("Error creating checkout.");
    }
  }

  return (
    <button
      onClick={handleBuyNow}
      disabled={loading}
      className="px-6 py-3 bg-green-500 text-white rounded font-semibold uppercase"
    >
      {loading ? "Processing..." : "Buy Now"}
    </button>
  );
}
