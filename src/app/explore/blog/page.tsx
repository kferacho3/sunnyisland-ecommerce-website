// app/explore/blog/page.tsx
import { blogData, enrichArticle } from "../../../data/blogData";
import BlogPageClient from "./components/BlogPageClient";
// [Keep all the interfaces and types]
interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  association: string;
  image: string;
}

type AggregatedData = {
  wikipedia: Array<{
    title: string;
    description: string;
    url: string;
    source: string;
  }>;
  crossref: Array<{
    title: string;
    description: string;
    url: string;
    source: string;
  }>;
  openAlex: Array<{
    title: string;
    description: string;
    url: string;
    source: string;
  }>;
  fact: { text: string; number: number; type: string; source: string };
  archive: Array<{
    title: string;
    description: string;
    url: string;
    source: string;
  }>;
  podcasts: Array<{
    title: string;
    description: string;
    url: string;
    source: string;
  }>;
};

type BlogPageProps = {
  searchParams: Promise<{ view?: string; q?: string; filter?: string }>;
};

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

async function fetchImageForKeyword(
  keyword: string,
  usedImages: Set<string>,
  quality:
    | "original"
    | "large2x"
    | "large"
    | "medium"
    | "small"
    | "portrait"
    | "landscape"
    | "tiny" = "medium", // Changed to medium for faster loading
): Promise<string> {
  try {
    const accessKey =
      process.env.NEXT_PUBLIC_PEXELS_API_KEY ||
      "VXlFYUc4IsxVdFQjueP6uClpLLRZqqW4NkAUKT5ZS6EqRz2TGiAvHHtE";
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        keyword,
      )}&per_page=3`, // Reduced from 5 to 3 for faster loading
      {
        headers: { Authorization: accessKey },
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );
    const data = await res.json();
    if (data.photos && data.photos.length > 0) {
      for (const photo of data.photos) {
        const imageUrl = photo.src[quality];
        if (!usedImages.has(imageUrl)) {
          usedImages.add(imageUrl);
          return imageUrl;
        }
      }
    }
    return "/media/default-pepper.jpg";
  } catch (error) {
    console.error("Error fetching image for keyword:", keyword, error);
    return "/media/default-pepper.jpg";
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { view, q, filter } = await searchParams;
  const viewMode = view === "list" ? "list" : "grid";
  const query = q || "";
  const filterParam = filter || "";

  // Fetch aggregated data
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  let aggregatedData: AggregatedData;

  try {
    const res = await fetch(`${baseUrl}/api/aggregator`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
      cache: "force-cache",
    });
    aggregatedData = await res.json();
  } catch (error) {
    console.error("Error fetching aggregated data:", error);
    // Provide empty data as fallback
    aggregatedData = {
      wikipedia: [],
      crossref: [],
      openAlex: [],
      fact: { text: "", number: 0, type: "", source: "" },
      archive: [],
      podcasts: [],
    };
  }

  // Process articles
  const aggregatorArticles: Article[] = [
    ...aggregatedData.wikipedia.map((article) => ({
      id: 0,
      title: article.title,
      description: article.description,
      url: article.url,
      association: article.source,
      image: "",
    })),
    ...aggregatedData.crossref.map((article) => ({
      id: 0,
      title: article.title,
      description: article.description,
      url: article.url,
      association: article.source,
      image: "",
    })),
    ...aggregatedData.openAlex.map((article) => ({
      id: 0,
      title: article.title,
      description: article.description,
      url: article.url,
      association: article.source,
      image: "",
    })),
    ...aggregatedData.archive.map((article) => ({
      id: 0,
      title: article.title,
      description: article.description,
      url: article.url,
      association: article.source,
      image: "",
    })),
    ...aggregatedData.podcasts.map((podcast) => ({
      id: 0,
      title: `[Podcast] ${podcast.title}`,
      description: podcast.description,
      url: podcast.url,
      association: podcast.source,
      image: "",
    })),
  ];

  if (aggregatedData.fact && aggregatedData.fact.text) {
    aggregatorArticles.push({
      id: 0,
      title: `Did You Know? (${aggregatedData.fact.number})`,
      description: aggregatedData.fact.text,
      url: "",
      association: aggregatedData.fact.source,
      image: "",
    });
  }

  const enrichedBlogData: Article[] = blogData.map((article) => {
    const enriched = enrichArticle(article);
    return {
      ...enriched,
      image: "",
    };
  });

  let combinedArticles: Article[] = [
    ...aggregatorArticles,
    ...enrichedBlogData,
  ].map((item, index) => ({
    id: index + 1,
    title: item.title,
    description: item.description,
    url: item.url,
    association: item.association,
    image: item.image || "",
  }));

  // Filter for pepper/sauce content
  combinedArticles = combinedArticles.filter(
    (article) =>
      article.title.toLowerCase().includes("pepper") ||
      article.title.toLowerCase().includes("sauce") ||
      article.description.toLowerCase().includes("pepper") ||
      article.description.toLowerCase().includes("sauce"),
  );

  // Fetch images in parallel with a limit
  const usedImages = new Set<string>();
  const BATCH_SIZE = 10; // Process images in batches
  const articlesWithImages: Article[] = [];

  for (let i = 0; i < combinedArticles.length; i += BATCH_SIZE) {
    const batch = combinedArticles.slice(i, i + BATCH_SIZE);
    const batchWithImages = await Promise.all(
      batch.map(async (article) => {
        if (article.image && article.image.trim() !== "") {
          usedImages.add(article.image);
          return article;
        } else {
          const image = await fetchImageForKeyword(
            article.title,
            usedImages,
            "medium",
          );
          return { ...article, image };
        }
      }),
    );
    articlesWithImages.push(...batchWithImages);
  }

  // Apply filters
  let filteredArticles = articlesWithImages;
  if (query) {
    filteredArticles = filteredArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description.toLowerCase().includes(query.toLowerCase()),
    );
  }
  if (filterParam) {
    filteredArticles = filteredArticles.filter(
      (article) =>
        article.association.toLowerCase() === filterParam.toLowerCase(),
    );
  }

  const articlesToDisplay = shuffleArray(filteredArticles);

  return (
    <BlogPageClient
      articles={articlesToDisplay}
      viewMode={viewMode}
      query={query}
      filterParam={filterParam}
    />
  );
}
