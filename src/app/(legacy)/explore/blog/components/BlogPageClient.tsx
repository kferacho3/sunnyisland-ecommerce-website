// app/explore/blog/BlogPageClient.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaFilter, FaNewspaper, FaSearch } from "react-icons/fa";
import { GiChiliPepper, GiFireBowl } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi";
import { MdViewList } from "react-icons/md";
import BlogPostsSection from "./BlogPostSection";
interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  association: string;
  image: string;
}

interface BlogPageClientProps {
  articles: Article[];
  viewMode: "grid" | "list";
  query: string;
  filterParam: string;
}

export default function BlogPageClient({
  articles,
  viewMode,
  query,
  filterParam,
}: BlogPageClientProps) {
  const urlParams =
    (query ? `&q=${encodeURIComponent(query)}` : "") +
    (filterParam ? `&filter=${encodeURIComponent(filterParam)}` : "");
  const gridLink = `/explore/blog?view=grid${urlParams}`;
  const listLink = `/explore/blog?view=list${urlParams}`;

  return (
    <>
      {/* Premium Hero Section */}
      <section className="relative min-h-[70vh] overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
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
            className="absolute top-20 right-10 text-orange-400/20"
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
            className="absolute bottom-20 left-10 text-red-400/20"
          >
            <GiFireBowl className="text-7xl" />
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] text-center px-4 py-20">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-6"
          >
            <div className="relative">
              <Image
                src="/media/SunnyIslandSymbol.png"
                alt="Sunny Island Symbol"
                width={120}
                height={120}
                className="object-contain"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-orange-400/30 blur-3xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <HiSparkles className="text-3xl text-yellow-400 mx-auto mb-4" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            The Spice Chronicles
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl font-light"
          >
            Explore curated articles, podcasts, and research about peppers,
            spice culture, and culinary heat from around the world
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href="/contact/inquiries">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FaNewspaper />
                  Submit Your Story
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 grid grid-cols-3 gap-8 text-center"
          >
            {[
              { number: articles.length, label: "Articles" },
              { number: "50+", label: "Sources" },
              { number: "24/7", label: "Updates" },
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-3xl font-bold text-orange-400">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 flex justify-center">
            <div className="w-1 h-3 bg-white/50 mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Premium Search & Filter Section */}
      <section className="sticky top-0 z-30 bg-white dark:bg-gray-900 shadow-xl backdrop-blur-xl bg-opacity-95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            {/* Search Bar */}
            <form
              method="GET"
              action="/explore/blog"
              className="flex-1 w-full lg:w-auto"
            >
              <div className="relative group">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type="text"
                  name="q"
                  placeholder="Search spicy content..."
                  defaultValue={query}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:outline-none transition-all duration-300 shadow-lg focus:shadow-xl"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Search
                </motion.button>
              </div>
            </form>

            {/* Filter Dropdown */}
            <div className="relative group">
              <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors pointer-events-none" />
              <select
                name="filter"
                defaultValue={filterParam || ""}
                onChange={(e) => {
                  const newFilter = e.target.value;
                  window.location.href = `/explore/blog?view=${viewMode}${query ? `&q=${encodeURIComponent(query)}` : ""}${newFilter ? `&filter=${encodeURIComponent(newFilter)}` : ""}`;
                }}
                className="pl-12 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:outline-none transition-all duration-300 shadow-lg cursor-pointer appearance-none"
              >
                <option value="">All Sources</option>
                <option value="Wikipedia">Wikipedia</option>
                <option value="Crossref">Crossref</option>
                <option value="OpenAlex">OpenAlex</option>
                <option value="Internet Archive">Internet Archive</option>
                <option value="iTunes">Podcasts</option>
                <option value="Numbers API">Fun Facts</option>
              </select>
              <GiChiliPepper className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none" />
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 shadow-lg">
              <Link href={gridLink}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                      : "text-gray-500 hover:text-orange-500"
                  }`}
                >
                  <BsFillGrid3X3GapFill className="text-xl" />
                </motion.button>
              </Link>
              <Link href={listLink}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                      : "text-gray-500 hover:text-orange-500"
                  }`}
                >
                  <MdViewList className="text-xl" />
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Active Filters */}
          {(query || filterParam) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 flex flex-wrap gap-2"
            >
              {query && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium"
                >
                  Search: "{query}"
                  <Link
                    href={`/explore/blog?view=${viewMode}${filterParam ? `&filter=${encodeURIComponent(filterParam)}` : ""}`}
                    className="hover:text-orange-900 dark:hover:text-orange-100"
                  >
                    ×
                  </Link>
                </motion.span>
              )}
              {filterParam && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-medium"
                >
                  Filter: {filterParam}
                  <Link
                    href={`/explore/blog?view=${viewMode}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
                    className="hover:text-red-900 dark:hover:text-red-100"
                  >
                    ×
                  </Link>
                </motion.span>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4 py-12">
          {/* Results Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              {query || filterParam ? "Search Results" : "All Articles"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Found{" "}
              <span className="font-bold text-orange-500">
                {articles.length}
              </span>{" "}
              spicy articles
            </p>
          </motion.div>

          {/* Articles Section */}
          <BlogPostsSection articles={articles} viewMode={viewMode} />
        </div>
      </main>

      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-2xl hover:shadow-3xl transition-all duration-300"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      </motion.div>

      {/* Custom Styles */}
      <style jsx global>{`
        /* Google Fonts */
        @import url("https://fonts.googleapis.com/css2?family=Anton&display=swap");

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f97316, #ef4444);
          border-radius: 5px;
        }

        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Premium select styling */
        select {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23f97316' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 2.5rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
        }

        /* Article card hover effects */
        .article-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .article-card:hover {
          transform: translateY(-4px);
        }

        /* Loading animation */
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Gradient text animation */
        @keyframes gradient {
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

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        /* Dark mode adjustments */
        @media (prefers-color-scheme: dark) {
          select {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fb923c' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          }
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }

        /* Performance optimizations */
        .gpu-accelerated {
          transform: translateZ(0);
          will-change: transform;
          backface-visibility: hidden;
        }

        /* Focus styles */
        input:focus,
        select:focus,
        button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(251, 146, 60, 0.3);
        }

        /* Print styles */
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
