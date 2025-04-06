"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowRight, FiEye, FiShoppingCart } from "react-icons/fi";
import { GiChiliPepper } from "react-icons/gi";

export default function SectionProductSneak() {
  // State for product data, selected variant, and quantity
  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Client-side data fetch
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          "/api/shopify/product?handle=sunny-island-pepper-sauce-classic-gold",
        );
        if (!res.ok) {
          throw new Error("Error fetching product data");
        }
        const data = await res.json();
        const fetchedProduct = data.productByHandle;
        setProduct(fetchedProduct);
        if (fetchedProduct?.variants.edges.length > 0) {
          setSelectedVariant(fetchedProduct.variants.edges[0].node.id);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    }
    fetchProduct();
  }, []);

  if (!product) {
    return (
      <div className="p-4 text-center">
        <p>Loading product...</p>
      </div>
    );
  }

  // Identify the currently selected variant
  const variant = product.variants.edges.find(
    (v: any) => v.node.id === selectedVariant,
  )?.node;
  const isAvailable = variant?.availableForSale !== false;

  // Handlers
  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVariant(e.target.value);
  };
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  return (
    <>
      {/* SEO Head (optional) */}
      <Head>
        <title>{product.title} | Sunny Island Pepper Sauce</title>
        <meta
          name="description"
          content={`Check out our ${product.title}. Perfect for those who love a spicy kick!`}
        />
      </Head>

      {/* Main Section with equal top/bottom spacing */}
      <section className="flex flex-col items-center justify-center px-4 py-6 bg-white dark:bg-black dark:text-white">
        {/* Header text (made larger) */}
        <h1 className="text-center text-2xl font-semibold mb-6 tracking-wide">
          GET LOST IN THE SAUCE, TASTE THE SPICE!
        </h1>

        {/* Container */}
        <div className="w-full max-w-5xl mx-auto border-2 border-gray-200 dark:border-gray-700 shadow-sm rounded-sm p-4 md:p-5 flex flex-col md:flex-row gap-4">
          {/* Product Image */}
          <div className="flex-1 flex items-center justify-center">
            {product.images.edges[0]?.node.url && (
              <Image
                src={product.images.edges[0].node.url}
                alt={product.title}
                width={300}
                height={300}
                className="object-contain"
                priority
              />
            )}
          </div>

          {/* Vertical Divider (desktop only) */}
          <div className="hidden md:block w-[0.5px] bg-gradient-to-b from-red-600 via-yellow-400 to-yellow-500" />

          {/* Product Details */}
          <div className="flex-1 flex flex-col">
            {/* Title */}
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>

            {/* Price & Availability */}
            {variant && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">
                {variant.price.amount} {variant.price.currencyCode}
                {!isAvailable && (
                  <span className="text-red-500 ml-2">(Pre-order)</span>
                )}
              </p>
            )}

            {/* Variant selection */}
            <label className="block text-sm font-medium mb-1">
              Select Variant:
            </label>
            <select
              value={selectedVariant}
              onChange={handleVariantChange}
              className="mb-4 p-2 border border-gray-300 dark:border-gray-600 rounded-sm text-gray-900"
            >
              {product.variants.edges.map(({ node }: any) => (
                <option key={node.id} value={node.id}>
                  {node.title} - {node.price.amount} {node.price.currencyCode}
                </option>
              ))}
            </select>

            {/* Quantity selection */}
            <label className="block text-sm font-medium mb-1">
              Select Quantity:
            </label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="mb-4 p-2 border border-gray-300 dark:border-gray-600 rounded-sm text-gray-900 w-24"
            />

            {/* Buttons Row (icons at the end + reduced padding) */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Link
                href="https://sunnyislandpepper.myshopify.com/products/sunny-island-pepper-sauce-classic-gold"
                className="inline-flex items-center justify-center whitespace-nowrap bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-2 rounded-sm transition-colors text-sm"
              >
                BUY PRODUCT NOW
                <FiShoppingCart className="ml-1" />
              </Link>

              <Link
                href="https://sunnyislandpepper.myshopify.com/products/sunny-island-pepper-sauce-classic-gold"
                className="inline-flex items-center justify-center whitespace-nowrap bg-primary hover:bg-primary-light text-white font-medium py-1 px-2 rounded-sm transition-colors text-sm"
              >
                VIEW PRODUCTS
                <FiEye className="ml-1" />
              </Link>

              <Link
                href="/shop"
                className="inline-flex items-center justify-center whitespace-nowrap bg-secondary hover:bg-secondary-dark text-white font-medium py-1 px-2 rounded-sm transition-colors text-sm"
              >
                SAUCE INFO
                <GiChiliPepper className="ml-1" />
              </Link>
            </div>

            {/* Full Shop Link */}
            <Link
              href="https://sunnyislandpepper.myshopify.com/products/sunny-island-pepper-sauce-classic-gold"
              className="inline-block text-xs font-semibold text-blue-600 dark:text-blue-300 hover:underline mt-auto"
            >
              Visit Our Full Shop
              <FiArrowRight className="inline ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
