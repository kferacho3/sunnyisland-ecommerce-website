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
import { FiArrowLeft, FiArrowRight, FiRefreshCw } from "react-icons/fi";

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

/* ============================================================================
   7) MOBILE LAYOUT FUNCTION (Mobile Portrait)
============================================================================ */
function getMobileLayout(widgets: Widget[]): Tile[] {
  // For mobile, create a simple layout:
  // If 4 or more widgets: fixed 4 rows × 3 columns.
  // For 1-3 widgets: single row.
  if (widgets.length >= 4) {
    return [
      { row: 0, col: 0, rowSpan: 2, colSpan: 3, widget: widgets[0] },
      { row: 2, col: 0, rowSpan: 1, colSpan: 3, widget: widgets[1] },
      { row: 3, col: 0, rowSpan: 1, colSpan: 2, widget: widgets[2] },
      { row: 3, col: 2, rowSpan: 1, colSpan: 1, widget: widgets[3] },
    ];
  } else {
    // For 1-3 widgets, show them in a single row.
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
   WIDGET CARD COMPONENT
============================================================================ */
interface WidgetCardProps {
  widget: Widget;
}

function WidgetCard({ widget }: WidgetCardProps) {
  return (
    <Link href={widget.route}>
      <div
        className="
          relative 
          group 
          rounded-lg 
          overflow-hidden 
          border border-gray-700 
          hover:border-red-600 
          transition-all 
          duration-300 
          hover:shadow-2xl 
          hover:shadow-red-600/50
          bg-gray-800
          "
        style={{ height: "100%", width: "100%" }}
      >
        <motion.div
          className="relative h-full w-full"
          whileHover={{ scale: 1.06 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            backgroundImage: `url('${widget.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100%",
            width: "100%",
            filter: "brightness(0.9)",
          }}
        >
          {/* Hover Overlay */}
          <div
            className="
              absolute 
              inset-0 
              bg-black 
              bg-opacity-30 
              transition-all 
              duration-300 
              group-hover:bg-opacity-60 
              flex 
              items-center 
              justify-center
            "
          >
            <span
              className="
                uppercase 
                text-white 
                font-bold 
                text-xl 
                px-2 
                text-center
                transform 
                transition-transform 
                duration-300 
                group-hover:scale-105 
                group-hover:text-red-400
              "
              style={{
                textShadow: "2px 2px 6px rgba(0,0,0,0.8)",
              }}
            >
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

  // Define grid container style
  let gridContainerStyle: React.CSSProperties;
  if (isMobile) {
    // For 1 widget => 1 column, 2 => 2 columns, >=3 => 3 columns
    const cols = widgetCount === 1 ? 1 : widgetCount === 2 ? 2 : 3;
    gridContainerStyle = {
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: "10px",
      width: "90vw",
      // Make roughly square cells
      gridAutoRows: `calc((90vw - ${(cols - 1) * 10}px) / ${cols})`,
      position: "relative",
    };
  } else {
    // Desktop / Tablet
    let maxRow = 0,
      maxCol = 0;
    for (const t of tiles) {
      maxRow = Math.max(maxRow, t.row + t.rowSpan);
      maxCol = Math.max(maxCol, t.col + t.colSpan);
    }
    const cellSize = 150;
    gridContainerStyle = {
      display: "grid",
      gridTemplateColumns: `repeat(${maxCol}, 1fr)`,
      gridTemplateRows: `repeat(${maxRow}, ${cellSize}px)`,
      gap: "10px",
      width: `${maxCol * cellSize}px`,
      height: `${maxRow * cellSize}px`,
      position: "relative",
    };
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
      className="
        w-full 
        min-h-screen 
        p-4 
        sm:p-8 
        bg-gray-100 
        dark:bg-gray-900 
        text-white 
        flex 
        flex-col 
        items-center 
        justify-center
      "
    >
      <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center">
        Quick Explore
      </h2>
      <p className="mb-6 sm:mb-8 text-center text-sm sm:text-base text-gray-800 dark:text-gray-200 max-w-xl">
        Choose from our main sections to learn more about our sauces and brand.
      </p>

      {/* Grid Container */}
      <div style={gridContainerStyle}>
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
            className="
              group 
              flex 
              items-center 
              gap-2 
              px-4 
              py-2 
              rounded 
              bg-orange-600 
              text-white 
              hover:bg-orange-700 
              transition-colors
            "
          >
            <FiArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Previous Section</span>
          </button>
        ) : (
          <button
            onClick={handleRefresh}
            className="
              group 
              flex 
              items-center 
              gap-2 
              px-4 
              py-2 
              rounded 
              bg-primary 
              text-white 
              hover:bg-primary-light 
              transition-colors
            "
          >
            <FiRefreshCw className="transition-transform duration-300 group-hover:rotate-90" />
            <span>Refresh Dashboard</span>
          </button>
        )}
        <button
          onClick={handleNextPage}
          className="
            group 
            flex 
            items-center 
            gap-2 
            px-4 
            py-2 
            rounded 
            bg-secondary 
            text-white 
            hover:bg-secondary-dark 
            transition-colors
          "
        >
          <span>Next Section</span>
          <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
