/* --------------------------------------------------------------------------
   src/components/shop/ShopSection.tsx
--------------------------------------------------------------------------- */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiCheck,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";
import { GiChiliPepper } from "react-icons/gi";

/* ---------------------------------------------------------------------------
   Component
--------------------------------------------------------------------------- */
export default function ShopSection() {
  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  /* -----------------------------------------------------------------------
     Fetch Shopify product
  ----------------------------------------------------------------------- */
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          "/api/shopify/product?handle=sunny-island-pepper-sauce-classic-gold",
        );
        const data = await res.json();
        const fetched = data.productByHandle;
        setProduct(fetched);

        // Pre-select first variant if it exists
        if (fetched?.variants.edges.length > 0) {
          setSelectedVariant(fetched.variants.edges[0].node.id);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, []);

  /* -----------------------------------------------------------------------
     Render loading state
  ----------------------------------------------------------------------- */
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <motion.div
          aria-label="Loading product"
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <GiChiliPepper className="text-6xl text-orange-500 animate-pulse" />
          <p className="text-white text-lg tracking-wide">Loading product…</p>
        </motion.div>
      </section>
    );
  }

  /* -----------------------------------------------------------------------
     Early exit if product not found
  ----------------------------------------------------------------------- */
  if (!product) return null;

  /* -----------------------------------------------------------------------
     Helpers
  ----------------------------------------------------------------------- */
  const variant = product.variants.edges.find(
    (v: any) => v.node.id === selectedVariant,
  )?.node;

  const isAvailable = variant?.availableForSale !== false;

  const handleQty = (action: "add" | "sub") => {
    setQuantity((q) => Math.max(1, q + (action === "add" ? 1 : -1)));
  };

  /* -----------------------------------------------------------------------
     JSX
  ----------------------------------------------------------------------- */
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
        >
          {/* --------------------------------------------------------------
             IMAGE COLUMN (mobile-first order)
          -------------------------------------------------------------- */}
          <div className="order-1 lg:order-2 flex flex-col gap-4">
            {/* Main image */}
            <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl">
              <AnimatePresence mode="wait">
                {product.images.edges[selectedImage]?.node.url && (
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={product.images.edges[selectedImage].node.url}
                      alt={
                        product.images.edges[selectedImage].node.altText ||
                        product.title
                      }
                      fill
                      className="object-contain p-8 select-none"
                      priority
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pre-order badge */}
              {!isAvailable && (
                <motion.span
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.35, delay: 0.2 }}
                  className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1.5 text-xs font-semibold tracking-wide shadow-md"
                >
                  PRE-ORDER
                </motion.span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.edges.length > 1 && (
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {product.images.edges.map((img: any, idx: number) => (
                  <motion.button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    whileTap={{ scale: 0.96 }}
                    className={`relative w-20 h-20 flex-shrink-0 overflow-hidden border-2 transition-colors
                      ${
                        selectedImage === idx
                          ? "border-orange-500 shadow-lg"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                  >
                    <Image
                      src={img.node.url}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* --------------------------------------------------------------
             DETAILS COLUMN
          -------------------------------------------------------------- */}
          <div className="order-2 lg:order-1 flex flex-col gap-8">
            {/* Title & description */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                {product.title}
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-prose leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            {variant && (
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  ${variant.price.amount}
                </span>
                <span className="text-base text-gray-500 dark:text-gray-400">
                  {variant.price.currencyCode}
                </span>
              </div>
            )}

            {/* Variant selector */}
            {product.variants.edges.length > 1 && (
              <div>
                <label className="block mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Choose Variant
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {product.variants.edges.map(({ node }: any) => (
                    <motion.button
                      key={node.id}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedVariant(node.id)}
                      className={`border-2 px-4 py-3 text-left transition-colors
                        ${
                          selectedVariant === node.id
                            ? "border-orange-500 bg-orange-50 dark:bg-orange-900/25 text-orange-600 dark:text-orange-300"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                    >
                      <div className="text-sm font-medium">{node.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        ${node.price.amount}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity selector */}
            <div>
              <label className="block mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-100 dark:bg-gray-800">
                  <button
                    onClick={() => handleQty("sub")}
                    className="p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <FiMinus />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value, 10)))
                    }
                    className="w-14 text-center bg-transparent text-gray-900 dark:text-white font-semibold focus:outline-none"
                  />
                  <button
                    onClick={() => handleQty("add")}
                    className="p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <FiPlus />
                  </button>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {isAvailable ? "In Stock" : "Pre-order Available"}
                </span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="space-y-3">
              <Link href="https://sunnyislandpepper.myshopify.com/products/sunny-island-pepper-sauce-classic-gold">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
                >
                  <FiShoppingBag className="text-xl" />
                  <span>Buy Now – ${variant?.price.amount}</span>
                </motion.button>
              </Link>

              <Link href="https://sunnyislandpepper.myshopify.com/">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 bg-gray-900 dark:bg-gray-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  View All Products
                </motion.button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <FiTruck className="text-2xl text-green-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Free Shipping
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    On orders over $50
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiCheck className="text-2xl text-green-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Quality Guarantee
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    100% satisfaction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
