// src/components/home/SectionExploreGrid.tsx

import {
  Widget,
  permanentWidgets,
  secondaryWidgetsData,
  shuffleArray,
} from "@/data/gridData";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiExternalLink,
  FiRefreshCw,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
/* ---------------------------------------------------------------------------
   TILE INTERFACE
---------------------------------------------------------------------------*/
interface Tile {
  row: number;
  col: number;
  rowSpan: number;
  colSpan: number;
  widget?: Widget;
}

/* ============================================================================
   1) ENHANCED 24 PATTERNS FOR 5-WIDGETS IN A 3×8 GRID (Desktop)
============================================================================ */
function getRandomFiveShapePositions3x8(): Tile[] {
  const patterns = [
    // Pattern 1: Large left, horizontal strip, small tiles
    () => {
      const tiles: Tile[] = [
        { row: 0, col: 0, rowSpan: 3, colSpan: 3 }, // Large square
        { row: 0, col: 3, rowSpan: 2, colSpan: 5 }, // Wide horizontal
        { row: 2, col: 3, rowSpan: 1, colSpan: 2 }, // Small 1
        { row: 2, col: 5, rowSpan: 1, colSpan: 2 }, // Small 2
        { row: 2, col: 7, rowSpan: 1, colSpan: 1 }, // Tiny
      ];
      return tiles;
    },
    // Pattern 2: Central focus with corners
    () => {
      const tiles: Tile[] = [
        { row: 0, col: 2, rowSpan: 3, colSpan: 4 }, // Central large
        { row: 0, col: 0, rowSpan: 2, colSpan: 2 }, // Top left
        { row: 0, col: 6, rowSpan: 2, colSpan: 2 }, // Top right
        { row: 2, col: 0, rowSpan: 1, colSpan: 2 }, // Bottom left
        { row: 2, col: 6, rowSpan: 1, colSpan: 2 }, // Bottom right
      ];
      return tiles;
    },
    // Pattern 3: Asymmetric modern
    () => {
      const tiles: Tile[] = [
        { row: 0, col: 0, rowSpan: 2, colSpan: 4 }, // Wide top
        { row: 0, col: 4, rowSpan: 3, colSpan: 2 }, // Tall right
        { row: 0, col: 6, rowSpan: 1, colSpan: 2 }, // Small top right
        { row: 1, col: 6, rowSpan: 2, colSpan: 2 }, // Medium bottom right
        { row: 2, col: 0, rowSpan: 1, colSpan: 4 }, // Wide bottom
      ];
      return tiles;
    },
  ];

  const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
  return randomPattern();
}

/* ============================================================================
   2-6) KEEP EXISTING LAYOUT FUNCTIONS BUT ADD MORE VARIETY
============================================================================ */
// [Keep all existing functions from 2-6 as they are]

function getFiveWidgetLayoutPage0(
  products: Widget,
  scoville: Widget,
  foods: Widget,
  secondaries: Widget[],
): Tile[] {
  const tiles = getRandomFiveShapePositions3x8();
  tiles[0].widget = products;
  tiles[1].widget = scoville;
  tiles[2].widget = foods;
  tiles[3].widget = secondaries[0];
  tiles[4].widget = secondaries[1];
  return tiles;
}

function getFiveWidgetLayoutPageOther(widgets: Widget[]): Tile[] {
  const tiles = getRandomFiveShapePositions3x8();
  const assignedWidgets = shuffleArray([...widgets]);
  tiles.forEach((tile, i) => {
    tile.widget = assignedWidgets[i];
  });
  return tiles;
}

function getThreeWidgetSingleRowLayout(widgets: Widget[]): Tile[] {
  const shapes = [
    { rowSpan: 1, colSpan: 1 },
    { rowSpan: 1, colSpan: 2 },
    { rowSpan: 1, colSpan: 3 },
  ];
  shuffleArray(shapes);
  let currentCol = 0;
  const tiles: Tile[] = shapes.map((s) => {
    const t: Tile = { row: 0, col: currentCol, rowSpan: 1, colSpan: s.colSpan };
    currentCol += s.colSpan;
    return t;
  });
  tiles.forEach((tile, i) => {
    tile.widget = widgets[i];
  });
  return tiles;
}

