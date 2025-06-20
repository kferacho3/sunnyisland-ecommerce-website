"use client";

import { pepperData, UseCase, useCaseData } from "@/data/useCaseData";
import styles from "@/styles/hexagonGrid.module.css";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FiInfo, FiRefreshCw } from "react-icons/fi";
import { GiChiliPepper, GiFireBowl } from "react-icons/gi";

// Enhanced type for combined data
type EnhancedUseCase = UseCase & {
  type: "useCase" | "pepper";
  category?: string;
  intensity?: number;
  scovilleNumber?: number;
};

// Parse Scoville string to number
function parseScoville(scovilleStr: string): number {
  // Remove commas and convert to number
  const cleaned = scovilleStr.replace(/,/g, "").replace(/[^0-9]/g, "");
  return parseInt(cleaned) || 0;
}

// Get heat level based on Scoville units
function getHeatLevel(scoville: number): {
  level: number;
  name: string;
  colorClass: string;
} {
  if (scoville < 100)
    return {
      level: 1,
      name: "Sweet",
      colorClass: "from-green-500 to-green-400",
    };
  if (scoville < 2500)
    return {
      level: 2,
      name: "Mild",
      colorClass: "from-yellow-500 to-yellow-400",
    };
  if (scoville < 50000)
    return {
      level: 3,
      name: "Hot",
      colorClass: "from-orange-500 to-orange-400",
    };
  if (scoville < 350000)
    return {
      level: 4,
      name: "Very Hot",
      colorClass: "from-red-600 to-red-500",
    };
  return { level: 5, name: "Inferno", colorClass: "from-red-900 to-black" };
}

// Create a combined array with enhanced metadata
const combinedData: EnhancedUseCase[] = [
  ...useCaseData.map(
    (item): EnhancedUseCase => ({
      ...item,
      type: "useCase",
      category: "general", // Default category since it's optional
    }),
  ),
  ...pepperData.map((item, index): EnhancedUseCase => {
    const scovilleNumber = parseScoville(item.scoville);
    const heatLevel = getHeatLevel(scovilleNumber);
    return {
      id: index + 1 + useCaseData.length,
      title: item.name,
      desc: `${item.scoville} • ${heatLevel.name}`,
      icon: item.icon,
      type: "pepper",
      intensity: heatLevel.level,
      scovilleNumber,
    };
  }),
];

// Enhanced helper for random selection with optional filtering
function getRandomIndices(
  max: number,
  count: number,
  excludeIndices: number[] = [],
): number[] {
  const availableIndices = Array.from({ length: max }, (_, i) => i).filter(
    (i) => !excludeIndices.includes(i),
  );

  for (let i = availableIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableIndices[i], availableIndices[j]] = [
      availableIndices[j],
      availableIndices[i],
    ];
  }
  return availableIndices.slice(0, Math.min(count, availableIndices.length));
}

// Enhanced breakpoint hook with debouncing
function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<"mobile" | "tablet" | "desktop">(
    "mobile",
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.innerWidth < 640) {
          setBreakpoint("mobile");
        } else if (window.innerWidth < 1024) {
          setBreakpoint("tablet");
        } else {
          setBreakpoint("desktop");
        }
      }, 150);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return breakpoint;
}

// Premium content animation variants
const contentVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    filter: "blur(10px)",
    transition: {
      duration: 0.3,
    },
  },
};

