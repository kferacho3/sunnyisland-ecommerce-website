"use client";
import ArticleGrid from "@/components/blog/ArticleGrid";
import ArticleList from "@/components/blog/ArticleList";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiLoader, FiPlus } from "react-icons/fi";

// Re-declare the Article type for props.
interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  association: string;
  image: string;
}

interface BlogPostsSectionProps {
  articles: Article[];
  viewMode: string;
}

export default function BlogPostsSection({
  articles,
  viewMode,
}: BlogPostsSectionProps) {
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const visibleArticles = articles.slice(0, visibleCount);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 12, articles.length));
      setIsLoading(false);
    }, 800);
  };

  return (
    <section className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {viewMode === "grid" ? (
          <ArticleGrid articles={visibleArticles} />
        ) : (
          <ArticleList articles={visibleArticles} />
        )}
      </motion.div>

      {visibleCount < articles.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLoadMore}
            disabled={isLoading}
            className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              {isLoading ? (
                <>
                  <FiLoader className="animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <FiPlus />
                  Load More Articles
                </>
              )}
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </motion.div>
      )}
    </section>
  );
}
