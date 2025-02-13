// src/components/home/SectionExploreGrid.tsx

import {
  Widget,
  permanentWidgets,
  secondaryWidgetsData,
  shuffleArray,
} from "@/data/gridData";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

/* ---------------------------------------------------------------------------
   Disable no-unused-vars for helper functions (they’re used internally)
---------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------
   TILE INTERFACE
---------------------------------------------------------------------------*/
interface Tile {
  row: number; // top-left row (0-based)
  col: number; // top-left col (0-based)
  rowSpan: number;
  colSpan: number;
  widget?: Widget; // assigned widget
}

/* ============================================================================
   1) EXACT 24 PATTERNS FOR 5-WIDGETS IN A 3×8 GRID (Desktop)
============================================================================ */
function getRandomFiveShapePositions3x8(): Tile[] {
  const side3x2 = Math.random() < 0.5 ? "left" : "right";
  const top2x6 = Math.random() < 0.5 ? "top" : "bottom";

  const tile3x2: Tile =
    side3x2 === "left"
      ? { row: 0, col: 0, rowSpan: 3, colSpan: 2 }
      : { row: 0, col: 6, rowSpan: 3, colSpan: 2 };

  const blockStartCol = side3x2 === "left" ? 2 : 0;

  const tile2x6: Tile =
    top2x6 === "top"
      ? { row: 0, col: blockStartCol, rowSpan: 2, colSpan: 6 }
      : { row: 1, col: blockStartCol, rowSpan: 2, colSpan: 6 };

  const leftoverRow = top2x6 === "top" ? 2 : 0;

  const shapesOneHigh = [
    { rowSpan: 1, colSpan: 1 },
    { rowSpan: 1, colSpan: 2 },
    { rowSpan: 1, colSpan: 3 },
  ];
  shuffleArray(shapesOneHigh);

  let currentCol = blockStartCol;
  const tile1xA: Tile = {
    row: leftoverRow,
    col: currentCol,
    rowSpan: 1,
    colSpan: shapesOneHigh[0].colSpan,
  };
  currentCol += shapesOneHigh[0].colSpan;
  const tile1xB: Tile = {
    row: leftoverRow,
    col: currentCol,
    rowSpan: 1,
    colSpan: shapesOneHigh[1].colSpan,
  };
  currentCol += shapesOneHigh[1].colSpan;
  const tile1xC: Tile = {
    row: leftoverRow,
    col: currentCol,
    rowSpan: 1,
    colSpan: shapesOneHigh[2].colSpan,
  };

  const leftoverTiles = [tile1xA, tile1xB, tile1xC].sort(
    (t1, t2) => t2.rowSpan * t2.colSpan - t1.rowSpan * t1.colSpan,
  );
  const tile1x3 = leftoverTiles[0];
  const tile1x2 = leftoverTiles[1];
  const tile1x1 = leftoverTiles[2];

  return [tile2x6, tile3x2, tile1x3, tile1x2, tile1x1];
}

/* ============================================================================
   2) SPECIAL HANDLING FOR PAGE=0 WITH 5 WIDGETS (Desktop)
============================================================================ */
function getFiveWidgetLayoutPage0(
  scoville: Widget,
  foods: Widget,
  secondaries: Widget[],
): Tile[] {
  const tiles = getRandomFiveShapePositions3x8();
  tiles[0].widget = {
    id: 101,
    title: "Products",
    route: "/explore/products",
    image: "https://picsum.photos/id/101/500/500",
  };
  tiles[1].widget = scoville;
  tiles[2].widget = foods;
  tiles[3].widget = secondaries[0];
  tiles[4].widget = secondaries[1];
  return tiles;
}

/* ============================================================================
   3) SUBSEQUENT PAGES (page > 0) WITH 5 WIDGETS (Desktop)
============================================================================ */
function getFiveWidgetLayoutPageOther(widgets: Widget[]): Tile[] {
  const tiles = getRandomFiveShapePositions3x8();
  const assignedWidgets = shuffleArray([...widgets]);
  tiles.forEach((tile, i) => {
    tile.widget = assignedWidgets[i];
  });
  return tiles;
}

/* ============================================================================
   4) 3 WIDGETS => A SINGLE ROW OF LENGTH 6 (Desktop)
============================================================================ */
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

/* ============================================================================
   5) BACKUP BACKTRACKING FOR 1, 2, or 4 WIDGETS (3×5 GRID) (Desktop)
============================================================================ */
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

