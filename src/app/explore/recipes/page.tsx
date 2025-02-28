"use client";

import ExitIcon from "@/components/globalComponents/ExitIcon";
import { useTheme } from "@/context/ThemeContext";
import { recipes as establishedRecipesData } from "@/data/recipes";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FiHeart, FiPlus, FiStar } from "react-icons/fi";
import {
  GiCheeseWedge,
  GiChiliPepper,
  GiFoodChain,
  GiGarlic,
  GiHerbsBundle,
  GiMeat,
  GiOni,
  GiTomato,
} from "react-icons/gi";

// ─────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────

export type Recipe = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  country: string;
  cuisine: string;
  ingredients: string[];
  instructions: string[];
  rating: number; // Will be set to 0.0 by default
};

// ─────────────────────────────────────────────
// Country Flags Mapping
// ─────────────────────────────────────────────

const countryFlags: { [key: string]: string } = {
  "Trinidad & Tobago": "https://flagsapi.com/TT/flat/64.png",
  India: "https://flagsapi.com/IN/flat/64.png",
  Jamaica: "https://flagsapi.com/JM/flat/64.png",
  Mexico: "https://flagsapi.com/MX/flat/64.png",
  Caribbean: "https://flagsapi.com/UN/flat/64.png",
  China: "https://flagsapi.com/CN/flat/64.png",
  Japan: "https://flagsapi.com/JP/flat/64.png",
  Korea: "https://flagsapi.com/KR/flat/64.png",
  Ethiopia: "https://flagsapi.com/ET/flat/64.png",
  Cuba: "https://flagsapi.com/CU/flat/64.png",
  "Dominican Republic": "https://flagsapi.com/DO/flat/64.png",
  "Puerto Rico": "https://flagsapi.com/PR/flat/64.png",
  Nigeria: "https://flagsapi.com/NG/flat/64.png",
  Unknown: "https://flagsapi.com/UN/flat/64.png",
  Haiti: "https://flagsapi.com/HT/flat/64.png",
  Thailand: "https://flagsapi.com/TH/flat/64.png",
  Spain: "https://flagsapi.com/ES/flat/64.png",
  Vietnam: "https://flagsapi.com/VN/flat/64.png",
  Malaysia: "https://flagsapi.com/MY/flat/64.png",
  Indonesia: "https://flagsapi.com/TH/flat/64.png",
  Lebanon: "https://flagsapi.com/LB/flat/64.png",
  Greece: "https://flagsapi.com/GR/flat/64.png",
  Turkey: "https://flagsapi.com/TR/flat/64.png",
  Italy: "https://flagsapi.com/IT/flat/64.png",
  France: "https://flagsapi.com/FR/flat/64.png",
  Morocco: "https://flagsapi.com/MA/flat/64.png",
  Egypt: "https://flagsapi.com/EG/flat/64.png",
  Brazil: "https://flagsapi.com/BR/flat/64.png",
  Argentina: "https://flagsapi.com/AR/flat/64.png",
  Peru: "https://flagsapi.com/PE/flat/64.png",
  Guyana: "https://flagsapi.com/GY/flat/64.png",
  Philippines: "https://flagsapi.com/PH/flat/64.png",
  Singapore: "https://flagsapi.com/SG/flat/64.png",
  Israel: "https://flagsapi.com/IL/flat/64.png",
  Portugal: "https://flagsapi.com/PT/flat/64.png",
  "South Africa": "https://flagsapi.com/ZA/flat/64.png",
  USA: "https://flagsapi.com/US/flat/64.png",
};

// ─────────────────────────────────────────────
// Helper: Get Appropriate Ingredient Icon
// ─────────────────────────────────────────────

function getIngredientIcon(ingredient: string): React.ReactNode {
  const lower = ingredient.toLowerCase();
  if (lower.includes("tomato")) return <GiTomato size={20} />;
  if (lower.includes("onion")) return <GiOni size={20} />;
  if (lower.includes("garlic")) return <GiGarlic size={20} />;
  if (lower.includes("pepper")) return <GiChiliPepper size={20} />;
  if (lower.includes("cheese")) return <GiCheeseWedge size={20} />;
  if (lower.includes("meat")) return <GiMeat size={20} />;
  if (lower.includes("basil") || lower.includes("herb"))
    return <GiHerbsBundle size={20} />;
  return <GiFoodChain size={20} />;
}