function generateUniqueTiling(
  numRows: number,
  numCols: number,
  pieces: number,
): Tile[] | null {
  const grid = Array.from({ length: numRows }, () =>
    Array(numCols).fill(false),
  );
  const solution: Tile[] = [];
  const usedSizes = new Set<string>();

  function isGridFull(): boolean {
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        if (!grid[r][c]) return false;
      }
    }
    return true;
  }

  function findFirstEmpty(): { row: number; col: number } | null {
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        if (!grid[r][c]) return { row: r, col: c };
      }
    }
    return null;
  }

  function canPlace(row: number, col: number, h: number, w: number): boolean {
    if (row + h > numRows || col + w > numCols) return false;
    for (let rr = row; rr < row + h; rr++) {
      for (let cc = col; cc < col + w; cc++) {
        if (grid[rr][cc]) return false;
      }
    }
    return true;
  }

  function markCells(
    row: number,
    col: number,
    h: number,
    w: number,
    value: boolean,
  ) {
    for (let rr = row; rr < row + h; rr++) {
      for (let cc = col; cc < col + w; cc++) {
        grid[rr][cc] = value;
      }
    }
  }

  function backtrack(): boolean {
    if (isGridFull()) return solution.length === pieces;
    if (solution.length === pieces) return false;
    const cell = findFirstEmpty();
    if (!cell) return false;
    const { row, col } = cell;

    const possibilities: { h: number; w: number }[] = [];
    for (let h = 1; h <= numRows - row; h++) {
      for (let w = 1; w <= numCols - col; w++) {
        if (canPlace(row, col, h, w)) {
          const sizeKey = `${h}x${w}`;
          if (!usedSizes.has(sizeKey)) {
            possibilities.push({ h, w });
          }
        } else {
          break;
        }
      }
    }
    shuffleArray(possibilities);
    for (const { h, w } of possibilities) {
      const sizeKey = `${h}x${w}`;
      markCells(row, col, h, w, true);
      solution.push({ row, col, rowSpan: h, colSpan: w });
      usedSizes.add(sizeKey);
      if (backtrack()) return true;
      markCells(row, col, h, w, false);
      solution.pop();
      usedSizes.delete(sizeKey);
    }
    return false;
  }
  return backtrack() ? solution.slice() : null;
}

function generateLayout(
  widgetCount: number,
  pageIndex: number,
  widgets: Widget[],
): Tile[] {
  if (widgetCount === 5) {
    if (pageIndex === 0) {
      const products = widgets.find((w) => w.id === 101)!;
      const scoville = widgets.find((w) => w.id === 102)!;
      const foods = widgets.find((w) => w.id === 103)!;
      const secondaries = widgets.filter(
        (w) => w.id !== 101 && w.id !== 102 && w.id !== 103,
      );
      return getFiveWidgetLayoutPage0(products, scoville, foods, secondaries);
    } else {
      return getFiveWidgetLayoutPageOther(widgets);
    }
  }
  if (widgetCount === 3) {
    return getThreeWidgetSingleRowLayout(widgets);
  }
  const numRows = 3,
    numCols = 5;
  const tiling = generateUniqueTiling(numRows, numCols, widgetCount);
  if (tiling) {
    const shuffled = shuffleArray([...widgets]);
    for (let i = 0; i < tiling.length; i++) {
      tiling[i].widget = shuffled[i];
    }
    return tiling;
  }
  const fallback: Tile[] = [];
  const sliceWidth = Math.floor(numCols / widgetCount);
  for (let i = 0; i < widgetCount; i++) {
    fallback.push({
      row: 0,
      col: i * sliceWidth,
      rowSpan: 3,
      colSpan: sliceWidth,
      widget: widgets[i],
    });
  }
  return fallback;
}

function getMobileLayout(widgets: Widget[]): Tile[] {
  if (widgets.length >= 4) {
    return [
      { row: 0, col: 0, rowSpan: 2, colSpan: 3, widget: widgets[0] },
      { row: 2, col: 0, rowSpan: 1, colSpan: 3, widget: widgets[1] },
      { row: 3, col: 0, rowSpan: 1, colSpan: 2, widget: widgets[2] },
      { row: 3, col: 2, rowSpan: 1, colSpan: 1, widget: widgets[3] },
    ];
  } else {
    const cols = widgets.length;
    return widgets.map((w, i) => ({
      row: 0,
      col: i,
      rowSpan: 1,
      colSpan: 1,
      widget: w,
    }));
  }
}
/* ---------------------------------------------------------------------------
   WIDGET CARD — fixed syntax + micro-perf tweaks
---------------------------------------------------------------------------*/
interface WidgetCardProps {
  widget: Widget;
  index: number;
  tileSize: { rows: number; cols: number };
}