/* ============================================================================
   6) MASTER LAYOUT FUNCTION (Desktop)
============================================================================ */
function generateLayout(
  widgetCount: number,
  pageIndex: number,
  widgets: Widget[],
): Tile[] {
  if (widgetCount === 5) {
    if (pageIndex === 0) {
      const scoville = widgets.find((w) => w.id === 102)!;
      const foods = widgets.find((w) => w.id === 103)!;
      const secondaries = widgets.filter(
        (w) => w.id !== 101 && w.id !== 102 && w.id !== 103,
      );
      return getFiveWidgetLayoutPage0(scoville, foods, secondaries);
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

/* ---------------------------------------------------------------------------
   Re-enable ESLint no-unused-vars rule
---------------------------------------------------------------------------*/

/* ============================================================================
   7) MOBILE LAYOUT FUNCTION (Mobile Portrait: 4 rows × 3 columns)
============================================================================ */
function getMobileLayoutForFourWidgets(widgets: Widget[]): Tile[] {
  // In a fixed grid of 4 rows x 3 columns (12 cells), partition the cells as:
  // Tile 1: occupies rows 0-1 and all 3 columns (2x3 = 6 cells)
  // Tile 2: occupies row 2 and all 3 columns (1x3 = 3 cells)
  // Tile 3: occupies row 3, columns 0-1 (1x2 = 2 cells)
  // Tile 4: occupies row 3, column 2 (1x1 = 1 cell)
  return [
    { row: 0, col: 0, rowSpan: 2, colSpan: 3, widget: widgets[0] },
    { row: 2, col: 0, rowSpan: 1, colSpan: 3, widget: widgets[1] },
    { row: 3, col: 0, rowSpan: 1, colSpan: 2, widget: widgets[2] },
    { row: 3, col: 2, rowSpan: 1, colSpan: 1, widget: widgets[3] },
  ];
}

/* ============================================================================
   WIDGET CARD COMPONENT
============================================================================ */
interface WidgetCardProps {
  widget: Widget;
}

function WidgetCard({ widget }: WidgetCardProps) {
  return (
    <Link href={widget.route}>
      <div
        className="p-1 rounded-lg border-2 border-gray-600 hover:border-red-600 transition-colors overflow-hidden"
        style={{ height: "100%", width: "100%" }}
      >
        <motion.div
          className="overflow-hidden rounded-md relative h-full w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            backgroundImage: `url('${widget.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100%",
            width: "100%",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="text-white font-bold text-xl px-2">
              {widget.title}
            </span>
          </div>
        </motion.div>
      </div>
    </Link>
  );
}

/* ============================================================================
   SECTION EXPLORE GRID COMPONENT
============================================================================ */
export default function SectionExploreGrid() {
  const widgetsPerPage = 5;
  const [shuffledSecondaries, setShuffledSecondaries] = useState<Widget[]>(() =>
    shuffleArray([...secondaryWidgetsData]),
  );
  const [secondaryPage, setSecondaryPage] = useState(0);

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
      // On mobile portrait and if we have at least 4 widgets, use the mobile layout.
      if (isMobile && widgetCount >= 4) {
        newLayout = getMobileLayoutForFourWidgets(dashboardWidgets.slice(0, 4));
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

  // For desktop/tablet, use a larger cell size (150px); for mobile, use 100px.
  const cellSize = isMobile ? 100 : 150;
  let containerWidth: number;
  let containerHeight: number;
  if (isMobile && tiles.length === 4) {
    containerWidth = 3 * cellSize;
    containerHeight = 4 * cellSize;
  } else {
    let maxRow = 0,
      maxCol = 0;
    for (const t of tiles) {
      maxRow = Math.max(maxRow, t.row + t.rowSpan);
      maxCol = Math.max(maxCol, t.col + t.colSpan);
    }
    containerWidth = maxCol * cellSize;
    containerHeight = maxRow * cellSize;
  }

  const totalSecondaryPages =
    Math.ceil(shuffledSecondaries.length / widgetsPerPage) + 1;

  const handleRefresh = () => {
    setShuffledSecondaries(shuffleArray([...secondaryWidgetsData]));
    setSecondaryPage(0);
  };

  const handleNextPage = () => {
    setSecondaryPage((prev) =>
      prev + 1 >= totalSecondaryPages ? 0 : prev + 1,
    );
  };

  const handlePrevPage = () => {
    setSecondaryPage((prev) =>
      prev - 1 < 0 ? totalSecondaryPages - 1 : prev - 1,
    );
  };

  if (!mounted) return null;

  return (
    <section
      id="section-explore-grid"
      className="w-full min-h-screen p-4 sm:p-8 bg-[#FAEBD7] text-black flex flex-col items-center justify-center"
    >
      <h2 className="text-2xl sm:text-4xl font-bold mb-6">Quick Explore</h2>
      <p className="mb-8 text-center text-sm sm:text-base">
        Choose from our main sections to learn more about our sauces and brand.
      </p>

      {/* Grid Container */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "repeat(3, 1fr)"
            : `repeat(${tiles.reduce(
                (acc, t) => Math.max(acc, t.col + t.colSpan),
                0,
              )}, 1fr)`,
          gridTemplateRows: isMobile
            ? "repeat(4, 100px)"
            : `repeat(${tiles.reduce(
                (acc, t) => Math.max(acc, t.row + t.rowSpan),
                0,
              )}, ${cellSize}px)`,
          gap: "8px",
          width: `${containerWidth}px`,
          height: `${containerHeight}px`,
          position: "relative",
        }}
      >
        {tiles.map((tile, index) => (
          <div
            key={index}
            style={{
              gridColumnStart: tile.col + 1,
              gridColumnEnd: tile.col + tile.colSpan + 1,
              gridRowStart: tile.row + 1,
              gridRowEnd: tile.row + tile.rowSpan + 1,
            }}
          >
            {tile.widget && <WidgetCard widget={tile.widget} />}
          </div>
        ))}
      </div>

      {/* Pagination / Refresh */}
      <div className="mt-8 flex justify-center gap-4">
        {secondaryPage > 0 ? (
          <button
            onClick={handlePrevPage}
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
          >
            ← Previous Section
          </button>
        ) : (
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary transition"
          >
            Refresh Dashboard
          </button>
        )}
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-secondary text-white rounded hover: opacity-80 transition"
        >
          Next Section →
        </button>
      </div>
    </section>
  );
}
