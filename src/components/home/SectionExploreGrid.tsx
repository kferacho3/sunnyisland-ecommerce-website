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
   TILE INTERFACE
   Each tile has row/col for the top-left corner, rowSpan/colSpan for size, and
   optionally which widget is assigned to that shape.
--------------------------------------------------------------------------- */
interface Tile {
  row: number; // top-left row (0-based)
  col: number; // top-left col (0-based)
  rowSpan: number;
  colSpan: number;
  widget?: Widget; // widget assigned to this shape
}

/* ============================================================================
   1) EXACT 24 PATTERNS FOR 5-WIDGETS IN A 3×8 GRID
   ----------------------------------------------------------------------------
   We have 5 "shapes" by dimension:
     • 2×6 (largest, area=12)
     • 3×2 (area=6)
     • 1×3 (area=3)
     • 1×2 (area=2)
     • 1×1 (area=1)
   The 24 ways come from:
     • 3×2 piece on LEFT or RIGHT (2 ways)
     • 2×6 piece in TOP 2 rows or BOTTOM 2 rows (2 ways)
     • 3 one-high pieces in leftover row arranged in any permutation (3!=6 ways)
   => 2×2×6 = 24 possible layouts.

   The function below returns an array [T_2x6, T_3x2, T_1x3, T_1x2, T_1x1]
   with actual row/col placements. The caller can then map them to widgets.
============================================================================ */
function getRandomFiveShapePositions3x8(): Tile[] {
  // 1) Which side for the 3×2 piece?
  const side3x2 = Math.random() < 0.5 ? "left" : "right"; // leftmost 2 or rightmost 2 columns

  // 2) Top or bottom for the 2×6 piece?
  const top2x6 = Math.random() < 0.5 ? "top" : "bottom"; // top 2 rows or bottom 2 rows

  // Prepare the 3×2 shape
  const tile3x2: Tile =
    side3x2 === "left"
      ? { row: 0, col: 0, rowSpan: 3, colSpan: 2 }
      : { row: 0, col: 6, rowSpan: 3, colSpan: 2 };

  // The remaining 6 columns (for the 2×6 piece plus the leftover row) start at col=2 or col=0
  const blockStartCol = side3x2 === "left" ? 2 : 0;

  // Prepare the 2×6 shape
  // If "top", it occupies rows 0..1 => leftover row is row=2
  // If "bottom", it occupies rows 1..2 => leftover row is row=0
  const tile2x6: Tile =
    top2x6 === "top"
      ? { row: 0, col: blockStartCol, rowSpan: 2, colSpan: 6 }
      : { row: 1, col: blockStartCol, rowSpan: 2, colSpan: 6 };

  const leftoverRow = top2x6 === "top" ? 2 : 0;

  // 3) The leftover row is 6 columns wide. We'll place 1×1, 1×2, 1×3 in a random permutation left to right.
  const shapesOneHigh = [
    { rowSpan: 1, colSpan: 1 },
    { rowSpan: 1, colSpan: 2 },
    { rowSpan: 1, colSpan: 3 },
  ];
  shuffleArray(shapesOneHigh); // random permutation

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

  // Return them in a consistent order by "largest shape first":
  // [ 2×6, 3×2, 1×3, 1×2, 1×1 ]
  // We'll identify which leftover tile is 1×3, 1×2, 1×1 by area
  const leftoverTiles = [tile1xA, tile1xB, tile1xC].sort(
    (t1, t2) => t2.rowSpan * t2.colSpan - t1.rowSpan * t1.colSpan,
  );
  // leftoverTiles is now [1×3, 1×2, 1×1].

  const tile1x3 = leftoverTiles[0];
  const tile1x2 = leftoverTiles[1];
  const tile1x1 = leftoverTiles[2];

  // Return them in the shape order:
  // index 0 => 2×6, index 1 => 3×2, index 2 => 1×3, index 3 => 1×2, index 4 => 1×1
  return [tile2x6, tile3x2, tile1x3, tile1x2, tile1x1];
}

