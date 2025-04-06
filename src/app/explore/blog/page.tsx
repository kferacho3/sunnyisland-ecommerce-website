import Image from "next/image";
import Link from "next/link";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { MdViewList } from "react-icons/md";
import { blogData, enrichArticle } from "../../../data/blogData";
import BlogPostsSection from "./components/BlogPostsSection";

// Extend Article type to include an image.
interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  association: string;
  image: string;
}

// Define the AggregatedData type as returned by the aggregator API.
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

// Change BlogPageProps so that searchParams is a Promise that resolves to an object.
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

/**
 * Uses the Pexels API to fetch an image for the given keyword.
 */
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
    | "tiny" = "original",
): Promise<string> {
  try {
    const accessKey =
      process.env.NEXT_PUBLIC_PEXELS_API_KEY ||
      "VXlFYUc4IsxVdFQjueP6uClpLLRZqqW4NkAUKT5ZS6EqRz2TGiAvHHtE";
    console.log(`Fetching image for keyword: ${keyword}`);
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        keyword,
      )}&per_page=5`,
      {
        headers: { Authorization: accessKey },
      },
    );
    const data = await res.json();
    console.log(`Pexels API response for "${keyword}":`, data);
    if (data.photos && data.photos.length > 0) {
      for (const photo of data.photos) {
        const imageUrl = photo.src[quality];
        if (!usedImages.has(imageUrl)) {
          usedImages.add(imageUrl);
          console.log(
            `Fetched image URL for "${keyword}" using quality "${quality}": ${imageUrl}`,
          );
          return imageUrl;
        }
      }
    }
    console.log(
      `No non-duplicate image found for keyword: ${keyword}, trying fallback keywords.`,
    );
    const fallbackKeywords = [
      "spicy",
      "pepper",
      "pepper sauce",
      "sauce",
      "peppers",
      "culture",
      "trinidad",
      "caribbean",
      "hot sauce",
      "spicy sauce",
      "heat sauce",
      "scoville",
      "sunny",
      "sunny island",
    ];
    for (const fallback of fallbackKeywords) {
      if (fallback.toLowerCase() !== keyword.toLowerCase()) {
        const resFallback = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(
            fallback,
          )}&per_page=5`,
          {
            headers: { Authorization: accessKey },
          },
        );
        const dataFallback = await resFallback.json();
        if (dataFallback.photos && dataFallback.photos.length > 0) {
          for (const photo of dataFallback.photos) {
            const imageUrl = photo.src[quality];
            if (!usedImages.has(imageUrl)) {
              usedImages.add(imageUrl);
              console.log(
                `Fetched fallback image URL for "${fallback}" using quality "${quality}": ${imageUrl}`,
              );
              return imageUrl;
            }
          }
        }
      }
    }
    console.log(`No image found after fallback, using default image.`);
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

  // Fetch aggregator data.
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/aggregator`, {
    next: { revalidate: 60 },
  });
  const aggregatedData: AggregatedData = await res.json();

  // Combine aggregator data into a flat array.
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
    {
      id: 0,
      title: `Did You Know? (${aggregatedData.fact.number})`,
      description: aggregatedData.fact.text,
      url: "",
      association: aggregatedData.fact.source,
      image: "",
    },
  ];

  // Enrich our collected blog data.
  const enrichedBlogData: Article[] = blogData.map((article) => {
    const enriched = enrichArticle(article);
    return {
      ...enriched,
      image: "", // Provide a default empty string for image.
    };
  });

  // Combine both sets.
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

  // Filter articles to those related to "pepper" or "sauce".
  combinedArticles = combinedArticles.filter(
    (article) =>
      article.title.toLowerCase().includes("pepper") ||
      article.title.toLowerCase().includes("sauce") ||
      article.description.toLowerCase().includes("pepper") ||
      article.description.toLowerCase().includes("sauce"),
  );

  const usedImages = new Set<string>();
  const articlesWithImages: Article[] = await Promise.all(
    combinedArticles.map(async (article) => {
      if (article.image && article.image.trim() !== "") {
        usedImages.add(article.image);
        return article;
      } else {
        const image = await fetchImageForKeyword(
          article.title,
          usedImages,
          "original",
        );
        return { ...article, image };
      }
    }),
  );

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
  const urlParams =
    (query ? `&q=${encodeURIComponent(query)}` : "") +
    (filterParam ? `&filter=${encodeURIComponent(filterParam)}` : "");
  const gridLink = `/explore/blog?view=grid${urlParams}`;
  const listLink = `/explore/blog?view=list${urlParams}`;

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Hero Section */}
      <section className="relative h-96 bg-black text-white flex flex-col items-center justify-center text-center">
        <Image
          src="/media/SunnyIslandSymbol.png"
          alt="Sunny Island Symbol"
          width={96}
          height={96}
          className="mb-4 object-contain"
        />
        <h1 className="text-4xl font-bold mb-2">
          Welcome to Sunny Island Pepper Blog
        </h1>
        <p className="text-lg mb-4 max-w-2xl">
          We have curated articles, podcasts, videos, and journals about
          peppers, spice, and all things hot. Discover authentic sources and
          insights here.
        </p>
        <Link href="/contact/inquiries">
          <button className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition">
            Contact Us
          </button>
        </Link>
      </section>

      {/* Combined Search & Filter + View Toggle */}
      <section className="my-6">
        <div className="flex flex-row items-center justify-between gap-2">
          {/* Search Input (50% width) */}
          <form
            method="GET"
            action="/explore/blog"
            className="flex items-center bg-gray-100 bg-opacity-50 rounded px-2 py-2 w-[50%]"
          >
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              name="q"
              placeholder="Search articles..."
              defaultValue={query}
              className="flex-1 bg-transparent outline-none text-black"
            />
          </form>
          {/* Filter Dropdown (40% width) */}
          <div className="w-[40%]">
            <select
              name="filter"
              defaultValue={filterParam || ""}
              className="w-full bg-gray-100 bg-opacity-50 outline-none text-black rounded px-2 py-2"
            >
              <option value="" disabled hidden>
                What's the hottest pepper?
              </option>
              <option value="">All Sources</option>
              <option value="Wikipedia">Wikipedia</option>
              <option value="Crossref">Crossref</option>
              <option value="OpenAlex">OpenAlex</option>
              <option value="Internet Archive">Internet Archive</option>
              <option value="iTunes">iTunes</option>
              <option value="Numbers API">Numbers API</option>
            </select>
          </div>
          {/* Search Button (10% width) */}
          <div className="w-[10%]">
            <form method="GET" action="/explore/blog">
              <input type="hidden" name="view" value={viewMode} />
              <button
                type="submit"
                className="flex items-center bg-secondary text-white px-2 py-2 rounded hover:bg-secondary-dark transition w-full"
              >
                <FaSearch className="mr-1" />
              </button>
            </form>
          </div>
          {/* View Toggle Icons */}
          <div className="ml-2">
            <div className="flex items-center bg-white bg-opacity-80 p-2 rounded">
              <Link href={gridLink}>
                <BsFillGrid3X3GapFill className="h-6 w-6 text-black" />
              </Link>
              <div className="w-px h-6 bg-gray-400 mx-2"></div>
              <Link href={listLink}>
                <MdViewList className="h-6 w-6 text-black" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section with Load More functionality via a client component */}
      <BlogPostsSection articles={articlesToDisplay} viewMode={viewMode} />
    </div>
  );
}
