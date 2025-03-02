"use client";
import ArticleGrid from "@/components/blog/ArticleGrid";
import ArticleList from "@/components/blog/ArticleList";
import { useState } from "react";

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
  const visibleArticles = articles.slice(0, visibleCount);

  return (
    <section>
      {viewMode === "grid" ? (
        <ArticleGrid articles={visibleArticles} />
      ) : (
        <ArticleList articles={visibleArticles} />
      )}
      {visibleCount < articles.length && (
        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-3 bg-primary text-white rounded hover:bg-primary-dark transition"
            onClick={() =>
              setVisibleCount((prev) => Math.min(prev + 12, articles.length))
            }
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