/* ============================================================================
   2) SPECIAL HANDLING FOR PAGE=0 WITH 5 WIDGETS
   ----------------------------------------------------------------------------
   We must force the largest piece (2×6) to be "Products". Meanwhile, we have
   two other permanent widgets: "Scoville Scale" and "Foods all around!",
   plus 2 secondary widgets. We'll assign them to the other 4 shapes in some
   random order, or you can fix "Scoville" to 3×2, "Foods" to 1×3, etc.
   Below, we just ensure "Products" = tile(2×6). The other permanent ones
   fill the next shapes, and the last 2 shapes go to secondaries.
============================================================================ */
function getFiveWidgetLayoutPage0(
  // We know the first 3 permanent widgets are: [Products, Scoville, Foods]
  // plus 2 secondary for a total of 5.
  scoville: Widget,
  foods: Widget,
  secondaries: Widget[],
): Tile[] {
  // 1) generate random positions
  const tiles = getRandomFiveShapePositions3x8();
  // tiles order: [2x6, 3x2, 1x3, 1x2, 1x1]

  // 2) assign "Products" to the largest shape (index 0 => 2×6).
  const tile2x6 = tiles[0];
  tile2x6.widget = {
    id: 101,
    title: "Products",
    route: "/explore/products",
    image: "https://picsum.photos/id/101/500/500",
  };

  // 3) We have 4 shapes left and 4 widgets to fill: [Scoville, Foods, secondaryA, secondaryB].
  //   For variety, shuffle them if you like. We'll always keep them in the same order if you prefer.
  //   Let's place them in shape order:
  //   index=1 => 3×2, index=2 => 1×3, index=3 => 1×2, index=4 => 1×1
  //   We'll do scoville -> 3×2, foods -> 1×3, then the two secondaries -> 1×2, 1×1

  tiles[1].widget = scoville; // 3×2
  tiles[2].widget = foods; // 1×3
  tiles[3].widget = secondaries[0]; // 1×2
  tiles[4].widget = secondaries[1]; // 1×1

  return tiles;
}

/* ============================================================================
   3) SUBSEQUENT PAGES (page > 0) WITH 5 WIDGETS
   ----------------------------------------------------------------------------
   We still do the 24 random 3×8 tilings, but there's no forced assignment of
   "Products" to the largest piece. We can just assign the 5 chosen widgets
   in shape order (largest -> next -> ...). Or randomize them if you prefer.
============================================================================ */
function getFiveWidgetLayoutPageOther(widgets: Widget[]): Tile[] {
  // Generate shape layout
  const tiles = getRandomFiveShapePositions3x8();
  // tiles in shape order: [2×6, 3×2, 1×3, 1×2, 1×1]

  // For variety, just sort the 5 widgets randomly:
  const assignedWidgets = shuffleArray([...widgets]);

  // Then assign them largest to smallest
  tiles.forEach((tile, i) => {
    tile.widget = assignedWidgets[i];
  });

  return tiles;
}

/* ============================================================================
   4) 3 WIDGETS => A SINGLE ROW OF LENGTH 6
   ----------------------------------------------------------------------------
   The shapes are: 1×1, 1×2, 1×3 (which together cover 6 columns).
   We generate one of the 6 permutations of these shapes left-to-right, then
   assign the 3 chosen widgets in that shape order.
============================================================================ */
function getThreeWidgetSingleRowLayout(widgets: Widget[]): Tile[] {
  // We want row=0, col from 0..5 in some permutation for [1×3, 1×2, 1×1].
  // Sort these shapes randomly:
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

  // Assign the 3 widgets in that left-to-right order:
  tiles.forEach((tile, i) => {
    tile.widget = widgets[i];
  });
  return tiles;
}

