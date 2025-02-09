// pages/recipes.tsx
"use client"; // If using Next.js 13 App Router. Otherwise, remove if on Next.js pages router
import recipesData, { Recipe } from "@/data/recipes";
import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useMemo, useState } from "react";
import { FiFilter, FiGrid, FiList, FiSearch, FiStar } from "react-icons/fi";
import { GiShrimp } from "react-icons/gi"; // random icon for "featured" view

const Recipes: NextPage = () => {
  const [layout, setLayout] = useState<"featured" | "grid" | "list">("featured");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCuisine, setFilterCuisine] = useState("All");
  const [sortBy, setSortBy] = useState<"name" | "rating">("name");

  // Copy the data to state if we want to update rating or do other manipulations
  const [recipes, setRecipes] = useState<Recipe[]>(recipesData);

  // Unique cuisines for filter
  const allCuisines = ["All", ...new Set(recipesData.map((r) => r.cuisine))];

  const filteredRecipes = useMemo(() => {
    // Filter by cuisine
    let result = recipes;
    if (filterCuisine !== "All") {
      result = result.filter((r) => r.cuisine === filterCuisine);
    }

    // Search by title or description
    if (searchTerm.trim() !== "") {
      result = result.filter((r) => {
        const text = (r.title + r.description).toLowerCase();
        return text.includes(searchTerm.toLowerCase());
      });
    }

    // Sort by rating or name
    if (sortBy === "name") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "rating") {
      result = [...result].sort((b, a) => a.rating - b.rating); 
      // highest rating first
    }
    return result;
  }, [filterCuisine, searchTerm, sortBy, recipes]);

  // Handler to increment rating
  const handleRating = (id: number) => {
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, rating: r.rating + 1 } : r
      )
    );
  };

  // Main featured recipe is the first recipe in `filteredRecipes`, or fallback
  const mainFeatured = filteredRecipes[0] || null;
  const restFeatured = mainFeatured
    ? filteredRecipes.slice(1)
    : filteredRecipes;

  return (
    <>
      <Head>
        <title>Sunny Island Pepper | Recipes</title>
        <meta
          name="description"
          content="Delicious recipes featuring our Caribbean pepper sauce, from traditional dishes to global flavors."
        />
      </Head>

      <main className="min-h-screen bg-white p-4 sm:p-8 dark:bg-black dark:text-white">
        <h1 className="text-2xl sm:text-4xl font-semibold mb-4">Recipes</h1>

        {/* Mini Nav / Toolbar */}
        <div className="mb-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Left side: Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-2 top-2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter by Cuisine */}
            <div className="relative">
              <FiFilter className="absolute left-2 top-2 text-gray-400" />
              <select
                className="pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-black"
                value={filterCuisine}
                onChange={(e) => setFilterCuisine(e.target.value)}
              >
                {allCuisines.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base">Sort by:</span>
              <button
                onClick={() => setSortBy("name")}
                className={`px-2 py-1 rounded ${
                  sortBy === "name" ? "bg-secondary text-black" : ""
                }`}
              >
                Name
              </button>
              <button
                onClick={() => setSortBy("rating")}
                className={`px-2 py-1 rounded ${
                  sortBy === "rating" ? "bg-secondary text-black" : ""
                }`}
              >
                Rating
              </button>
            </div>
          </div>

          {/* Right side: Layout Toggles */}
          <div className="flex gap-2">
            <button
              onClick={() => setLayout("featured")}
              className={`p-2 rounded ${
                layout === "featured" ? "bg-secondary text-black" : ""
              }`}
            >
              <GiShrimp />
            </button>
            <button
              onClick={() => setLayout("grid")}
              className={`p-2 rounded ${
                layout === "grid" ? "bg-secondary text-black" : ""
              }`}
            >
              <FiGrid />
            </button>
            <button
              onClick={() => setLayout("list")}
              className={`p-2 rounded ${
                layout === "list" ? "bg-secondary text-black" : ""
              }`}
            >
              <FiList />
            </button>
          </div>
        </div>

        {/* Display Layout */}
        <AnimatePresence>
          {layout === "featured" && mainFeatured && (
            <motion.section
              key="featured"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-8"
            >
              <FeaturedLayout
                mainRecipe={mainFeatured}
                others={restFeatured}
                onRate={handleRating}
              />
            </motion.section>
          )}

          {layout === "grid" && (
            <motion.section
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GridLayout recipes={filteredRecipes} onRate={handleRating} />
            </motion.section>
          )}

          {layout === "list" && (
            <motion.section
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ListLayout recipes={filteredRecipes} onRate={handleRating} />
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default Recipes;

// ----- Sub-Components -----

interface FeaturedLayoutProps {
  mainRecipe: Recipe;
  others: Recipe[];
  onRate: (id: number) => void;
}

function FeaturedLayout({ mainRecipe, others, onRate }: FeaturedLayoutProps) {
  return (
    <div>
      {/* Main Featured */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <img
          src={mainRecipe.imageUrl}
          alt={mainRecipe.title}
          className="w-full sm:w-1/2 rounded shadow"
        />
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            {mainRecipe.title}
          </h2>
          <p className="text-sm sm:text-base mb-4">{mainRecipe.description}</p>
          <p className="text-xs sm:text-sm mb-2">
            <strong>Country:</strong> {mainRecipe.country} | 
            <strong className="ml-1">Cuisine:</strong> {mainRecipe.cuisine}
          </p>

          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm">Rating: {mainRecipe.rating}</p>
            <button
              className="px-2 py-1 text-xs rounded bg-secondary text-black"
              onClick={() => onRate(mainRecipe.id)}
            >
              <FiStar />
            </button>
          </div>

          <a
            href={mainRecipe.link}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-secondary text-sm sm:text-base"
          >
            View Full Recipe
          </a>
        </div>
      </div>

      {/* Others horizontally */}
      <div className="overflow-x-auto flex gap-4">
        {others.map((recipe) => (
          <div
            key={recipe.id}
            className="min-w-[200px] bg-white dark:bg-gray-800 rounded shadow p-2"
          >
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-32 object-cover rounded"
            />
            <h3 className="text-sm font-semibold mt-2">{recipe.title}</h3>
            <div className="flex items-center gap-1 text-xs my-1">
              <span>Rating: {recipe.rating}</span>
              <button
                className="border rounded p-1"
                onClick={() => onRate(recipe.id)}
              >
                <FiStar />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface GridLayoutProps {
  recipes: Recipe[];
  onRate: (id: number) => void;
}

function GridLayout({ recipes, onRate }: GridLayoutProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {recipes.map((recipe) => (
        <motion.div
          key={recipe.id}
          layout
          className="bg-white dark:bg-gray-800 p-2 rounded shadow"
        >
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-32 object-cover rounded"
          />
          <h3 className="text-sm sm:text-base font-semibold mt-2">
            {recipe.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
            {recipe.description}
          </p>
          <div className="flex items-center gap-1 text-xs my-2">
            <span>Rating: {recipe.rating}</span>
            <button
              className="border rounded p-1"
              onClick={() => onRate(recipe.id)}
            >
              <FiStar />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

interface ListLayoutProps {
  recipes: Recipe[];
  onRate: (id: number) => void;
}

function ListLayout({ recipes, onRate }: ListLayoutProps) {
  return (
    <div className="flex flex-col gap-4">
      {recipes.map((recipe) => (
        <motion.div
          key={recipe.id}
          layout
          className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-800 p-2 rounded shadow"
        >
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full sm:w-48 h-32 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="text-sm sm:text-base font-semibold">{recipe.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2">
              {recipe.description}
            </p>
            <p className="text-xs sm:text-sm">
              <strong>Country:</strong> {recipe.country} |{" "}
              <strong>Cuisine:</strong> {recipe.cuisine}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs sm:text-sm">Rating: {recipe.rating}</span>
              <button
                className="px-2 py-1 text-xs rounded bg-secondary text-black flex items-center"
                onClick={() => onRate(recipe.id)}
              >
                <FiStar />
              </button>
            </div>
            <a
              href={recipe.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block underline hover:text-secondary text-xs sm:text-sm"
            >
              View Full Recipe
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
