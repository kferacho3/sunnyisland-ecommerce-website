"use client";

import { pepperData, UseCase, useCaseData } from "@/data/useCaseData";
import styles from "@/styles/hexagonGrid.module.css";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

// Create a combined array with each item tagged with its type.
const combinedData: (UseCase & { type: "useCase" | "pepper" })[] = [
  ...useCaseData.map((item): UseCase & { type: "useCase" } => ({
    ...item,
    type: "useCase",
  })),
  ...pepperData.map((item, index): UseCase & { type: "pepper" } => ({
    id: index + 1 + useCaseData.length,
    title: item.name,
    desc: `Scoville: ${item.scoville}`,
    icon: item.icon,
    type: "pepper",
  })),
];

// Helper: Return an array of random unique indices.
function getRandomIndices(max: number, count: number): number[] {
  const indices = Array.from({ length: max }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, count);
}

// Custom hook to detect the current breakpoint.
function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<"mobile" | "tablet" | "desktop">(
    "mobile",
  );
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setBreakpoint("mobile");
      } else if (window.innerWidth < 1024) {
        setBreakpoint("tablet");
      } else {
        setBreakpoint("desktop");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return breakpoint;
}

// Variants for inner content animation.
const contentVariants = {
  initial: { opacity: 1, filter: "blur(0px)", rotate: 0, scale: 1 },
  animate: {
    rotate: [0, -2, 2, -2, 2, 0],
    filter: ["blur(0px)", "blur(4px)", "blur(0px)"],
    opacity: [1, 0, 1],
    transition: { duration: 0.8 },
  },
  exit: { opacity: 0, filter: "blur(8px)", transition: { duration: 0.2 } },
};

export default function UseCaseSection() {
  const breakpoint = useBreakpoint();

  // Layout settings based on the breakpoint.
  let hexSize = "70px";
  let itemsPerPage = 9; // Mobile: 3 columns x 3 rows
  let columns = 3;
  let marginBetween = "4px";
  if (breakpoint === "mobile") {
    hexSize = "110px"; // Reduced size for mobile
    marginBetween = "2px"; // Tighter spacing for mobile
  } else if (breakpoint === "tablet") {
    hexSize = "125px";
    const isTabletLandscape =
      typeof window !== "undefined" && window.innerWidth > window.innerHeight;
    columns = isTabletLandscape ? 5 : 4;
    itemsPerPage = columns * 3; // 3 rows
  } else if (breakpoint === "desktop") {
    hexSize = "150px";
    itemsPerPage = 14; // e.g. 7 columns x 2 rows
    columns = 7;
  }

  // Delay randomization until the component mounts.
  const [displayItems, setDisplayItems] = useState<
    (UseCase & { type: "useCase" | "pepper" })[]
  >([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDisplayItems(
      getRandomIndices(combinedData.length, itemsPerPage).map(
        (index) => combinedData[index],
      ),
    );
  }, [breakpoint, itemsPerPage]);

  // Split items into rows.
  const numRows = Math.ceil(displayItems.length / columns);
  const rows = Array.from({ length: numRows }, (_, i) =>
    displayItems.slice(i * columns, i * columns + columns),
  );

  // "SHAKE" button handler to re-randomize items.
  const handleShake = () => {
    setDisplayItems(
      getRandomIndices(combinedData.length, itemsPerPage).map(
        (index) => combinedData[index],
      ),
    );
  };

  // Colors & gradients.
  const hoverGradient = "linear-gradient(to right, #FFB300, #FFC107, #FFA000)";
  const pepperBg = "linear-gradient(45deg, #32CD32, #008000)";
  const useCaseBg = "linear-gradient(45deg, #1D4ED8, #3B82F6)";
  const outlineColor = "#000";

  // Render nothing until mounted to avoid mismatches.
  if (!mounted) return null;

  return (
    <section className="w-full bg-gray-800 text-white py-10 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="mb-6 text-2xl md:text-3xl font-bold uppercase tracking-wider">
          Spice Up Your Life: Pro Tips on Enjoying Pepper Sauce
        </h2>
        <div
          className={styles.main}
          style={
            {
              "--s": hexSize, // hexagon container width
              "--m": marginBetween, // margin between hexagons
              "--f": `calc(${hexSize} * 1.732 + 16px - 1px)`,
            } as React.CSSProperties
          }
        >
          {/* Rotate the grid container 90° left for mobile only */}
          <div
            className={styles.container}
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
                    rowIndex === 0 && { transform: "translateX(10px)" }),
                  ...(breakpoint === "desktop" &&
                    rowIndex === 1 && { transform: "translateX(-10px)" }),
                }}
              >
                {rowItems.map((item) => {
                  const contentBg =
                    item.type === "pepper" ? pepperBg : useCaseBg;
                  return (
                    <motion.div
                      key={item.id}
                      className={styles.hexagonWrapper}
                      whileHover="hover"
                      initial="rest"
                      animate="rest"
                      transition={{ duration: 0.3 }}
                      style={{ position: "relative" }}
                    >
                      <motion.div
                        className={styles.outlineHexagon}
                        initial={{ scale: 1.15, background: outlineColor }}
                        whileHover={{ background: hoverGradient }}
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
                      <motion.div
                        className={styles.hexagon}
                        variants={{
                          rest: { background: contentBg },
                          hover: { background: hoverGradient },
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
                        <div
                          style={{
                            transform:
                              breakpoint === "mobile"
                                ? "rotate(90deg)"
                                : undefined,
                            transformOrigin:
                              breakpoint === "mobile" ? "center" : undefined,
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={item.id}
                              className={styles.hexContent}
                              variants={contentVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              style={{
                                transform:
                                  breakpoint === "mobile"
                                    ? "rotate(90deg)"
                                    : undefined,
                                transformOrigin:
                                  breakpoint === "mobile"
                                    ? "center"
                                    : undefined,
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "4px",
                                boxSizing: "border-box",
                                textAlign: "center",
                              }}
                            >
                              <div className={styles.icon}>{item.icon}</div>
                              <h3
                                className={`font-bold ${
                                  breakpoint === "mobile"
                                    ? "text-xs leading-none"
                                    : "text-sm md:text-base"
                                }`}
                              >
                                {item.title}
                              </h3>
                              <p
                                className={`${
                                  breakpoint === "mobile"
                                    ? "text-[0.25rem] leading-tight"
                                    : "text-[0.375rem] md:text-[0.4375rem]"
                                }`}
                              >
                                {item.desc}
                              </p>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={handleShake}
            className="mt-4 px-6 py-3 bg-orange-500 hover:bg-orange-400 rounded uppercase font-bold tracking-wider"
          >
            SHAKE
          </button>
        </div>
      </div>
    </section>
  );
}