/* ============================================================================
   5) BACKUP BACKTRACKING FOR 1, 2, or 4 WIDGETS (3×5 GRID)
   ----------------------------------------------------------------------------
   We keep your existing "generateUniqueTiling" approach for smaller sets, or
   you can simply define a simpler fallback. Shown below is your original code,
   slightly shortened. Then we assign widgets in the order they appear.
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
   MASTER LAYOUT FUNCTION
   ----------------------------------------------------------------------------
   This chooses which approach to use, based on:
   - widgetCount
   - whether we're on page=0 or not
   - etc.
   Returns an array of Tiles (each with a widget assigned).
============================================================================ */
function generateLayout(
  widgetCount: number,
  pageIndex: number,
  widgets: Widget[],
): Tile[] {
  // 1) If we have exactly 5 widgets, we do the special 3×8 logic
  if (widgetCount === 5) {
    if (pageIndex === 0) {
      // We know the first page: 3 permanent (Products, Scoville, Foods) + 2 secondaries
      // The code below ensures the largest shape is always "Products".
      const scoville = widgets.find((w) => w.id === 102)!; // "Scoville Scale"
      const foods = widgets.find((w) => w.id === 103)!; // "Foods all around!"
      const secondaries = widgets.filter(
        (w) => w.id !== 101 && w.id !== 102 && w.id !== 103,
      ); // The 2 leftover are from secondary array

      return getFiveWidgetLayoutPage0(scoville, foods, secondaries);
    } else {
      // For subsequent pages with 5 widgets, no forced "Products" => 2×6
      return getFiveWidgetLayoutPageOther(widgets);
    }
  }

  // 2) If we have exactly 3 widgets => single row of width 6, with 1×1 + 1×2 + 1×3
  if (widgetCount === 3) {
    return getThreeWidgetSingleRowLayout(widgets);
  }

  // 3) Otherwise (1, 2, or 4 widgets), do your original 3×5 backtracking
  const numRows = 3,
    numCols = 5;
  const tiling = generateUniqueTiling(numRows, numCols, widgetCount);
  if (tiling) {
    // Assign each tile a widget from the array
    const shuffled = shuffleArray([...widgets]);
    for (let i = 0; i < tiling.length; i++) {
      tiling[i].widget = shuffled[i];
    }
    return tiling;
  }

  // 4) Fallback: each widget = one vertical slice
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
   WIDGET CARD COMPONENT
   ----------------------------------------------------------------------------
   Applies a border, rounding, and the image-scale hover effect *within* the
   container so that the image does not overflow the rounded edges.
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
   SECTION EXPLORE GRID
   ----------------------------------------------------------------------------
   1) Decide how many widgets to display per "page" (here, 5 for a big layout).
   2) On page=0, we combine permanentWidgets + a few secondary to reach 5.
      We place "Products" in the largest shape.
   3) On page>0, we pick the next 5 from secondaries, or fewer if desired.
   4) If the user eventually lands on a "last section" with just 3 widgets,
      we do the single row of length 6 and get 6 permutations. 
============================================================================ */
export default function SectionExploreGrid() {
  const widgetsPerPage = 5; // or test with 3 for your last-section scenario
  const [shuffledSecondaries, setShuffledSecondaries] = useState<Widget[]>(() =>
    shuffleArray([...secondaryWidgetsData]),
  );
  const [secondaryPage, setSecondaryPage] = useState(0);

  // Assemble the current page's widgets
  // Page 0 => permanentWidgets + enough from secondaries to reach 5
  // Page > 0 => just 5 from secondaries (or 3, etc., if you want a special last section)
  let dashboardWidgets: Widget[] = [];
  if (secondaryPage === 0) {
    // first page => include all permanent ones:
    //   [Products(101), Scoville(102), Foods(103)] + 2 from secondaries
    const needed = widgetsPerPage - permanentWidgets.length;
    dashboardWidgets = [
      ...permanentWidgets,
      ...shuffledSecondaries.slice(0, needed),
    ];
  } else {
    // subsequent pages => 5 from secondaries
    const start = (secondaryPage - 1) * widgetsPerPage;
    dashboardWidgets = shuffledSecondaries.slice(start, start + widgetsPerPage);
  }

  // If you want to demonstrate a last page with exactly 3:
  //   let's say if (secondaryPage === 2) => 3 secondaries only, etc.
  //   (Adjust logic as you see fit. This is just an example.)
  // For instance:
  // if (secondaryPage === 2) {
  //   dashboardWidgets = shuffledSecondaries.slice(10, 13);
  // }

  const widgetCount = dashboardWidgets.length;

  //  Decide the layout only after mount to avoid SSR mismatch
  const [mounted, setMounted] = useState(false);
  const [tiles, setTiles] = useState<Tile[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      // Generate a new layout whenever page or widget selection changes
      const newLayout = generateLayout(
        widgetCount,
        secondaryPage,
        dashboardWidgets,
      );
      setTiles(newLayout);
    }
  }, [mounted, widgetCount, secondaryPage, shuffledSecondaries]);

  // Figure out final grid dimensions
  // - If we used 5 widgets in a 3×8, or we used 3 in a 1×6, or 3×5 for smaller sets, etc.
  // We'll just scan the assigned tiles to see the bounding box:
  let maxRow = 0,
    maxCol = 0;
  for (const t of tiles) {
    maxRow = Math.max(maxRow, t.row + t.rowSpan);
    maxCol = Math.max(maxCol, t.col + t.colSpan);
  }
  // Each "cell" ~ 100px wide
  const cellSize = 100;
  const containerWidth = maxCol * cellSize;
  const containerHeight = maxRow * cellSize;

  // Pagination
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

  // Avoid SSR mismatch by not rendering the grid until mounted
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

      {/* The grid container */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${maxCol}, 1fr)`,
          gridTemplateRows: `repeat(${maxRow}, ${cellSize}px)`,
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
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Refresh Dashboard
          </button>
        )}
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Next Section →
        </button>
      </div>
    </section>
  );
}
