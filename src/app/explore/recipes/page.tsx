"use client";

import ExitIcon from "@/components/globalComponents/ExitIcon";
import { useTheme } from "@/context/ThemeContext";
import { recipes as establishedRecipesData } from "@/data/recipes";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiHeart,
  FiPlus,
  FiRefreshCw,
  FiStar,
  FiTrendingDown,
  FiTrendingUp,
} from "react-icons/fi";
import {
  GiAvocado,
  GiBellPepper,
  GiBrandyBottle,
  GiChicken,
  GiCutLemon,
  GiFriedFish,
  GiGarlic,
  GiHerbsBundle,
  GiHotSpices,
  GiMeat,
  GiPlantSeed,
  GiSaltShaker,
  GiStabbedNote,
  GiTomato,
} from "react-icons/gi";
import { TbSaladFilled } from "react-icons/tb";

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
  hearts?: number; // Tracks total hearts across all users
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
// Enhanced Ingredient Icon Helper
// ─────────────────────────────────────────────

function getIngredientIcon(ingredient: string): React.ReactNode {
  const lower = ingredient.toLowerCase();
  if (lower.includes("chicken")) return <GiChicken size={18} />;
  if (lower.includes("fish")) return <GiFriedFish size={18} />;
  if (lower.includes("salad")) return <TbSaladFilled size={18} />;
  if (lower.includes("avocado")) return <GiAvocado size={18} />;
  if (lower.includes("tomato")) return <GiTomato size={18} />;
  if (lower.includes("onion")) return <GiGarlic size={18} />;
  if (lower.includes("lemon")) return <GiCutLemon size={18} />;
  if (lower.includes("olive oil")) return <GiBrandyBottle size={18} />;
  if (lower.includes("salt and pepper")) return <GiSaltShaker size={18} />;
  if (lower.includes("black pepper")) return <GiSaltShaker size={18} />;
  if (lower.includes("salt")) return <GiSaltShaker size={18} />;
  if (lower.includes("eggplant")) return <GiPlantSeed size={18} />;
  if (lower.includes("seasoning")) return <GiHerbsBundle size={18} />;
  if (lower.includes("garlic")) return <GiGarlic size={18} />;
  if (lower.includes("bell pepper")) return <GiBellPepper size={18} />;

  if (
    lower.includes("beef") ||
    lower.includes("pork") ||
    lower.includes("lamb")
  )
    return <GiMeat size={18} />;
  if (
    lower.includes("herb") ||
    lower.includes("basil") ||
    lower.includes("oregano")
  )
    return <GiHerbsBundle size={18} />;

  return <GiHotSpices size={18} />;
}

// ─────────────────────────────────────────────
// Get AWS Image URL by Recipe ID
// ─────────────────────────────────────────────