// ─────────────────────────────────────────────
// Helper: Get AWS Image URL by Recipe ID
// ─────────────────────────────────────────────

function getAWSImageUrl(recipeId: number) {
  // e.g., for recipe ID 50: "RecipeId50.webp"
  return `https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/recipes/RecipeId${recipeId}.webp`;
}

// ─────────────────────────────────────────────
// Shuffle Utility
// ─────────────────────────────────────────────

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ─────────────────────────────────────────────
// Main Recipes Page Component
// ─────────────────────────────────────────────

const RecipesPage = () => {
  const [activeTab, setActiveTab] = useState<"established" | "original">(
    "established",
  );
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // For pagination
  const RECIPES_PER_PAGE = 20; // 20 at a time (including the featured recipe)
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [visibleCount, setVisibleCount] = useState(RECIPES_PER_PAGE);

  useEffect(() => {
    const storedFav = localStorage.getItem("favoriteRecipes");
    if (storedFav) setFavorites(JSON.parse(storedFav));
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteRecipes", JSON.stringify(favorites));
  }, [favorites]);

  // Initialize and shuffle on mount
  useEffect(() => {
    const establishedRecipes: Recipe[] = establishedRecipesData.map((r) => ({
      ...r,
      rating: 0.0,
    }));
    // Shuffle the recipes so they appear in random order
    const shuffled = shuffleArray(establishedRecipes);
    setAllRecipes(shuffled);
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id],
    );
  };

  const handleRating = (id: number) => {
    if (!isLoggedIn) alert("Please sign in or sign up to rate recipes!");
    else console.log(`User rated recipe ${id}`);
  };

  const openModal = (recipe: Recipe) => setSelectedRecipe(recipe);
  const closeModal = () => setSelectedRecipe(null);

  // Show more recipes in increments of 20
  const loadMoreRecipes = () => {
    setVisibleCount((prev) => prev + RECIPES_PER_PAGE);
  };

  // Re-randomize the recipes
  const refreshRecipes = () => {
    setAllRecipes((prev) => {
      const shuffled = shuffleArray(prev);
      return shuffled;
    });
    setVisibleCount(RECIPES_PER_PAGE);
  };

  // We only display up to 'visibleCount' recipes
  const visibleRecipes = allRecipes.slice(0, visibleCount);

  return (
    <>
      <Head>
        <title>Recipes | Sunny Island Pepper Sauce</title>
        <meta
          name="description"
          content="Spice up any recipe with Sunny Island Pepper Sauce. Explore our established recipes and submit your own!"
        />
      </Head>
      <main className="min-h-screen mt-20 t-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-8">
        {/* Header */}
        <header className="mt-10 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Spice up any recipe below with{" "}
            <span className="text-pink-600">Sunny Island Pepper Sauce</span>
          </h1>
        </header>
        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setActiveTab("established")}
            className={`px-4 py-2 rounded ${
              activeTab === "established"
                ? "bg-pink-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            }`}
          >
            Established Recipes
          </button>
          <button
            onClick={() => setActiveTab("original")}
            className={`px-4 py-2 rounded ${
              activeTab === "original"
                ? "bg-pink-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            }`}
          >
            Sunny Island Original Recipes
          </button>
        </div>

        {/* Main Content */}
        {activeTab === "established" ? (
          allRecipes.length > 0 && (
            <>
              {/* Buttons for "Refresh" and "Load More" */}
              <div className="flex justify-center mb-6 gap-4">
                <button
                  onClick={refreshRecipes}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Refresh (Re-Randomize)
                </button>
                {visibleCount < allRecipes.length && (
                  <button
                    onClick={loadMoreRecipes}
                    className="px-4 py-2 bg-pink-600 text-white rounded"
                  >
                    Load More
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {visibleRecipes.length > 0 && (
                  <FeaturedLayout
                    featuredRecipe={visibleRecipes[0]}
                    otherRecipes={visibleRecipes.slice(1)}
                    onFavorite={toggleFavorite}
                    onRating={handleRating}
                    favorites={favorites}
                    onOpenModal={openModal}
                  />
                )}
              </div>
            </>
          )
        ) : (
          <OriginalRecipesPlaceholder />
        )}

        <AnimatePresence mode="wait">
          {selectedRecipe && (
            <RecipeModal
              recipe={selectedRecipe}
              onClose={closeModal}
              onRating={handleRating}
              isLoggedIn={isLoggedIn}
            />
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default RecipesPage;

// ─────────────────────────────────────────────
// Featured Layout Component
// ─────────────────────────────────────────────

type FeaturedLayoutProps = {
  featuredRecipe: Recipe;
  otherRecipes: Recipe[];
  onFavorite: (id: number) => void;
  onRating: (id: number) => void;
  favorites: number[];
  onOpenModal: (recipe: Recipe) => void;
};

const FeaturedLayout: React.FC<FeaturedLayoutProps> = ({
  featuredRecipe,
  otherRecipes,
  onFavorite,
  onRating,
  favorites,
  onOpenModal,
}) => {
  return (
    <div>
      {/* Featured Recipe Card */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white dark:bg-gray-800 rounded shadow overflow-hidden">
        <div className="relative w-full md:w-1/2 h-64">
          <Image
            src={getAWSImageUrl(featuredRecipe.id)}
            alt={featuredRecipe.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 p-4 flex flex-col">
          <h2 className="text-2xl font-bold mb-2">{featuredRecipe.title}</h2>
          <p className="text-sm mb-4 line-clamp-3">
            {featuredRecipe.description}
          </p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl font-semibold">
              {featuredRecipe.rating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-500">NOT YET RATED</span>
            <button
              onClick={() => onRating(featuredRecipe.id)}
              className="p-1 border rounded"
            >
              <FiStar />
            </button>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <img
              src={
                countryFlags[featuredRecipe.country] || countryFlags["Unknown"]
              }
              alt={featuredRecipe.country}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-sm">{featuredRecipe.country}</span>
          </div>
          <div className="mt-auto flex items-center justify-between">
            <button
              onClick={() => onFavorite(featuredRecipe.id)}
              className={`p-2 rounded ${
                favorites.includes(featuredRecipe.id)
                  ? "text-pink-600"
                  : "text-gray-400"
              }`}
            >
              <FiHeart size={20} />
            </button>
            <button
              onClick={() => onOpenModal(featuredRecipe)}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <span>View Full Recipe</span>
              <FiPlus className="ml-1" />
            </button>
          </div>
        </div>
      </div>
      {/* Horizontal Scroll for Other Recipes */}
      <div className="overflow-x-auto">
        <div className="flex space-x-4">
          {otherRecipes.map((recipe) => (
            <div key={recipe.id} className="min-w-[250px]">
              <RecipeCard
                recipe={recipe}
                onFavorite={onFavorite}
                onRating={onRating}
                isFavorited={favorites.includes(recipe.id)}
                onOpenModal={onOpenModal}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Recipe Card Component
// ─────────────────────────────────────────────

type RecipeCardProps = {
  recipe: Recipe;
  onFavorite: (id: number) => void;
  onRating: (id: number) => void;
  isFavorited: boolean;
  onOpenModal: (recipe: Recipe) => void;
};

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onFavorite,
  onRating,
  isFavorited,
  onOpenModal,
}) => {
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded shadow overflow-hidden flex flex-col">
      <div className="relative h-48">
        <Image
          src={getAWSImageUrl(recipe.id)}
          alt={recipe.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-bold mb-1">{recipe.title}</h3>
        <div className="flex items-center mb-2">
          <span className="text-xl font-semibold">
            {recipe.rating.toFixed(1)}
          </span>
          <span className="text-xs text-gray-500 ml-1">NOT YET RATED</span>
          <button
            onClick={() => onRating(recipe.id)}
            className="ml-2 p-1 border rounded"
          >
            <FiStar />
          </button>
        </div>
        <div className="flex items-center mb-2">
          <img
            src={countryFlags[recipe.country] || countryFlags["Unknown"]}
            alt={recipe.country}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="ml-2 text-sm">{recipe.country}</span>
        </div>
        <div className="flex-grow" />
        <div className="flex items-center justify-between">
          <button
            onClick={() => onFavorite(recipe.id)}
            className={`p-2 rounded ${
              isFavorited ? "text-pink-600" : "text-gray-400"
            }`}
          >
            <FiHeart size={20} />
          </button>
          <button
            onClick={() => onOpenModal(recipe)}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <span>View Full Recipe</span>
            <FiPlus className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Recipe Modal Component
// ─────────────────────────────────────────────

type RecipeModalProps = {
  recipe: Recipe;
  onClose: () => void;
  onRating: (id: number) => void;
  isLoggedIn: boolean;
};

const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  onClose,
  onRating,
  isLoggedIn,
}) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<
    "description" | "ingredients" | "instructions"
  >("description");

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden w-full max-w-3xl max-h-full"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <ExitIcon onClose={onClose} isDarkMode={isDark} />
        <div className="relative">
          <div className="relative h-64">
            <Image
              src={getAWSImageUrl(recipe.id)}
              alt={recipe.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{recipe.title}</h2>
          <div className="flex items-center mb-4">
            <span className="text-xl font-semibold">
              {recipe.rating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-500 ml-1">NOT YET RATED</span>
            <button
              onClick={() => {
                if (!isLoggedIn)
                  alert("Please sign in or sign up to rate recipes!");
                else onRating(recipe.id);
              }}
              className="ml-2 p-1 border rounded"
            >
              <FiStar />
            </button>
          </div>
          <div className="flex items-center mb-4">
            <img
              src={countryFlags[recipe.country] || countryFlags["Unknown"]}
              alt={recipe.country}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="ml-2 text-sm">{recipe.country}</span>
          </div>
          <div className="border-b mb-4">
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveTab("description")}
                className={`pb-2 transition-colors duration-300 ${
                  activeTab === "description"
                    ? "border-b-2 border-pink-600"
                    : "text-gray-500"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("ingredients")}
                className={`pb-2 transition-colors duration-300 ${
                  activeTab === "ingredients"
                    ? "border-b-2 border-pink-600"
                    : "text-gray-500"
                }`}
              >
                Ingredients
              </button>
              <button
                onClick={() => setActiveTab("instructions")}
                className={`pb-2 transition-colors duration-300 ${
                  activeTab === "instructions"
                    ? "border-b-2 border-pink-600"
                    : "text-gray-500"
                }`}
              >
                Instructions
              </button>
            </nav>
          </div>
          <div className="relative h-64 overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeTab === "description" && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <p className="text-sm">{recipe.description}</p>
                </motion.div>
              )}
              {activeTab === "ingredients" && (
                <motion.div
                  key="ingredients"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <div className="grid grid-cols-1 gap-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center">
                        <div className="p-2 rounded-full bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text mr-2">
                          {getIngredientIcon(ingredient)}
                        </div>
                        <span className="text-sm">{ingredient}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
              {activeTab === "instructions" && (
                <motion.div
                  key="instructions"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <div className="list-decimal pl-5">
                    {recipe.instructions.map((step, index) => (
                      <p key={index} className="text-sm mb-2">
                        {step}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// Original Recipes Placeholder Component
// ─────────────────────────────────────────────

const OriginalRecipesPlaceholder: React.FC = () => {
  return (
    <div className="text-center p-6 bg-gray-100 dark:bg-gray-700 rounded max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Sunny Island Original Recipes
      </h2>
      <p className="text-lg mb-6">Coming Soon!</p>
      <section className="max-w-2xl mx-auto text-left">
        <h2 className="text-xl md:text-2xl font-bold mb-2 uppercase tracking-wider">
          Recipe Sponsorship
        </h2>
        <p className="max-w-xl text-sm md:text-base leading-relaxed mb-4">
          Have a culturally inspiring dish that features our pepper sauce? We’d
          love to showcase it on our website with your personal touch and
          credit! Just follow our guidelines:
        </p>
        <ul className="text-left max-w-lg mx-auto list-disc list-inside space-y-1 text-sm md:text-base">
          <li>
            Ensure the dish highlights <em>Sunny Island Pepper Sauce</em>.
          </li>
          <li>
            Use a <strong>non-black table</strong> for your photo background.
          </li>
          <li>
            Photos must pass our <strong>human quality check</strong> for
            clarity &amp; presentation.
          </li>
          <li>Keep it culturally authentic and creative!</li>
        </ul>
        <p className="max-w-xl text-sm md:text-base leading-relaxed mt-4">
          Once approved, we’ll tag you on your dedicated recipe page!
        </p>
        <button
          className="mt-4 px-5 py-2 bg-pink-600 hover:bg-pink-500 rounded text-white font-semibold uppercase"
          onClick={() => alert("Redirect to Recipe Submission page?")}
        >
          Submit Your Recipe
        </button>
      </section>
    </div>
  );
};

export { RecipesPage };
