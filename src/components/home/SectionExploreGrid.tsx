// src/components/home/SectionExploreGrid.tsx

import {
  Widget,
  permanentWidgets,
  secondaryWidgetsData,
  shuffleArray,
} from "@/data/gridData";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
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

/* ============================================================================
   ENHANCED WIDGET CARD COMPONENT
============================================================================ */
interface WidgetCardProps {
  widget: Widget;
  index: number;
  tileSize: { rows: number; cols: number };
}

function WidgetCard({ widget, index, tileSize }: WidgetCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Determine card style based on tile size
  const isLarge = tileSize.rows >= 2 && tileSize.cols >= 2;
  const isTall = tileSize.rows >= 2;
  const isWide = tileSize.cols >= 3;

  return (
    <Link href={widget.route}>
      <motion.div
        className="relative h-full w-full group cursor-pointer"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          type: "spring",
          stiffness: 100,
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Premium glass morphism container */}
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
          {/* Animated gradient border */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{
              background: isHovered
                ? [
                    "linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #FF6B6B)",
                    "linear-gradient(45deg, #4ECDC4, #45B7D1, #FF6B6B, #4ECDC4)",
                    "linear-gradient(45deg, #45B7D1, #FF6B6B, #4ECDC4, #45B7D1)",
                  ]
                : "linear-gradient(45deg, transparent, transparent)",
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ padding: "2px", zIndex: 0 }}
          >
            <div className="h-full w-full rounded-2xl bg-gray-900" />
          </motion.div>

          {/* Background image with parallax effect */}
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `url('${widget.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: isHovered ? "brightness(0.7)" : "brightness(0.5)",
                transition: "filter 0.3s ease",
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </motion.div>

          {/* Content container */}
          <div className="relative h-full w-full p-6 flex flex-col justify-between z-10">
            {/* Top section with icon/badge */}
            <div className="flex justify-between items-start">
              {/* Category badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
              >
                <span className="text-xs font-medium text-white/90">
                  {widget.category || "Explore"}
                </span>
              </motion.div>

              {/* Sparkle icon for large tiles */}
              {isLarge && (
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <HiSparkles className="text-2xl text-yellow-400/80" />
                </motion.div>
              )}
            </div>

            {/* Middle spacer */}
            <div className="flex-grow" />

            {/* Bottom section with title and description */}
            <div className="space-y-3">
              {/* Title with animation */}
              <motion.h3
                className={`font-bold text-white leading-tight ${
                  isLarge
                    ? "text-3xl md:text-4xl"
                    : isWide
                      ? "text-2xl"
                      : "text-xl"
                }`}
                style={{
                  textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
                }}
              >
                {widget.title}
              </motion.h3>

              {/* Description for larger tiles */}
              {(isLarge || isWide) && widget.description && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isHovered ? 1 : 0.7, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-gray-300 line-clamp-2"
                >
                  {widget.description}
                </motion.p>
              )}

              {/* Call to action */}
              <motion.div
                className="flex items-center gap-2 text-white/80"
                animate={{
                  x: isHovered ? 5 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-sm font-medium">
                  {isLarge ? "Explore Now" : "View"}
                </span>
                <FiExternalLink
                  className={`${isLarge ? "text-lg" : "text-base"}`}
                />
              </motion.div>
            </div>
          </div>

          {/* Hover effects */}
          <AnimatePresence>
            {isHovered && (
              <>
                {/* Glow effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
                  }}
                />

                {/* Corner accents */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 right-4 w-8 h-8"
                >
                  <div className="w-full h-full border-t-2 border-r-2 border-white/50 rounded-tr-lg" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="absolute bottom-4 left-4 w-8 h-8"
                >
                  <div className="w-full h-full border-b-2 border-l-2 border-white/50 rounded-bl-lg" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Link>
  );
}

/* ============================================================================
   ENHANCED SECTION EXPLORE GRID COMPONENT
============================================================================ */
export default function SectionExploreGrid() {
  const widgetsPerPage = 5;
  const [shuffledSecondaries, setShuffledSecondaries] = useState<Widget[]>(() =>
    shuffleArray([...secondaryWidgetsData]),
  );
  const [secondaryPage, setSecondaryPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  let dashboardWidgets: Widget[] = [];
  if (secondaryPage === 0) {
    const needed = widgetsPerPage - permanentWidgets.length;
    dashboardWidgets = [
      ...permanentWidgets,
      ...shuffledSecondaries.slice(0, needed),
    ];
  } else {
    const start = (secondaryPage - 1) * widgetsPerPage;
    dashboardWidgets = shuffledSecondaries.slice(start, start + widgetsPerPage);
  }
  const widgetCount = dashboardWidgets.length;

  const [mounted, setMounted] = useState(false);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (mounted) {
      let newLayout: Tile[];
      if (isMobile) {
        newLayout = getMobileLayout(dashboardWidgets);
      } else {
        newLayout = generateLayout(
          widgetCount,
          secondaryPage,
          dashboardWidgets,
        );
      }
      setTiles(newLayout);
    }
  }, [mounted, widgetCount, secondaryPage, shuffledSecondaries, isMobile]);

  // Enhanced grid container style
  let gridContainerStyle: React.CSSProperties;
  if (isMobile) {
    const cols = widgetCount === 1 ? 1 : widgetCount === 2 ? 2 : 3;
    gridContainerStyle = {
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: "12px",
      width: "100%",
      maxWidth: "600px",
      gridAutoRows: `calc((90vw - ${(cols - 1) * 12}px) / ${cols})`,
      position: "relative",
    };
  } else {
    let maxRow = 0,
      maxCol = 0;
    for (const t of tiles) {
      maxRow = Math.max(maxRow, t.row + t.rowSpan);
      maxCol = Math.max(maxCol, t.col + t.colSpan);
    }
    const cellSize = 160;
    const gap = 16;
    gridContainerStyle = {
      display: "grid",
      gridTemplateColumns: `repeat(${maxCol}, ${cellSize}px)`,
      gridTemplateRows: `repeat(${maxRow}, ${cellSize}px)`,
      gap: `${gap}px`,
      width: "max-content",
      position: "relative",
      margin: "0 auto",
    };
  }

  const totalSecondaryPages =
    Math.ceil(shuffledSecondaries.length / widgetsPerPage) + 1;

  const handleRefresh = async () => {
    setIsTransitioning(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setShuffledSecondaries(shuffleArray([...secondaryWidgetsData]));
    setSecondaryPage(0);
    setIsTransitioning(false);
  };

  const handleNextPage = async () => {
    setIsTransitioning(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setSecondaryPage((prev) =>
      prev + 1 >= totalSecondaryPages ? 0 : prev + 1,
    );
    setIsTransitioning(false);
  };

  const handlePrevPage = async () => {
    setIsTransitioning(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setSecondaryPage((prev) =>
      prev - 1 < 0 ? totalSecondaryPages - 1 : prev - 1,
    );
    setIsTransitioning(false);
  };

  if (!mounted) return null;

  return (
    <section
      id="section-explore-grid"
      className="relative w-full min-h-screen p-6 sm:p-8 lg:p-12 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />

      {/* Animated background patterns */}
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
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            Quick Explore
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Discover our premium collection of sauces and explore what makes
            Sunny Island special
          </p>
        </motion.div>

        {/* Grid Container with transition */}
        <div className="flex justify-center w-full">
          <AnimatePresence mode="wait">
            {!isTransitioning && (
              <motion.div
                key={secondaryPage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                style={gridContainerStyle}
              >
                {tiles.map((tile, index) => (
                  <div
                    key={`${secondaryPage}-${index}`}
                    style={{
                      gridColumnStart: tile.col + 1,
                      gridColumnEnd: tile.col + tile.colSpan + 1,
                      gridRowStart: tile.row + 1,
                      gridRowEnd: tile.row + tile.rowSpan + 1,
                    }}
                  >
                    {tile.widget && (
                      <WidgetCard
                        widget={tile.widget}
                        index={index}
                        tileSize={{ rows: tile.rowSpan, cols: tile.colSpan }}
                      />
                    )}
                  </div>
                ))}
              </motion.div>
            )}
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
                className="group relative overflow-hidden px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full shadow-xl transition-all duration-300 text-sm sm:text-base"
              >
                <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                  <FiArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            ) : (
              <motion.button
                onClick={handleRefresh}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-xl transition-all duration-300 text-sm sm:text-base"
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
              className="group relative overflow-hidden px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full shadow-xl transition-all duration-300 text-sm sm:text-base"
            >
              <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                Next
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </div>

          {/* Page indicator */}
          <div className="flex items-center gap-2">
            {[...Array(totalSecondaryPages)].map((_, idx) => (
              <motion.div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === secondaryPage
                    ? "w-8 bg-gradient-to-r from-blue-400 to-cyan-400"
                    : "w-2 bg-gray-600 hover:bg-gray-500"
                }`}
                whileHover={{ scale: 1.2 }}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setSecondaryPage(idx);
                    setIsTransitioning(false);
                  }, 300);
                }}
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
            key={i}
            className="absolute w-64 h-64 rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                [
                  "rgba(59, 130, 246, 0.1)",
                  "rgba(236, 72, 153, 0.1)",
                  "rgba(34, 197, 94, 0.1)",
                ][i % 3]
              } 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Premium styles */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .shimmer-effect {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }

        /* Custom scrollbar for the section */
        #section-explore-grid::-webkit-scrollbar {
          width: 8px;
        }

        #section-explore-grid::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }

        #section-explore-grid::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #06b6d4);
          border-radius: 4px;
        }

        /* Smooth transitions */
        * {
          transition-property: transform, opacity, filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Glass morphism enhancement */
        .glass-morphism {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Premium hover effects */
        .premium-hover {
          position: relative;
          overflow: hidden;
        }

        .premium-hover::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.5s;
        }

        .premium-hover:hover::before {
          left: 100%;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .grid-container {
            gap: 8px !important;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Performance optimizations */
        .gpu-accelerated {
          transform: translateZ(0);
          will-change: transform;
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
}