function getAWSImageUrl(recipeId: number) {
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
// Dynamic Title Class for Card
// ─────────────────────────────────────────────

function getDynamicTitleClass(title: string) {
  // Adjust text size based on length
  if (title.length > 40) return "text-xs";
  if (title.length > 30) return "text-sm";
  if (title.length > 20) return "text-base";
  return "text-lg";
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
  const [featuredRecipe, setFeaturedRecipe] = useState<Recipe | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // For sorting by hearts
  const [sortAscending, setSortAscending] = useState(true);

  // For pagination
  const RECIPES_PER_PAGE = 20;
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [visibleCount, setVisibleCount] = useState(RECIPES_PER_PAGE);

  // Track which recipes have hearts from the local user (IDs)
  const [userHearted, setUserHearted] = useState<number[]>([]);

  // Load hearts and favorites from local storage
  useEffect(() => {
    const storedFav = localStorage.getItem("favoriteRecipes");
    if (storedFav) setFavorites(JSON.parse(storedFav));

    const storedHearts = localStorage.getItem("heartedRecipes");
    if (storedHearts) {
      const parsedHearts = JSON.parse(storedHearts) as {
        userHearts: number[];
      };
      setUserHearted(parsedHearts.userHearts || []);
    }
  }, []);

  // Save hearts and favorites to local storage
  useEffect(() => {
    localStorage.setItem("favoriteRecipes", JSON.stringify(favorites));
    localStorage.setItem(
      "heartedRecipes",
      JSON.stringify({
        userHearts: userHearted,
      }),
    );
  }, [favorites, userHearted]);

  // Initialize and shuffle on mount (with default hearts count = 0)
  useEffect(() => {
    const establishedRecipes: Recipe[] = establishedRecipesData.map((r) => ({
      ...r,
      rating: 0.0,
      hearts: 0, // Set a default value for hearts
    }));
    const shuffled = shuffleArray(establishedRecipes);
    setAllRecipes(shuffled);
    if (shuffled.length > 0) {
      setFeaturedRecipe(shuffled[0]); // Set the first as default featured
    }
  }, []);

  // Toggle favorite
  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id],
    );
  };

  // Handle rating
  const handleRating = (id: number) => {
    if (!isLoggedIn) alert("Please sign in or sign up to rate recipes!");
    else console.log(`User rated recipe ${id}`);
  };

  // Hearting a recipe (for "like" count)
  const handleHeart = (recipeId: number) => {
    // Any user can heart. We'll store in local storage for demonstration
    setAllRecipes((prev) =>
      prev.map((r) =>
        r.id === recipeId ? { ...r, hearts: (r.hearts || 0) + 1 } : r,
      ),
    );
    setUserHearted((prev) => [...prev, recipeId]);
  };

  // Remove heart (un-heart) a recipe
  const handleUnheart = (recipeId: number) => {
    setAllRecipes((prev) =>
      prev.map((r) =>
        r.id === recipeId && r.hearts && r.hearts > 0
          ? { ...r, hearts: r.hearts - 1 }
          : r,
      ),
    );
    setUserHearted((prev) => prev.filter((id) => id !== recipeId));
  };

  // Check if user has hearted
  const userHasHearted = (recipeId: number) => {
    return userHearted.includes(recipeId);
  };

  // Open and close modal
  const openModal = (recipe: Recipe) => setSelectedRecipe(recipe);
  const closeModal = () => setSelectedRecipe(null);

  // Show more recipes
  const loadMoreRecipes = () => {
    setVisibleCount((prev) => prev + RECIPES_PER_PAGE);
  };

  // Re-randomize
  const refreshRecipes = () => {
    setAllRecipes((prev) => shuffleArray(prev));
    setVisibleCount(RECIPES_PER_PAGE);
  };

  // Sort recipes by hearts
  const toggleSortHearts = () => {
    setSortAscending((prev) => !prev);
    const sorted = [...allRecipes].sort((a, b) => {
      const heartsA = a.hearts || 0;
      const heartsB = b.hearts || 0;
      return sortAscending ? heartsB - heartsA : heartsA - heartsB;
    });
    setAllRecipes(sorted);
    setFeaturedRecipe(sorted[0] || null);
  };

  // Single-click on a card to become the featured
  const handleCardClick = (recipe: Recipe) => {
    setFeaturedRecipe(recipe);
  };

  // Double-click to open the modal
  const handleCardDoubleClick = (recipe: Recipe) => {
    openModal(recipe);
  };

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
      <main className="min-h-screen mt-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-8">
        {/* Header */}
        <header className="mt-10 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Spice up any recipe below with{" "}
            <span className="text-secondary">Sunny Island Pepper Sauce</span>
          </h1>
        </header>

        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient
              id="established-gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFB300" />
              <stop offset="50%" stopColor="#FFC107" />
              <stop offset="100%" stopColor="#FFA000" />
            </linearGradient>
            <linearGradient
              id="original-gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#006400" />
              <stop offset="80%" stopColor="#8B4513" />
              <stop offset="100%" stopColor="#FFB300" />
            </linearGradient>
          </defs>
        </svg>

        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setActiveTab("established")}
            className={`group px-4 py-2 rounded flex items-center gap-2 ${
              activeTab === "established"
                ? "bg-secondary text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            } transition-colors duration-300`}
          >
            <GiStabbedNote className="established-icon" />
            <span>Established Recipes</span>
          </button>
          <button
            onClick={() => setActiveTab("original")}
            className={`group px-4 py-2 rounded flex items-center gap-2 ${
              activeTab === "original"
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            } transition-colors duration-300`}
          >
            <TbSaladFilled className="original-icon" />
            <span>Sunny Island Original Recipes</span>
          </button>
        </div>

        <style jsx>{`
          :global(.established-icon),
          :global(.original-icon) {
            transition: fill 0.3s;
            fill: currentColor;
          }
          :global(.group:hover .established-icon) {
            fill: url(#established-gradient);
          }
          :global(.group:hover .original-icon) {
            fill: url(#original-gradient);
          }
        `}</style>

        {/* Main Content */}
        {activeTab === "established" ? (
          allRecipes.length > 0 &&
          featuredRecipe && (
            <>
              <div className="space-y-6">
                <FeaturedLayout
                  featuredRecipe={featuredRecipe}
                  otherRecipes={visibleRecipes.filter(
                    (r) => r.id !== featuredRecipe.id,
                  )}
                  onFavorite={toggleFavorite}
                  onRating={handleRating}
                  favorites={favorites}
                  onOpenModal={openModal}
                  onSingleClick={handleCardClick}
                  onDoubleClick={handleCardDoubleClick}
                  userHasHearted={userHasHearted}
                  onHeart={handleHeart}
                  onUnheart={handleUnheart}
                />
              </div>
              {/* Action Buttons: Refresh, Sort by Hearts, Load More */}
              <div className="flex flex-wrap justify-center mt-6 gap-4">
                <button
                  onClick={refreshRecipes}
                  className="group flex items-center gap-2 px-4 py-2 bg-primary text-white rounded transition-all duration-300 hover:opacity-90"
                >
                  <FiRefreshCw className="transition-transform duration-300 group-hover:rotate-90" />
                  <span>Refresh</span>
                </button>

                <button
                  onClick={toggleSortHearts}
                  className="group flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded transition-all duration-300 hover:opacity-90"
                >
                  {sortAscending ? <FiTrendingUp /> : <FiTrendingDown />}
                  <span>Sort by Hearts</span>
                </button>

                {visibleCount < allRecipes.length && (
                  <button
                    onClick={loadMoreRecipes}
                    className="group flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded transition-all duration-300 hover:opacity-90"
                  >
                    <span>Load More</span>
                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
                  </button>
                )}
              </div>
            </>
          )
        ) : (
          <OriginalRecipesPlaceholder />
        )}

        {/* Modal */}
        <AnimatePresence mode="wait">
          {selectedRecipe && (
            <RecipeModal
              recipe={selectedRecipe}
              onClose={closeModal}
              onRating={handleRating}
              isLoggedIn={isLoggedIn}
              userHasHearted={userHasHearted}
              onHeart={handleHeart}
              onUnheart={handleUnheart}
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
  onSingleClick: (recipe: Recipe) => void;
  onDoubleClick: (recipe: Recipe) => void;
  userHasHearted: (id: number) => boolean;
  onHeart: (id: number) => void;
  onUnheart: (id: number) => void;
};

const FeaturedLayout: React.FC<FeaturedLayoutProps> = ({
  featuredRecipe,
  otherRecipes,
  onFavorite,
  onRating,
  favorites,
  onOpenModal,
  onSingleClick,
  onDoubleClick,
  userHasHearted,
  onHeart,
  onUnheart,
}) => {
  const handleFeaturedFavorite = () => {
    onFavorite(featuredRecipe.id);
  };

  const handleFeaturedRating = () => {
    onRating(featuredRecipe.id);
  };

  const handleFeaturedHeart = () => {
    if (userHasHearted(featuredRecipe.id)) {
      onUnheart(featuredRecipe.id);
    } else {
      onHeart(featuredRecipe.id);
    }
  };

  return (
    <div className="space-y-10">
      {/* Featured Recipe Card (Bigger, more visual) */}
      <div className="relative bg-white dark:bg-gray-800 rounded shadow overflow-hidden flex flex-col md:flex-row h-auto">
        <div className="relative w-full md:w-1/2 h-72 md:h-96">
          <Image
            src={getAWSImageUrl(featuredRecipe.id)}
            alt={featuredRecipe.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 p-6 flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {featuredRecipe.title}
          </h2>
          <p className="text-sm md:text-base mb-6 line-clamp-5">
            {featuredRecipe.description}
          </p>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-semibold">
              {featuredRecipe.rating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-500">NOT YET RATED</span>
            <button
              onClick={handleFeaturedRating}
              className="p-1 border rounded hover:bg-gray-100"
            >
              <FiStar />
            </button>
          </div>
          {/* Hearts Row */}
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={handleFeaturedHeart}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FiHeart
                size={20}
                className={
                  userHasHearted(featuredRecipe.id)
                    ? "text-red-500"
                    : "text-gray-400"
                }
              />
            </button>
            <span>{featuredRecipe.hearts || 0}</span>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <img
              src={
                countryFlags[featuredRecipe.country] || countryFlags["Unknown"]
              }
              alt={featuredRecipe.country}
              width={28}
              height={28}
              className="rounded-full"
            />
            <span className="text-sm">{featuredRecipe.country}</span>
          </div>
          <div className="mt-auto flex items-center justify-between">
            <button
              onClick={handleFeaturedFavorite}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                favorites.includes(featuredRecipe.id)
                  ? "text-pink-600"
                  : "text-gray-400"
              }`}
            >
              <FiHeart size={24} />
            </button>
            <button
              onClick={() => onOpenModal(featuredRecipe)}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-semibold"
            >
              <span>View Full Recipe</span>
              <FiPlus className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll for Other Recipes */}
      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-4">
          {otherRecipes.map((recipe) => (
            <div key={recipe.id} className="flex-shrink-0">
              <RecipeCard
                recipe={recipe}
                onFavorite={onFavorite}
                onRating={onRating}
                isFavorited={favorites.includes(recipe.id)}
                onOpenModal={onOpenModal}
                userHasHearted={userHasHearted}
                onHeart={onHeart}
                onUnheart={onUnheart}
                // Single-click to feature, double-click to open modal
                onClick={() => onSingleClick(recipe)}
                onDoubleClick={() => onDoubleClick(recipe)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Recipe Card Component (Fixed Size)
// ─────────────────────────────────────────────

type RecipeCardProps = {
  recipe: Recipe;
  onFavorite: (id: number) => void;
  onRating: (id: number) => void;
  isFavorited: boolean;
  onOpenModal: (recipe: Recipe) => void;
  userHasHearted: (id: number) => boolean;
  onHeart: (id: number) => void;
  onUnheart: (id: number) => void;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
};

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onFavorite,
  onRating,
  isFavorited,
  onOpenModal,
  userHasHearted,
  onHeart,
  onUnheart,
  onClick,
  onDoubleClick,
}) => {
  const titleClass = getDynamicTitleClass(recipe.title);

  const handleFavorite = () => {
    onFavorite(recipe.id);
  };

  const handleRating = () => {
    onRating(recipe.id);
  };

  const handleHeartToggle = () => {
    if (userHasHearted(recipe.id)) {
      onUnheart(recipe.id);
    } else {
      onHeart(recipe.id);
    }
  };

  return (
    <div
      className="relative bg-white dark:bg-gray-800 rounded-md shadow overflow-hidden flex flex-col w-56 h-80 cursor-pointer"
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <div className="relative w-full h-32">
        <Image
          src={getAWSImageUrl(recipe.id)}
          alt={recipe.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-3 flex-grow flex flex-col">
        <h3
          className={`${titleClass} font-bold mb-1 leading-tight line-clamp-2`}
        >
          {recipe.title}
        </h3>
        {/* Rating */}
        <div className="flex items-center mb-2">
          <span className="text-md font-semibold">
            {recipe.rating.toFixed(1)}
          </span>
          <span className="text-xs text-gray-500 ml-1">/ 5</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRating();
            }}
            className="ml-2 p-1 border rounded hover:bg-gray-100"
          >
            <FiStar />
          </button>
        </div>
        {/* Hearts */}
        <div className="flex items-center mb-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleHeartToggle();
            }}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
          >
            <FiHeart
              size={18}
              className={
                userHasHearted(recipe.id) ? "text-red-500" : "text-gray-400"
              }
            />
          </button>
          <span className="ml-1 text-sm">{recipe.hearts || 0}</span>
        </div>
        {/* Country */}
        <div className="flex items-center mb-2">
          <img
            src={countryFlags[recipe.country] || countryFlags["Unknown"]}
            alt={recipe.country}
            width={20}
            height={20}
            className="rounded-full"
          />
          <span className="ml-2 text-xs">{recipe.country}</span>
        </div>
        <div className="flex-grow" />
        {/* Bottom actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleFavorite();
            }}
            className={`p-1 rounded hover:bg-gray-100 transition-colors ${
              isFavorited ? "text-pink-600" : "text-gray-400"
            }`}
          >
            <FiHeart size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(recipe);
            }}
            className="flex items-center text-xs text-blue-600 hover:text-blue-800"
          >
            <span>Full</span>
            <FiPlus className="ml-1" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Recipe Modal
// ─────────────────────────────────────────────

type RecipeModalProps = {
  recipe: Recipe;
  onClose: () => void;
  onRating: (id: number) => void;
  isLoggedIn: boolean;
  userHasHearted: (id: number) => boolean;
  onHeart: (id: number) => void;
  onUnheart: (id: number) => void;
};

const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  onClose,
  onRating,
  isLoggedIn,
  userHasHearted,
  onHeart,
  onUnheart,
}) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<
    "description" | "ingredients" | "instructions"
  >("description");

  const handleRating = () => {
    if (!isLoggedIn) {
      alert("Please sign in or sign up to rate recipes!");
    } else onRating(recipe.id);
  };

  const handleHeartToggle = () => {
    if (userHasHearted(recipe.id)) {
      onUnheart(recipe.id);
    } else {
      onHeart(recipe.id);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden w-full max-w-3xl max-h-full shadow-lg"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <ExitIcon onClose={onClose} isDarkMode={isDark} />
        <div className="relative">
          <div className="relative w-full h-64">
            <Image
              src={getAWSImageUrl(recipe.id)}
              alt={recipe.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="p-4 flex flex-col space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">{recipe.title}</h2>
            <div className="flex items-center gap-4 mb-4">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <span className="text-xl font-semibold">
                  {recipe.rating.toFixed(1)}
                </span>
                <span className="text-xs text-gray-500">/5</span>
                <button
                  onClick={handleRating}
                  className="ml-2 p-1 border rounded hover:bg-gray-100"
                >
                  <FiStar />
                </button>
              </div>

              {/* Hearts */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleHeartToggle}
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                >
                  <FiHeart
                    size={20}
                    className={
                      userHasHearted(recipe.id)
                        ? "text-red-500"
                        : "text-gray-400"
                    }
                  />
                </button>
                <span>{recipe.hearts || 0}</span>
              </div>

              {/* Country */}
              <div className="flex items-center gap-2">
                <img
                  src={countryFlags[recipe.country] || countryFlags["Unknown"]}
                  alt={recipe.country}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="text-sm">{recipe.country}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b mb-2">
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

          {/* Tab Content */}
          <div className="relative h-64 overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeTab === "description" && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 p-1 space-y-2 text-sm"
                >
                  <p>{recipe.description}</p>
                </motion.div>
              )}
              {activeTab === "ingredients" && (
                <motion.div
                  key="ingredients"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 p-1 text-sm"
                >
                  <div className="flex flex-col space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span>{getIngredientIcon(ingredient)}</span>
                        <span>{ingredient}</span>
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
                  className="absolute inset-0 p-1 text-sm"
                >
                  <ol className="list list-inside space-y-1">
                    {recipe.instructions.map((step, index) => (
                      <li key={index}>
                        {index + 1} - {step}
                      </li>
                    ))}
                  </ol>
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
// Placeholder for Original Recipes
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
