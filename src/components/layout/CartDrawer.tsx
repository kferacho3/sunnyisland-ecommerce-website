"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

export default function CartDrawer({
  isOpen,
  closeDrawer,
}: {
  isOpen: boolean;
  closeDrawer: () => void;
}) {
  const [cart, setCart] = useState<any>(null);

  // Fetch cart from localStorage cartId
  const fetchCart = async () => {
    const cartId = localStorage.getItem("shopify_cart_id");
    if (cartId) {
      try {
        const res = await fetch(`/api/cart/fetch?cartId=${cartId}`);
        if (!res.ok) {
          console.error("Failed to fetch cart, status:", res.status);
          return;
        }
        const data = await res.json();
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }
  };

  useEffect(() => {
    fetchCart();
    window.addEventListener("cartUpdated", fetchCart);

    return () => {
      window.removeEventListener("cartUpdated", fetchCart);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-80 bg-black text-white shadow-lg transform transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-50`}
    >
      <div className="p-4 flex justify-between items-center">
        <h3 className="font-semibold">Your Cart</h3>
        <button onClick={closeDrawer}>
          <FiX size={24} />
        </button>
      </div>
      <hr />
      <div className="p-4 overflow-y-auto h-full">
        {cart && cart.lines && cart.lines.edges.length > 0 ? (
          cart.lines.edges.map(({ node }: any) => (
            <div key={node.id} className="flex gap-2 mb-4">
              {node.merchandise?.image?.url && (
                <Image
                  src={node.merchandise.image.url}
                  alt={node.merchandise.product.title}
                  width={50}
                  height={50}
                />
              )}
              <div>
                <p>{node.merchandise.product.title}</p>
                <p>
                  {node.merchandise.title} x {node.quantity}
                </p>
                <p>
                  {node.merchandise.price.amount}{" "}
                  {node.merchandise.price.currencyCode}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}

        {/* Checkout Button */}
        {cart && cart.checkoutUrl && (
          <a
            href={cart.checkoutUrl}
            className="block text-center bg-orange-500 py-2 mt-4"
          >
            Checkout
          </a>
        )}
      </div>
    </div>
  );
}
