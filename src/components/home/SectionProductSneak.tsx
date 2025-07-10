"use client";

import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowRight, FiCheck, FiEye, FiShoppingCart } from "react-icons/fi";
import { GiChiliPepper } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi";

export default function SectionProductSneak() {
  // State for product data, selected variant, and quantity
  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

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
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, []);

  if (isLoading) {
    return (
      <section className="min-h-[600px] flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-orange-50 dark:from-black dark:via-gray-900 dark:to-gray-800">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <GiChiliPepper className="text-6xl text-orange-500" />
        </motion.div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="min-h-[600px] flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-orange-50 dark:from-black dark:via-gray-900 dark:to-gray-800">
        <p className="text-xl text-gray-300">Unable to load product</p>
      </section>
    );
  }

  // Identify the currently selected variant
  const variant = product.variants.edges.find(
    (v: any) => v.node.id === selectedVariant,
  )?.node;
  const isAvailable = variant?.availableForSale !== false;

  // Handlers
  const handleVariantChange = (variantId: string) => {
    setSelectedVariant(variantId);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <>
      {/* SEO Head */}
      <Head>
        <title>{product.title} | Sunny Island Pepper Sauce</title>
        <meta
          name="description"
          content={`Check out our ${product.title}. Perfect for those who love a spicy kick!`}
        />
      </Head>

      {/* Main Section - Changed from h-screen to min-h-[700px] with proper padding */}
      <section className="relative min-h-[700px] py-12 sm:py-16 lg:py-20 overflow-hidden">
        {/* Premium gradient background matching newsletter */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-orange-50 dark:from-black dark:via-gray-900 dark:to-gray-800" />

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6B6B' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Floating pepper icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-orange-400/20 dark:text-orange-600/20"
              initial={{
                x:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1000),
                y: -50,
                rotate: 0,
              }}
              animate={{
                y:
                  typeof window !== "undefined"
                    ? window.innerHeight + 50
                    : 1000,
                rotate: 360,
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 3,
                ease: "linear",
              }}
            >
              <GiChiliPepper className="text-3xl" />
            </motion.div>
          ))}
        </div>

        {/* Content Container - Removed h-full and adjusted padding */}
        <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-6xl">
            {" "}
            {/* Reduced from max-w-7xl */}
            {/* Compact Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6"
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent">
                GET LOST IN THE SAUCE
              </h1>
            </motion.div>
            {/* Product Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl blur-xl opacity-20" />

                <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* ----- PRODUCT IMAGE SECTION (hover-triggered only) ----- */}
                    <motion.div
                      className="relative bg-gradient-to-br from-orange-100/50 to-red-100/50 dark:from-gray-800/50 dark:to-gray-900/50 p-4 sm:p-6 lg:p-8 flex items-center justify-center will-change-transform"
                      initial="rest"
                      whileHover="hover"
                      variants={{
                        rest: {},
                        hover: {},
                      }}
                    >
                      {/* Decorative sparkle, rotates once on hover */}
                      <motion.div
                        className="absolute top-4 right-4 text-yellow-500/50 will-change-transform"
                        initial={{ rotate: 0 }}
                        variants={{ hover: { rotate: -360 } }}
                        transition={{
                          duration: 1,
                          ease: "easeInOut",
                          bounce: 0,
                        }}
                      >
                        <HiSparkles className="text-xl sm:text-2xl" />
                      </motion.div>

                      {/* Image container, scales up on hover */}
                      {product.images.edges[0]?.node.url && (
                        <motion.div
                          className="relative max-w-[200px] sm:max-w-[250px] lg:max-w-[280px] will-change-transform"
                          initial={{ scale: 1 }}
                          variants={{ hover: { scale: 1.05 } }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        >
                          <Image
                            src={product.images.edges[0].node.url}
                            alt={product.title}
                            width={280}
                            height={280}
                            className="object-contain w-full h-auto"
                            priority
                            onLoad={() => setImageLoaded(true)}
                          />
                          {imageLoaded && (
                            <motion.div
                              className="absolute -bottom-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full p-2 shadow-lg will-change-transform"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <GiChiliPepper className="text-lg sm:text-xl" />
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Product Details Section - More compact */}
                    <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
                      {/* Product Title */}
                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 text-gray-900 dark:text-white"
                      >
                        {product.title}
                      </motion.h2>

                      {/* Price */}
                      {variant && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                          className="mb-3"
                        >
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                              ${variant.price.amount}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {variant.price.currencyCode}
                            </span>
                          </div>
                        </motion.div>
                      )}

                      {/* Variant Selection - More compact */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-3"
                      >
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Select Variant
                        </label>
                        <select
                          value={selectedVariant}
                          onChange={(e) => handleVariantChange(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-orange-500 focus:outline-none transition-all"
                        >
                          {product.variants.edges.map(({ node }: any) => (
                            <option key={node.id} value={node.id}>
                              {node.title} - ${node.price.amount}
                            </option>
                          ))}
                        </select>
                      </motion.div>

                      {/* Quantity Selection - More compact */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mb-4 flex items-center gap-3"
                      >
                        <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                          Quantity:
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(quantity - 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center text-sm"
                          >
                            -
                          </button>
                          <span className="w-10 text-center font-medium text-sm">
                            {quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(quantity + 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center text-sm"
                          >
                            +
                          </button>
                        </div>
                      </motion.div>

                      {/* Action Buttons - More compact */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="space-y-2"
                      >
                        {/* Primary CTA */}
                        <motion.button
                          onClick={handleAddToCart}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="relative w-full overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-2.5 sm:py-3 text-sm sm:text-base rounded-xl shadow-xl transition-all group"
                        >
                          <AnimatePresence mode="wait">
                            {addedToCart ? (
                              <motion.span
                                key="success"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex items-center justify-center gap-2"
                              >
                                <FiCheck className="text-lg sm:text-xl" />
                                Added to Cart!
                              </motion.span>
                            ) : (
                              <motion.span
                                key="default"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex items-center justify-center gap-2"
                              >
                                Add to Cart
                                <FiShoppingCart className="text-lg sm:text-xl group-hover:translate-x-1 transition-transform" />
                              </motion.span>
                            )}
                          </AnimatePresence>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                          />
                        </motion.button>

                        {/* Secondary Actions */}
                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            href="https://sunnyislandpepper.myshopify.com/products/sunny-island-pepper-sauce-classic-gold"
                            className="group relative overflow-hidden px-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-lg transition-all text-xs sm:text-sm flex items-center justify-center gap-1.5"
                          >
                            <span>View Details</span>
                            <FiEye className="text-sm sm:text-base group-hover:scale-110 transition-transform" />
                          </Link>

                          <Link
                            href="/shop"
                            className="group relative px-3 py-2 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-semibold rounded-lg transition-all text-xs sm:text-sm flex items-center justify-center gap-1.5"
                          >
                            <span>More Info</span>
                            <GiChiliPepper className="text-sm sm:text-base group-hover:rotate-12 transition-transform" />
                          </Link>
                        </div>
                      </motion.div>

                      {/* Trust badges - More compact */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700"
                      >
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          ✨ Premium Quality
                        </span>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          🌿 Natural
                        </span>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          🔥 Perfect Heat
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Bottom Elements - More compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
            >
              {/* Customer Reviews - More compact */}
              <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-3 py-2 rounded-full">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-red-400 border border-white dark:border-gray-800"
                    />
                  ))}
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    1000+ Happy Customers
                  </p>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500 text-xs">
                        ★
                      </span>
                    ))}
                    <span className="text-gray-600 dark:text-gray-400 ml-1">
                      4.9
                    </span>
                  </div>
                </div>
              </div>

              {/* Shop Link */}
              <Link
                href="https://sunnyislandpepper.myshopify.com"
                className="flex items-center gap-2 text-xs sm:text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
              >
                Visit Full Shop
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FiArrowRight />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Animated glow effects - Smaller */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 h-48 bg-orange-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-red-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </section>

      {/* Custom styles */}
      <style jsx global>{`
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Select dropdown styling */
        select {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
          padding-right: 2.5rem;
        }

        /* Dark mode select */
        @media (prefers-color-scheme: dark) {
          select {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          }
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          select,
          input {
            font-size: 16px; /* Prevents zoom on iOS */
          }
        }

        /* Performance optimizations */
        .gpu-accelerated {
          transform: translateZ(0);
          will-change: transform;
          backface-visibility: hidden;
        }
      `}</style>
    </>
  );
}
