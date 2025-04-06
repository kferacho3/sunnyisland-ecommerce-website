"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiEye, FiShoppingCart } from "react-icons/fi";

export default function ShopSection() {
  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          "/api/shopify/product?handle=sunny-island-pepper-sauce-classic-gold",
        );
        const data = await res.json();
        const fetchedProduct = data.productByHandle;
        setProduct(fetchedProduct);
        if (fetchedProduct?.variants.edges.length > 0) {
          setSelectedVariant(fetchedProduct.variants.edges[0].node.id);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    fetchProduct();
  }, []);

  if (!product) return <div>Loading product...</div>;

  const variant = product.variants.edges.find(
    (v: any) => v.node.id === selectedVariant,
  )?.node;
  const isAvailable = variant?.availableForSale !== false;

  return (
    <section className="w-full bg-black bg-opacity-70 text-white mb-5 mt-[-50px] sm:mt-[-40px] py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* For mobile, reverse the order so that image appears first */}
        {/* Right Section (Image) becomes order-1 on mobile and order-2 on large screens */}
        <div className="relative w-auto h-96 order-1 lg:order-2">
          {product.images.edges[0]?.node.url && (
            <Image
              src={product.images.edges[0].node.url}
              alt={product.images.edges[0].node.altText || product.title}
              fill
              className="object-contain rounded shadow-lg"
            />
          )}
        </div>
        {/* Left Section (Details) becomes order-2 on mobile and order-1 on large screens */}
        <div className="space-y-4 order-2 lg:order-1">
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest">
            {product.title}
          </h2>
          <p className="text-sm md:text-base text-gray-300">
            {product.description}
          </p>

          <div>
            <label className="block text-gray-200 text-sm font-semibold">
              Choose Variant:
            </label>
            <select
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded mt-1"
            >
              {product.variants.edges.map(({ node }: any) => (
                <option key={node.id} value={node.id}>
                  {node.title} - {node.price.amount} {node.price.currencyCode}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-200 text-sm font-semibold">
              Quantity:
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              min="1"
              className="bg-gray-800 text-white p-2 rounded mt-1 w-24"
            />
          </div>
          {variant && (
            <p className="text-orange-200">
              {variant.price.amount} {variant.price.currencyCode}{" "}
              {!isAvailable && (
                <span className="text-red-500 ml-2">(Pre-order)</span>
              )}
            </p>
          )}

          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="https://sunnyislandpepper.myshopify.com/products/sunny-island-pepper-sauce-classic-gold"
              className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              <FiShoppingCart className="mr-2" />
              BUY PRODUCT NOW
            </Link>
            <Link
              href="https://sunnyislandpepper.myshopify.com/"
              className="flex items-center justify-center bg-secondary hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              <FiEye className="mr-2" />
              VIEW PRODUCTS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
