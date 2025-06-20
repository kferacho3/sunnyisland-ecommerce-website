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
  FiCamera,
  FiCheck,
  FiChevronRight,
  FiClock,
  FiHeart,
  FiRefreshCw,
  FiStar,
  FiTrendingDown,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import {
  GiAvocado,
  GiBellPepper,
  GiBrandyBottle,
  GiChicken,
  GiChiliPepper,
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
  rating: number;
  hearts?: number;
  prepTime?: string;
  servings?: number;
  difficulty?: "Easy" | "Medium" | "Hard";
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
  if (lower.includes("chicken"))
    return <GiChicken className="text-orange-600" size={18} />;
  if (lower.includes("fish"))
    return <GiFriedFish className="text-blue-600" size={18} />;
  if (lower.includes("salad"))
    return <TbSaladFilled className="text-green-600" size={18} />;
  if (lower.includes("avocado"))
    return <GiAvocado className="text-green-700" size={18} />;
  if (lower.includes("tomato"))
    return <GiTomato className="text-red-600" size={18} />;
  if (lower.includes("onion"))
    return <GiGarlic className="text-purple-600" size={18} />;
  if (lower.includes("lemon"))
    return <GiCutLemon className="text-yellow-600" size={18} />;
  if (lower.includes("olive oil"))
    return <GiBrandyBottle className="text-amber-700" size={18} />;
  if (lower.includes("salt"))
    return <GiSaltShaker className="text-gray-600" size={18} />;
  if (lower.includes("eggplant"))
    return <GiPlantSeed className="text-purple-700" size={18} />;
  if (lower.includes("seasoning"))
    return <GiHerbsBundle className="text-green-700" size={18} />;
  if (lower.includes("garlic"))
    return <GiGarlic className="text-yellow-100" size={18} />;
  if (lower.includes("bell pepper"))
    return <GiBellPepper className="text-red-500" size={18} />;
  if (
    lower.includes("beef") ||
    lower.includes("pork") ||
    lower.includes("lamb")
  )
    return <GiMeat className="text-red-700" size={18} />;
  if (
    lower.includes("herb") ||
    lower.includes("basil") ||
    lower.includes("oregano")
  )
    return <GiHerbsBundle className="text-green-600" size={18} />;
  return <GiHotSpices className="text-orange-500" size={18} />;
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
  const [sortAscending, setSortAscending] = useState(true);
  const RECIPES_PER_PAGE = 20;
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [visibleCount, setVisibleCount] = useState(RECIPES_PER_PAGE);
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

  // Initialize and shuffle on mount
  useEffect(() => {
    const establishedRecipes: Recipe[] = establishedRecipesData.map((r) => ({
      ...r,
      rating: 0.0,
      hearts: Math.floor(Math.random() * 50), // Demo: random hearts
      prepTime: `${Math.floor(Math.random() * 45) + 15} mins`,
      servings: Math.floor(Math.random() * 4) + 2,
      difficulty: ["Easy", "Medium", "Hard"][
        Math.floor(Math.random() * 3)
      ] as Recipe["difficulty"],
    }));
    const shuffled = shuffleArray(establishedRecipes);
    setAllRecipes(shuffled);
    if (shuffled.length > 0) {
      setFeaturedRecipe(shuffled[0]);
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

  // Hearting a recipe
  const handleHeart = (recipeId: number) => {
    setAllRecipes((prev) =>
      prev.map((r) =>
        r.id === recipeId ? { ...r, hearts: (r.hearts || 0) + 1 } : r,
      ),
    );
    setUserHearted((prev) => [...prev, recipeId]);
  };

  // Remove heart
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

      {/* Premium Hero Section */}
      <section className="relative min-h-[50vh] overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 mt-16">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6B6B' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 right-10 text-red-400/20"
          >
            <GiChiliPepper className="text-8xl" />
          </motion.div>
          <motion.div
            animate={{
              y: [0, 30, 0],
              rotate: [0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 left-10 text-orange-400/20"
          >
            <GiHotSpices className="text-7xl" />
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[50vh] text-center px-4 py-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white"
          >
            Spice up any recipe with{" "}
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
              Sunny Island Pepper Sauce
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl"
          >
            Discover culinary inspiration from around the world, enhanced with
            our signature heat
          </motion.p>
        </div>
      </section>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Premium Tab Navigation */}
        <div className="sticky top-0 z-30 bg-white dark:bg-gray-900 shadow-lg backdrop-blur-xl bg-opacity-95">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab("established")}
                className={`
                  relative px-8 py-3 rounded-full font-semibold transition-all duration-300
                  ${
                    activeTab === "established"
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  <GiStabbedNote className="text-xl" />
                  Established Recipes
                </span>
                {activeTab === "established" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab("original")}
                className={`
                  relative px-8 py-3 rounded-full font-semibold transition-all duration-300
                  ${
                    activeTab === "original"
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  <TbSaladFilled className="text-xl" />
                  Sunny Island Originals
                </span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {activeTab === "established" ? (
            allRecipes.length > 0 &&
            featuredRecipe && (
              <>
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

                {/* Premium Action Buttons */}
                <div className="flex flex-wrap justify-center mt-12 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={refreshRecipes}
                    className="group flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <FiRefreshCw className="transition-transform duration-300 group-hover:rotate-180" />
                    <span className="font-semibold">Shuffle Recipes</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleSortHearts}
                    className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {sortAscending ? <FiTrendingUp /> : <FiTrendingDown />}
                    <span className="font-semibold">Sort by Popularity</span>
                  </motion.button>

                  {visibleCount < allRecipes.length && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={loadMoreRecipes}
                      className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <span className="font-semibold">Load More</span>
                      <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.button>
                  )}
                </div>
              </>
            )
          ) : (
            <OriginalRecipesPlaceholder />
          )}
        </div>

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
    <div className="space-y-12">
      {/* Premium Featured Recipe Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative h-96 md:h-[500px]">
            <Image
              src={getAWSImageUrl(featuredRecipe.id)}
              alt={featuredRecipe.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Floating Badge */}
            <div className="absolute top-6 left-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
              >
                <span className="text-sm font-bold text-orange-600">
                  Featured Recipe
                </span>
              </motion.div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                {featuredRecipe.title}
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleFeaturedFavorite}
                className={`p-3 rounded-full transition-colors ${
                  favorites.includes(featuredRecipe.id)
                    ? "bg-pink-100 text-pink-600"
                    : "bg-gray-100 text-gray-400 hover:text-gray-600"
                }`}
              >
                <FiHeart
                  size={24}
                  fill={
                    favorites.includes(featuredRecipe.id)
                      ? "currentColor"
                      : "none"
                  }
                />
              </motion.button>
            </div>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <div className="flex items-center gap-2">
                <img
                  src={
                    countryFlags[featuredRecipe.country] ||
                    countryFlags["Unknown"]
                  }
                  alt={featuredRecipe.country}
                  width={24}
                  height={24}
                  className="rounded"
                />
                <span className="text-gray-600 dark:text-gray-400">
                  {featuredRecipe.country}
                </span>
              </div>

              {featuredRecipe.prepTime && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <FiClock />
                  <span>{featuredRecipe.prepTime}</span>
                </div>
              )}

              {featuredRecipe.servings && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <FiUsers />
                  <span>{featuredRecipe.servings} servings</span>
                </div>
              )}

              {featuredRecipe.difficulty && (
                <span
                  className={`
                  px-3 py-1 rounded-full text-xs font-semibold
                  ${featuredRecipe.difficulty === "Easy" ? "bg-green-100 text-green-800" : ""}
                  ${featuredRecipe.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" : ""}
                  ${featuredRecipe.difficulty === "Hard" ? "bg-red-100 text-red-800" : ""}
                `}
                >
                  {featuredRecipe.difficulty}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-4 leading-relaxed">
              {featuredRecipe.description}
            </p>

            {/* Rating & Hearts */}
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(featuredRecipe.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {featuredRecipe.rating > 0
                    ? featuredRecipe.rating.toFixed(1)
                    : "Not rated yet"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleFeaturedHeart}
                  className={`p-2 rounded-full transition-colors ${
                    userHasHearted(featuredRecipe.id)
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <FiHeart
                    size={20}
                    fill={
                      userHasHearted(featuredRecipe.id)
                        ? "currentColor"
                        : "none"
                    }
                  />
                </motion.button>
                <span className="text-sm font-semibold">
                  {featuredRecipe.hearts || 0} likes
                </span>
              </div>
            </div>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpenModal(featuredRecipe)}
              className="mt-auto w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              View Full Recipe
              <FiChevronRight />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Other Recipes Grid */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          More Recipes to Explore
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {otherRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onFavorite={onFavorite}
              onRating={onRating}
              isFavorited={favorites.includes(recipe.id)}
              onOpenModal={onOpenModal}
              userHasHearted={userHasHearted}
              onHeart={onHeart}
              onUnheart={onUnheart}
              onClick={() => onSingleClick(recipe)}
              onDoubleClick={() => onDoubleClick(recipe)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Premium Recipe Card Component
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
  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite(recipe.id);
  };

  const handleHeartToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (userHasHearted(recipe.id)) {
      onUnheart(recipe.id);
    } else {
      onHeart(recipe.id);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer group"
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={getAWSImageUrl(recipe.id)}
          alt={recipe.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavorite}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isFavorited
                ? "bg-pink-500/80 text-white"
                : "bg-white/80 text-gray-700 hover:bg-white"
            }`}
          >
            <FiHeart size={16} fill={isFavorited ? "currentColor" : "none"} />
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white line-clamp-2 group-hover:text-orange-600 transition-colors">
          {recipe.title}
        </h3>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <img
              src={countryFlags[recipe.country] || countryFlags["Unknown"]}
              alt={recipe.country}
              width={16}
              height={16}
              className="rounded"
            />
            <span>{recipe.country}</span>
          </div>

          {recipe.prepTime && (
            <div className="flex items-center gap-1">
              <FiClock size={14} />
              <span>{recipe.prepTime}</span>
            </div>
          )}
        </div>

        {/* Rating & Hearts */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-4 h-4 ${i < Math.floor(recipe.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleHeartToggle}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <FiHeart
                size={18}
                fill={userHasHearted(recipe.id) ? "currentColor" : "none"}
              />
            </motion.button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {recipe.hearts || 0}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// Premium Recipe Modal
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <ExitIcon onClose={onClose} isDarkMode={isDark} />

        {/* Modal Header with Image */}
        <div className="relative h-72">
          <Image
            src={getAWSImageUrl(recipe.id)}
            alt={recipe.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              {recipe.title}
            </h2>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <img
                  src={countryFlags[recipe.country] || countryFlags["Unknown"]}
                  alt={recipe.country}
                  width={20}
                  height={20}
                  className="rounded"
                />
                <span>{recipe.country}</span>
              </div>
              {recipe.prepTime && (
                <div className="flex items-center gap-1">
                  <FiClock />
                  <span>{recipe.prepTime}</span>
                </div>
              )}
              {recipe.servings && (
                <div className="flex items-center gap-1">
                  <FiUsers />
                  <span>{recipe.servings} servings</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8">
          {/* Actions Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleRating}
                      className="text-yellow-400 hover:text-yellow-500"
                    >
                      <FiStar
                        className={`w-5 h-5 ${i < Math.floor(recipe.rating) ? "fill-current" : ""}`}
                      />
                    </motion.button>
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {recipe.rating > 0
                    ? recipe.rating.toFixed(1)
                    : "Rate this recipe"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleHeartToggle}
                  className={`p-2 rounded-full transition-colors ${
                    userHasHearted(recipe.id)
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <FiHeart
                    size={20}
                    fill={userHasHearted(recipe.id) ? "currentColor" : "none"}
                  />
                </motion.button>
                <span className="text-sm font-semibold">
                  {recipe.hearts || 0}
                </span>
              </div>
            </div>

            {recipe.difficulty && (
              <span
                className={`
                px-4 py-1.5 rounded-full text-sm font-semibold
                ${recipe.difficulty === "Easy" ? "bg-green-100 text-green-800" : ""}
                ${recipe.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" : ""}
                ${recipe.difficulty === "Hard" ? "bg-red-100 text-red-800" : ""}
              `}
              >
                {recipe.difficulty}
              </span>
            )}
          </div>

          {/* Premium Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <nav className="flex gap-8">
              {["description", "ingredients", "instructions"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`
                    pb-3 px-1 text-sm font-semibold capitalize transition-all duration-300 relative
                    ${
                      activeTab === tab
                        ? "text-orange-600 dark:text-orange-400"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    }
                  `}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeModalTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 dark:bg-orange-400"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px] max-h-[400px] overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="wait">
              {activeTab === "description" && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="prose prose-gray dark:prose-invert max-w-none"
                >
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {recipe.description}
                  </p>
                </motion.div>
              )}

              {activeTab === "ingredients" && (
                <motion.div
                  key="ingredients"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  {recipe.ingredients.map((ingredient, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span className="flex-shrink-0">
                        {getIngredientIcon(ingredient)}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {ingredient}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === "instructions" && (
                <motion.div
                  key="instructions"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {recipe.instructions.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4"
                    >
                      <span className="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {step}
                      </p>
                    </motion.div>
                  ))}
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
// Premium Original Recipes Placeholder
// ─────────────────────────────────────────────

const OriginalRecipesPlaceholder: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12 shadow-xl">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-4"
          >
            <TbSaladFilled className="text-green-600 dark:text-green-400 text-4xl" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Sunny Island Original Recipes
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Exclusive culinary creations featuring our signature pepper sauce
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full mb-8">
            <GiChiliPepper />
            <span className="font-semibold">Coming Soon</span>
          </div>
        </div>

        {/* Recipe Sponsorship Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <GiHotSpices className="text-orange-500" />
            Recipe Sponsorship Program
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Have a culturally inspiring dish that features our pepper sauce?
            We'd love to showcase it on our website with your personal touch and
            credit! Join our community of passionate cooks and share your
            culinary creations.
          </p>

          <div className="space-y-4 mb-8">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Submission Guidelines:
            </h4>
            <div className="grid gap-3">
              {[
                {
                  icon: <GiChiliPepper />,
                  text: "Feature Sunny Island Pepper Sauce prominently in your recipe",
                },
                {
                  icon: <FiCamera />,
                  text: "Use a non-black table surface for photo backgrounds",
                },
                {
                  icon: <FiCheck />,
                  text: "Ensure photos pass our quality standards for clarity & presentation",
                },
                {
                  icon: <FiHeart />,
                  text: "Keep recipes culturally authentic and creative",
                },
              ].map((guideline, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <span className="text-orange-500">{guideline.icon}</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {guideline.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Once approved, we'll feature your recipe with full credit and tag
            you on our social media!
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => (window.location.href = "/contact/inquiries")}
            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            Submit Your Recipe
            <FiArrowRight />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Add custom scrollbar styles
const styles = `
  <style jsx global>{
    /* Custom scrollbar */
    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(251, 146, 60, 0.5);
      border-radius: 4px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(251, 146, 60, 0.7);
    }
    
    /* Dark mode scrollbar */
    .dark .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
    }
    
    .dark .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(251, 146, 60, 0.5);
    }
    
    .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(251, 146, 60, 0.7);
    }
  }</style>
`;
