"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FiInfo } from "react-icons/fi";

export default function NutritionSection() {
  const [activeTab, setActiveTab] = useState<"nutrition" | "ingredients">(
    "nutrition",
  );

  const nutritionData = [
    { label: "Calories", value: "0", dailyValue: null },
    { label: "Total Fat", value: "0g", dailyValue: "0%" },
    { label: "Cholesterol", value: "0mg", dailyValue: "0%" },
    { label: "Sodium", value: "100mg", dailyValue: "5%" },
    { label: "Total Carbohydrate", value: "0g", dailyValue: "0%" },
    { label: "Total Sugars", value: "0g", dailyValue: null },
    { label: "Protein", value: "0g", dailyValue: "0%" },
  ];

  const ingredients = [
    { name: "Peppers", icon: "🌶️" },
    { name: "Garlic", icon: "🧄" },
    { name: "Water", icon: "💧" },
    { name: "Vinegar", icon: "🍶" },
    { name: "Fruit", icon: "🍊" },
    { name: "Condiments", icon: "🧂" },
    { name: "Salt", icon: "🧂" },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            >
              What's Inside
            </motion.h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Pure, natural ingredients crafted for the perfect balance of heat
              and flavor
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Nutrition & Ingredients Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setActiveTab("nutrition")}
                  className={`
                    flex-1 py-4 px-6 font-semibold transition-all relative
                    ${
                      activeTab === "nutrition"
                        ? "text-orange-600 dark:text-orange-400"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    }
                  `}
                >
                  Nutrition Facts
                  {activeTab === "nutrition" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 dark:bg-orange-400"
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("ingredients")}
                  className={`
                    flex-1 py-4 px-6 font-semibold transition-all relative
                    ${
                      activeTab === "ingredients"
                        ? "text-orange-600 dark:text-orange-400"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    }
                  `}
                >
                  Ingredients
                  {activeTab === "ingredients" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 dark:bg-orange-400"
                    />
                  )}
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                {activeTab === "nutrition" ? (
                  <motion.div
                    key="nutrition"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Serving Info */}
                    <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          48
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Servings per container
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>Serving size</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          1 tsp (5.7g)
                        </span>
                      </div>
                    </div>

                    {/* Calories */}
                    <div className="mb-6 pb-6 border-b-4 border-gray-900 dark:border-gray-100">
                      <div className="flex justify-between items-baseline">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          Amount per serving
                        </span>
                        <div className="text-right">
                          <span className="text-3xl font-bold text-gray-900 dark:text-white">
                            0
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                            Calories
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Nutrition Facts */}
                    <div className="space-y-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-right mb-2">
                        % Daily Value*
                      </p>
                      {nutritionData.map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`
                            flex justify-between items-center py-2
                            ${index < nutritionData.length - 1 ? "border-b border-gray-100 dark:border-gray-700" : ""}
                          `}
                        >
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {item.label}{" "}
                            <span className="font-normal">{item.value}</span>
                          </span>
                          {item.dailyValue && (
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              {item.dailyValue}
                            </span>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Footer Note */}
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 leading-relaxed">
                      *The % Daily Value tells you how much a nutrient in a
                      serving of food contributes to a daily diet. 2,000
                      calories a day is used for general nutrition advice.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ingredients"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                      {ingredients.map((ingredient, index) => (
                        <motion.div
                          key={ingredient.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center"
                        >
                          <div className="text-3xl mb-2">{ingredient.icon}</div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {ingredient.name}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Allergy Information */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6"
                    >
                      <div className="flex items-start gap-3">
                        <FiInfo className="text-orange-600 dark:text-orange-400 text-xl flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Allergy Information
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            This product is made in a facility that processes
                            various ingredients. For specific allergy concerns
                            or detailed information, please contact us.
                          </p>
                          <a
                            href="mailto:TheFerachoGroup@gmail.com"
                            className="text-sm font-semibold text-orange-600 dark:text-orange-400 hover:underline"
                          >
                            TheFerachoGroup@gmail.com
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Right: Product Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-3xl transform rotate-3" />

              {/* Product Image Container */}
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
                <div className="relative aspect-square">
                  <Image
                    src="https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/shop/PepperSauceBottleShopDisplay.webp"
                    alt="Sunny Island Pepper Sauce"
                    fill
                    className="object-contain p-4"
                  />

                  {/* Floating Elements */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-4 right-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    All Natural
                  </motion.div>

                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                      rotate: [0, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2,
                    }}
                    className="absolute bottom-4 left-4 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    Zero Calories
                  </motion.div>
                </div>

                {/* Product Highlights */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[
                    { icon: "🔥", label: "Perfect Heat" },
                    { icon: "🌿", label: "Natural" },
                    { icon: "💯", label: "Premium" },
                  ].map((highlight, index) => (
                    <motion.div
                      key={highlight.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-2xl mb-1">{highlight.icon}</div>
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {highlight.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
