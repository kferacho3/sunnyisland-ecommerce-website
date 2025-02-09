"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

// Import your data arrays from your data file.
// Note: useCaseData already contains items with id, title, desc, icon, etc.
// For pepperData items, we transform them so that their title is from name and desc is from scoville.
import { pepperData, UseCase, useCaseData } from "@/data/useCaseData";
import styles from "@/styles/hexagonGrid.module.css";

// Create a combined array where each item is tagged with its type.
// For pepperData items, we generate an id and map 'name' -> 'title', 'scoville' -> 'desc'.
const combinedData: (UseCase & { type: "useCase" | "pepper" })[] = [
  ...useCaseData.map((item): UseCase & { type: "useCase" } => ({
    ...item,
    type: "useCase",
  })),
  ...pepperData.map((item, index): UseCase & { type: "pepper" } => ({
    // Generate an id by using the index offset by the length of useCaseData
    id: index + 1 + useCaseData.length,
    title: item.name,
    desc: `Scoville: ${item.scoville}`,
    icon: item.icon,
    type: "pepper",
  })),
];

// Helper function: Given a maximum value and a count, return an array of random unique indices.
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
  const [breakpoint, setBreakpoint] = useState<"mobile" | "tablet" | "desktop">("mobile");
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

// Variants for the inner content animation.
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
  if (breakpoint === "tablet") {
    hexSize = "112px";
    itemsPerPage = 10; // e.g. 5 columns x 2 rows
    columns = 5;
  } else if (breakpoint === "desktop") {
    hexSize = "150px";
    itemsPerPage = 14; // e.g. 7 columns x 2 rows
    columns = 7;
  }

  // Get a random subset of items from combinedData using random indices.
  const [displayItems, setDisplayItems] = useState(
    getRandomIndices(combinedData.length, itemsPerPage).map(
      (index) => combinedData[index]
    )
  );
  useEffect(() => {
    setDisplayItems(
      getRandomIndices(combinedData.length, itemsPerPage).map(
        (index) => combinedData[index]
      )
    );
  }, [breakpoint, itemsPerPage]);

  // Split items into rows for the grid.
  const numRows = Math.ceil(displayItems.length / columns);
  const rows = Array.from({ length: numRows }, (_, i) =>
    displayItems.slice(i * columns, i * columns + columns)
  );

  // "SHAKE" button handler to re-randomize items.
  const handleShake = () => {
    setDisplayItems(
      getRandomIndices(combinedData.length, itemsPerPage).map(
        (index) => combinedData[index]
      )
    );
  };

  // Colors & gradients:
  const hoverGradient = "linear-gradient(to right, #FFB300, #FFC107, #FFA000)"; // primary gradient on hover
  // For pepperData items (scoville facts), use a green gradient.
  const pepperBg = "linear-gradient(45deg, #32CD32, #008000)";
  // For useCaseData items, use a blue gradient.
  const useCaseBg = "linear-gradient(45deg, #1D4ED8, #3B82F6)";
  // Outline is always black.
  const outlineColor = "#000";

  return (
    <section className="w-full bg-gray-800 text-white py-10 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="mb-6 text-2xl md:text-3xl font-bold uppercase tracking-wider">
          Spice Up Your Life: Pro Tips on Enjoying Pepper Sauce
        </h2>
        <div
          className={styles.main}
          style={{
            "--s": hexSize, // hexagon width
            "--m": "4px",   // margin between hexagons
            "--f": `calc(${hexSize} * 1.732 + 16px - 1px)`,
          } as React.CSSProperties}
        >
          <div className={styles.container}>
            {rows.map((rowItems, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className={`${styles.gridRow} ${
                  rowIndex % 2 === 0 ? styles.odd : styles.even
                }`}
                style={{ gridTemplateColumns: `repeat(${columns}, var(--s))` }}
              >
                {rowItems.map((item) => {
                  // Choose background based on the item type.
                  const contentBg = item.type === "pepper" ? pepperBg : useCaseBg;
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
                      {/* Outline layer: always starts with black, transitions to the hover gradient */}
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
                      {/* Main hexagon content */}
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
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={item.id}
                            className={styles.hexContent}
                            variants={contentVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            style={{
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
                            <h3 className="text-sm md:text-base font-bold">{item.title}</h3>
                            <p className="text-[0.375rem] md:text-[0.4375rem]">{item.desc}</p>
                          </motion.div>
                        </AnimatePresence>
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
            className="px-6 py-3 bg-orange-500 hover:bg-orange-400 rounded uppercase font-bold tracking-wider"
          >
            SHAKE
          </button>
        </div>
      </div>
    </section>
  );
}