function WidgetCard({ widget, index, tileSize }: WidgetCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  /* ─────────────  size helpers  ───────────── */
  const isLarge = tileSize.rows >= 2 && tileSize.cols >= 2;
  const isWide = tileSize.cols >= 3;

  /* ─────────────  motion variants  ───────────── */
  const cardVariants = {
    initial: { opacity: 0, scale: 0.95 },
    enter: {
      opacity: 1,
      scale: 1,
      transition: { delay: index * 0.05, type: "spring", stiffness: 100 },
    },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  const bgVariants = { rest: { scale: 1 }, hover: { scale: 1.06 } };

  return (
    <Link href={widget.route} legacyBehavior passHref>
      <motion.a
        className="relative h-full w-full group cursor-pointer will-change-transform"
        variants={cardVariants}
        initial="initial"
        animate="enter"
        whileHover="hover"
        whileTap="tap"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* ─────────────  glass card  ───────────── */}
        <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-lg border border-gray-700/50 shadow-2xl">
          {/* animated border (GPU-friendly) */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isHovered ? "opacity-100 animate-gradientShift" : "opacity-0"}`}
            style={{ padding: 2 }}
          >
            <div className="h-full w-full bg-gray-900" />
          </div>

          {/* background image */}
          <motion.div
            className="absolute inset-0 will-change-transform"
            variants={bgVariants}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `url('${widget.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </motion.div>

          {/* ─────────────  content  ───────────── */}
          <div className="relative z-10 h-full w-full p-6 flex flex-col justify-between">
            {/* top row */}
            <div className="flex justify-between items-start">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 + 0.1, duration: 0.4 }}
                className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white/90"
              >
                {widget.category ?? "Explore"}
              </motion.span>

              {isLarge && (
                <motion.div
                  animate={{ rotate: isHovered ? -360 : 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="will-change-transform"
                >
                  <HiSparkles className="text-2xl text-yellow-400/80" />
                </motion.div>
              )}
            </div>

            {/* spacer */}
            <div className="flex-grow" />

            {/* bottom info */}
            <div className="space-y-3">
              <h3
                className={`font-bold uppercase text-white leading-tight ${isLarge ? "text-3xl" : isWide ? "text-2xl" : "text-xl"}`}
                style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
              >
                {widget.title}
              </h3>

              {(isLarge || isWide) && widget.description && (
                <p
                  className={`text-sm text-gray-300 line-clamp-2 transition-opacity ${isHovered ? "opacity-100" : "opacity-70"}`}
                >
                  {widget.description}
                </p>
              )}

              <motion.div
                animate={{ x: isHovered ? 6 : 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex items-center gap-2 text-white/80"
              >
                <span className="text-sm font-medium">
                  {isLarge ? "Explore Now" : "View"}
                </span>
                <FiExternalLink className={isLarge ? "text-lg" : "text-base"} />
              </motion.div>
            </div>
          </div>

          {/* subtle hover accents — self-closing spans fixed (jsx now uses explicit close tag) */}
          <span className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/50 rounded-tr-lg transform scale-75 opacity-0 transition duration-150 ease-out group-hover:scale-100 group-hover:opacity-100"></span>
          <span className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/50 rounded-bl-lg transform scale-75 opacity-0 transition duration-150 ease-out delay-75 group-hover:scale-100 group-hover:opacity-100"></span>
        </div>

        {/* local CSS */}
        <style jsx>{`
          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-gradientShift {
            background: linear-gradient(
              45deg,
              #ff6b6b,
              #4ecdc4,
              #45b7d1,
              #ff6b6b
            );
            background-size: 400% 400%;
            animation: gradientShift 6s linear infinite;
          }
        `}</style>
      </motion.a>
    </Link>
  );
}

/* ============================================================================
   OPTIMIZED SECTION EXPLORE GRID COMPONENT
============================================================================ */
export default function SectionExploreGrid() {
  const widgetsPerPage = 5;
  const [secondaryPage, setSecondaryPage] = useState(0);
  const [shuffledSecondaries, setShuffledSecondaries] = useState(() =>
    shuffleArray([...secondaryWidgetsData]),
  );
  const [isMobile, setIsMobile] = useState(false);

  // Effect for handling window resize to detect mobile state
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSecondaryPages =
    Math.ceil(shuffledSecondaries.length / widgetsPerPage) + 1;

  // Memoize the calculation of widgets to display for the current page.
  // This now only recalculates when the page or the shuffled data changes.
  const dashboardWidgets = useMemo(() => {
    if (secondaryPage === 0) {
      const needed = widgetsPerPage - permanentWidgets.length;
      return [...permanentWidgets, ...shuffledSecondaries.slice(0, needed)];
    }
    const start = (secondaryPage - 1) * widgetsPerPage;
    return shuffledSecondaries.slice(start, start + widgetsPerPage);
  }, [secondaryPage, shuffledSecondaries]);

  // Memoize the layout generation. This is a critical optimization.
  // The layout is now only generated when its dependencies change.
  const tiles = useMemo(() => {
    const widgetCount = dashboardWidgets.length;
    return isMobile
      ? getMobileLayout(dashboardWidgets)
      : generateLayout(widgetCount, secondaryPage, dashboardWidgets);
  }, [isMobile, dashboardWidgets, secondaryPage]);

  // Memoize the grid container style calculation.
  const gridContainerStyle = useMemo((): React.CSSProperties => {
    if (isMobile) {
      const cols = dashboardWidgets.length <= 2 ? dashboardWidgets.length : 3;
      return {
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridAutoRows: "200px",
        gap: "12px",
        width: "100%",
      };
    }
    const maxRow = Math.max(...tiles.map((t) => t.row + t.rowSpan), 1);
    const maxCol = Math.max(...tiles.map((t) => t.col + t.colSpan), 1);
    return {
      display: "grid",
      gridTemplateColumns: `repeat(${maxCol}, 1fr)`,
      gridTemplateRows: `repeat(${maxRow}, 160px)`,
      gap: "16px",
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
    };
  }, [tiles, isMobile, dashboardWidgets.length]);

  // Memoize event handlers to prevent recreating them on every render.
  const handleRefresh = useCallback(() => {
    setShuffledSecondaries(shuffleArray([...secondaryWidgetsData]));
    setSecondaryPage(0);
  }, []);

  const handleNextPage = useCallback(() => {
    setSecondaryPage((prev) =>
      prev + 1 >= totalSecondaryPages ? 0 : prev + 1,
    );
  }, [totalSecondaryPages]);

  const handlePrevPage = useCallback(() => {
    setSecondaryPage((prev) =>
      prev - 1 < 0 ? totalSecondaryPages - 1 : prev - 1,
    );
  }, [totalSecondaryPages]);

  const handlePageIndicatorClick = useCallback(
    (idx: number) => {
      if (idx !== secondaryPage) {
        setSecondaryPage(idx);
      }
    },
    [secondaryPage],
  );

  return (
    <section
      id="section-explore-grid"
      className="relative w-full min-h-screen p-6 sm:p-8 lg:p-12 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 40% 20%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl uppercase sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            Quick Explore
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Discover our premium collection of sauces and explore what makes
            Sunny Island special
          </p>
        </motion.div>

        {/* Grid Container with streamlined transition */}
        <div className="flex justify-center w-full min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={secondaryPage} // ensure this is here
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={gridContainerStyle}
            >
              {tiles.map((tile, idx) => (
                <div
                  key={`page-${secondaryPage}-tile-${tile.widget?.id ?? idx}`} // ← unique per page & widget
                  style={{
                    gridColumnStart: tile.col + 1,
                    gridColumnEnd: `span ${tile.colSpan}`,
                    gridRowStart: tile.row + 1,
                    gridRowEnd: `span ${tile.rowSpan}`,
                  }}
                >
                  {tile.widget && (
                    <WidgetCard
                      widget={tile.widget}
                      index={idx}
                      tileSize={{ rows: tile.rowSpan, cols: tile.colSpan }}
                    />
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced Pagination */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col items-center justify-center gap-4"
        >
          <div className="flex items-center gap-3">
            {secondaryPage > 0 ? (
              <motion.button
                onClick={handlePrevPage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-xl transition-all duration-300 text-sm sm:text-base"
              >
                <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                  <FiArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
                  <span className="hidden sm:inline">Previous</span>
                </span>
              </motion.button>
            ) : (
              <motion.button
                onClick={handleRefresh}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-xl transition-all duration-300 text-sm sm:text-base"
              >
                <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                  <FiRefreshCw className="transition-transform duration-300 group-hover:rotate-180" />
                  Refresh
                </span>
              </motion.button>
            )}
            <motion.button
              onClick={handleNextPage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-xl transition-all duration-300 text-sm sm:text-base"
            >
              <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                Next
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </motion.button>
          </div>
          {/* Page indicator */}
          <div className="flex items-center gap-2">
            {[...Array(totalSecondaryPages)].map((_, idx) => (
              <motion.div
                key={`page-indicator-${idx}`} // ← add a prefix so it's never just "0" or "1"
                className={`h-2 transition-all duration-300 ${
                  idx === secondaryPage
                    ? "w-8 bg-gradient-to-r from-blue-400 to-cyan-400"
                    : "w-2 bg-gray-600 hover:bg-gray-500"
                }`}
                whileHover={{ scale: 1.2 }}
                onClick={() => handlePageIndicatorClick(idx)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating elements for depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`float-${secondaryPage}-${i}`} // ← include page so keys don’t collide on re-render
            className="absolute w-64 h-64"
            style={{
              background: `radial-gradient(circle, ${
                [
                  "rgba(59,130,246,0.1)",
                  "rgba(236,72,153,0.1)",
                  "rgba(34,197,94,0.1)",
                ][i % 3]
              } 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              willChange: "transform",
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 60 - 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        /* Keyframes and other styles remain the same, ensure they are optimized */
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .shimmer-effect {
          position: relative;
          overflow: hidden;
        }
        .shimmer-effect::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          animation: shimmer 3s infinite linear;
          will-change: transform;
        }
        .glass-morphism {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transform: translateZ(0);
        }
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