// Shake animation for the entire grid
const shakeAnimation = {
  shake: {
    rotate: [0, -5, 5, -5, 5, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

// Individual hexagon component for better performance
const HexagonItem = React.memo(
  ({
    item,
    index,
    breakpoint,
    onClick,
  }: {
    item: EnhancedUseCase;
    index: number;
    breakpoint: string;
    onClick: (item: EnhancedUseCase) => void;
  }) => {
    const controls = useAnimation();

    // Premium gradient backgrounds
    const gradients = {
      pepper:
        item.type === "pepper" && item.scovilleNumber
          ? `linear-gradient(135deg, ${getHeatLevel(item.scovilleNumber).colorClass.split(" ")[1]} 0%, ${getHeatLevel(item.scovilleNumber).colorClass.split(" ")[3]} 100%)`
          : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      useCase: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      hover: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
    };

    const contentBg =
      item.type === "pepper" ? gradients.pepper : gradients.useCase;

    // Staggered entrance animation
    useEffect(() => {
      controls.start({
        opacity: 1,
        scale: 1,
        transition: {
          delay: index * 0.05,
          duration: 0.6,
          ease: [0.43, 0.13, 0.23, 0.96],
        },
      });
    }, [controls, index]);

    return (
      <motion.div
        className={styles.hexagonWrapper}
        initial={{ opacity: 0, scale: 0 }}
        animate={controls}
        whileHover="hover"
        whileTap="tap"
        onClick={() => onClick(item)}
        style={{
          position: "relative",
          cursor: "pointer",
        }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: gradients.hover,
            filter: "blur(20px)",
            transform: "scale(1.2)",
            clipPath:
              "polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%)",
            zIndex: 0,
          }}
        />

        {/* Outline */}
        <motion.div
          className={styles.outlineHexagon}
          initial={{ scale: 1.15, background: "#1f2937" }}
          whileHover={{
            background: gradients.hover,
            scale: 1.2,
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            clipPath:
              "polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%)",
            zIndex: 1,
          }}
        />

        {/* Main hexagon */}
        <motion.div
          className={styles.hexagon}
          variants={{
            rest: { background: contentBg },
            hover: {
              background: gradients.hover,
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            },
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            clipPath:
              "polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%)",
            overflow: "hidden",
            zIndex: 2,
          }}
        >
          <motion.div
            className={styles.hexContent}
            variants={contentVariants}
            style={{
              // Remove this line:
              // transform: breakpoint === "mobile" ? "rotate(90deg)" : undefined,
              transformOrigin: "center",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px",
              boxSizing: "border-box",
              textAlign: "center",
            }}
          >
            <motion.div
              className={styles.icon}
              whileHover={{
                rotate: 360,
                scale: 1.2,
              }}
              transition={{ duration: 0.6 }}
            >
              {item.icon}
            </motion.div>
            <h3
              className={`font-bold ${
                breakpoint === "mobile"
                  ? "text-xs leading-tight mt-1"
                  : "text-sm md:text-base mt-2"
              }`}
            >
              {item.title}
            </h3>

            {/* "View Details" button instead of description */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`${
                breakpoint === "mobile"
                  ? "text-[0.6rem] mt-1 px-2 py-0.5"
                  : "text-xs mt-2 px-3 py-1"
              } bg-white/20 backdrop-blur-sm rounded-full font-medium hover:bg-white/30 transition-colors`}
              onClick={(e) => {
                e.stopPropagation();
                onClick(item);
              }}
            >
              View Details
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  },
);

HexagonItem.displayName = "HexagonItem";

export default function UseCaseSection() {
  const breakpoint = useBreakpoint();
  const controls = useAnimation();

  // Enhanced layout configuration
  const layoutConfig = useMemo(() => {
    switch (breakpoint) {
      case "mobile":
        return {
          hexSize: "100px",
          itemsPerPage: 9,
          columns: 3,
          marginBetween: "3px",
        };
      case "tablet":
        return {
          hexSize: "120px",
          itemsPerPage: 15,
          columns: 5,
          marginBetween: "4px",
        };
      case "desktop":
        return {
          hexSize: "140px",
          itemsPerPage: 21,
          columns: 7,
          marginBetween: "5px",
        };
    }
  }, [breakpoint]);

  const { hexSize, itemsPerPage, columns, marginBetween } = layoutConfig;

  const [displayItems, setDisplayItems] = useState<EnhancedUseCase[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [selectedItem, setSelectedItem] = useState<EnhancedUseCase | null>(
    null,
  );
  const [usedIndices, setUsedIndices] = useState<number[]>([]);

  // Initialize items
  useEffect(() => {
    setMounted(true);
    const indices = getRandomIndices(combinedData.length, itemsPerPage);
    setDisplayItems(indices.map((index) => combinedData[index]));
    setUsedIndices(indices);
  }, [breakpoint, itemsPerPage]);

  // Enhanced shake handler with animation
  const handleShake = useCallback(() => {
    setIsShaking(true);
    controls.start("shake");

    // Ensure we get different items
    const newIndices = getRandomIndices(
      combinedData.length,
      itemsPerPage,
      usedIndices,
    );

    setTimeout(() => {
      setDisplayItems(newIndices.map((index) => combinedData[index]));
      setUsedIndices(newIndices);
      setIsShaking(false);
    }, 300);
  }, [itemsPerPage, controls, usedIndices]);

  // Handle item click
  const handleItemClick = useCallback((item: EnhancedUseCase) => {
    setSelectedItem(item);
  }, []);

  // Split items into rows
  const rows = useMemo(() => {
    const numRows = Math.ceil(displayItems.length / columns);
    return Array.from({ length: numRows }, (_, i) =>
      displayItems.slice(i * columns, i * columns + columns),
    );
  }, [displayItems, columns]);

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-10 text-orange-400/10"
        >
          <GiChiliPepper className="text-[200px]" />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 left-10 text-red-400/10"
        >
          <GiFireBowl className="text-[180px]" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
            Spice Up Your Life
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Pro tips and pepper varieties to enhance your culinary adventures
          </p>
        </motion.div>

        {/* Hexagon Grid Container */}
        <motion.div
          className={styles.main}
          animate={controls}
          variants={shakeAnimation}
          style={
            {
              "--s": hexSize,
              "--m": marginBetween,
              "--f": `calc(${hexSize} * 1.732 + 16px - 1px)`,
            } as React.CSSProperties
          }
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={displayItems.map((item) => item.id).join("-")}
              className={styles.container}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              style={
                breakpoint === "mobile"
                  ? { transform: "rotate(-90deg)" }
                  : undefined
              }
            >
              {rows.map((rowItems, rowIndex) => (
                <div
                  key={`row-${rowIndex}`}
                  className={`${styles.gridRow} ${
                    rowIndex % 2 === 0 ? styles.odd : styles.even
                  }`}
                  style={{
                    gridTemplateColumns: `repeat(${columns}, var(--s))`,
                    ...(breakpoint === "desktop" &&
                      rowIndex % 2 === 0 && { transform: "translateX(15px)" }),
                    ...(breakpoint === "desktop" &&
                      rowIndex % 2 === 1 && { transform: "translateX(-15px)" }),
                  }}
                >
                  {rowItems.map((item, itemIndex) => (
                    <HexagonItem
                      key={item.id}
                      item={item}
                      index={rowIndex * columns + itemIndex}
                      breakpoint={breakpoint}
                      onClick={handleItemClick}
                    />
                  ))}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Premium Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShake}
            disabled={isShaking}
            className={`
              relative px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 
              text-white font-bold rounded-full shadow-2xl 
              hover:shadow-orange-500/25 transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center gap-3 text-lg
            `}
          >
            <FiRefreshCw
              className={`text-xl ${isShaking ? "animate-spin" : ""}`}
            />
            <span>{isShaking ? "SHUFFLING..." : "SHUFFLE"}</span>

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "100%", opacity: [0, 1, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                pointerEvents: "none",
              }}
            />
          </motion.button>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {[
            {
              icon: "🌶️",
              title: "Heat Levels",
              desc: "From mild to extreme, find your perfect spice",
            },
            {
              icon: "🍳",
              title: "Usage Tips",
              desc: "Expert advice for every culinary application",
            },
            {
              icon: "🔥",
              title: "Flavor Profiles",
              desc: "Discover unique taste combinations",
            },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-300"
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-400">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Enhanced Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div
                  className="text-6xl mb-4"
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                >
                  {selectedItem.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">
                  {selectedItem.title}
                </h3>

                {/* Full description now shown in modal */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {selectedItem.desc}
                </p>

                {selectedItem.type === "pepper" &&
                  selectedItem.scovilleNumber !== undefined && (
                    <div className="mb-6 space-y-4">
                      {/* Heat Level Info */}
                      <div>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <FiInfo className="text-orange-400" />
                          <span className="text-sm text-gray-400">
                            Heat Level
                          </span>
                        </div>

                        {/* Heat Level Name */}
                        <p className="text-lg font-semibold mb-3 text-orange-400">
                          {getHeatLevel(selectedItem.scovilleNumber).name}
                        </p>

                        {/* Gradient Heat Level Bar */}
                        <div className="relative w-full h-8 bg-gray-700 rounded-full overflow-hidden">
                          {/* Smooth gradient background */}
                          <div
                            className="absolute inset-0 rounded-full"
                            style={{
                              background:
                                "linear-gradient(to right, #10b981 0%, #22c55e 20%, #fbbf24 40%, #f97316 60%, #dc2626 80%, #000000 100%)",
                            }}
                          />

                          {/* Indicator */}
                          <motion.div
                            initial={{ left: 0 }}
                            animate={{
                              left: `${((selectedItem.intensity || 1) - 1) * 20}%`,
                            }}
                            transition={{ type: "spring", duration: 0.8 }}
                            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-2 border-gray-800"
                            style={{
                              marginLeft: "calc(10% - 12px)", // Center in each segment
                            }}
                          />
                        </div>

                        {/* Heat Level Labels */}
                        <div className="flex justify-between mt-2 text-xs text-gray-400">
                          <span>Sweet</span>
                          <span>Mild</span>
                          <span>Hot</span>
                          <span>Very Hot</span>
                          <span>Inferno</span>
                        </div>
                      </div>

                      {/* Scoville Details */}
                      <div className="bg-gray-700/50 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-gray-300 mb-2">
                          Scoville Heat Units
                        </h4>
                        <p className="text-2xl font-bold text-orange-400">
                          {selectedItem.scovilleNumber.toLocaleString()} SHU
                        </p>
                      </div>

                      {/* Additional Pepper Info */}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <p className="text-gray-400 text-xs">Origin</p>
                          <p className="font-semibold">Various Regions</p>
                        </div>
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <p className="text-gray-400 text-xs">Best Used In</p>
                          <p className="font-semibold">Sauces & Dishes</p>
                        </div>
                      </div>
                    </div>
                  )}

                {selectedItem.type === "useCase" && (
                  <div className="mb-6 space-y-4">
                    {/* Use Case Details */}
                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">
                        Pro Tip
                      </h4>
                      <p className="text-gray-300 leading-relaxed">
                        This technique will enhance your culinary experience and
                        bring out the best flavors in your dishes.
                      </p>
                    </div>

                    {/* Category Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 text-purple-400 rounded-full">
                      <span className="text-sm font-medium">
                        {selectedItem.category || "General Tip"}
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedItem(null)}
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full font-semibold transition-colors"
                  >
                    Close
                  </motion.button>

                  {selectedItem.type === "pepper" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold shadow-lg"
                    >
                      Learn More
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
