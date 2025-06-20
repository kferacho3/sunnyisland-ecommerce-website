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

export default function ShopSection() {
  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

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
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <GiChiliPepper className="text-6xl text-orange-500" />
          </motion.div>
          <p className="text-white text-lg">Loading product...</p>
        </div>
      </section>
    );
  }

  if (!product) return null;

  const variant = product.variants.edges.find(
    (v: any) => v.node.id === selectedVariant,
  )?.node;
  const isAvailable = variant?.availableForSale !== false;

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16"
        >
          {/* Product Images - Mobile First */}
          <div className="order-1 lg:order-2 space-y-4">
            {/* Main Image */}
            <motion.div
              className="relative w-full aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {product.images.edges[selectedImage]?.node.url && (
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={product.images.edges[selectedImage].node.url}
                      alt={
                        product.images.edges[selectedImage].node.altText ||
                        product.title
                      }
                      fill
                      className="object-contain p-8"
                      priority
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Floating Badge */}
              {!isAvailable && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                >
                  Pre-order
                </motion.div>
              )}
            </motion.div>

            {/* Thumbnail Gallery */}
            {product.images.edges.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.edges.map((image: any, index: number) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`
                      relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all
                      ${
                        selectedImage === index
                          ? "border-orange-500 shadow-lg"
                          : "border-gray-200 dark:border-gray-700"
                      }
                    `}
                  >
                    <Image
                      src={image.node.url}
                      alt={`Product image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details - Mobile First */}
          <div className="order-2 lg:order-1 space-y-6">
            {/* Title and Description */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              >
                {product.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                {product.description}
              </motion.p>
            </div>

            {/* Price */}
            {variant && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-baseline gap-4"
              >
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  ${variant.price.amount}
                </span>
                <span className="text-lg text-gray-500">
                  {variant.price.currencyCode}
                </span>
              </motion.div>
            )}

            {/* Variant Selector */}
            {product.variants.edges.length > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Select Variant
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.variants.edges.map(({ node }: any) => (
                    <motion.button
                      key={node.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedVariant(node.id)}
                      className={`
                        p-3 rounded-lg border-2 font-medium transition-all
                        ${
                          selectedVariant === node.id
                            ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }
                      `}
                    >
                      <div className="text-sm">{node.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        ${node.price.amount}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Quantity Selector */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleQuantityChange("decrease")}
                    className="p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <FiMinus />
                  </motion.button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value, 10)))
                    }
                    className="w-16 text-center bg-transparent text-gray-900 dark:text-white font-semibold focus:outline-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleQuantityChange("increase")}
                    className="p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <FiPlus />
                  </motion.button>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {isAvailable ? "In Stock" : "Pre-order Available"}
                </span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-3"
            >
              <Link href="https://sunnyislandpepper.myshopify.com/products/sunny-island-pepper-sauce-classic-gold">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <FiShoppingBag className="text-xl" />
                  <span>Buy Now - ${variant?.price.amount}</span>
                </motion.button>
              </Link>

              <Link href="https://sunnyislandpepper.myshopify.com/">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gray-900 dark:bg-gray-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  View All Products
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
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
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
