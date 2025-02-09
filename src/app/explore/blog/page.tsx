import ArticleGrid from '@/components/blog/ArticleGrid';
import ArticleList from '@/components/blog/ArticleList';
import Image from 'next/image';
import Link from 'next/link';

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
  wikipedia: Array<{ title: string; description: string; url: string; source: string }>;
  crossref: Array<{ title: string; description: string; url: string; source: string }>;
  openAlex: Array<{ title: string; description: string; url: string; source: string }>;
  fact: { text: string; number: number; type: string; source: string };
  archive: Array<{ title: string; description: string; url: string; source: string }>;
  podcasts: Array<{ title: string; description: string; url: string; source: string }>;
};

type BlogPageProps = {
  searchParams: { view?: string; q?: string; filter?: string } | Promise<{ view?: string; q?: string; filter?: string }>;
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
 * fetchImageForKeyword uses the Pexels API to search for an image using the given keyword.
 * It logs the API response and avoids duplicate images by checking a Set of used image URLs.
 */
async function fetchImageForKeyword(
  keyword: string,
  usedImages: Set<string>
): Promise<string> {
  try {
    const accessKey =
      process.env.NEXT_PUBLIC_PEXELS_API_KEY ||
      'VXlFYUc4IsxVdFQjueP6uClpLLRZqqW4NkAUKT5ZS6EqRz2TGiAvHHtE';
    console.log(`Fetching image for keyword: ${keyword}`);
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&per_page=1`,
      {
        headers: {
          Authorization: accessKey
        }
      }
    );
    const data = await res.json();
    console.log(`Pexels API response for "${keyword}":`, data);
    if (data.photos && data.photos.length > 0) {
      const imageUrl = data.photos[0].src.medium;
      console.log(`Fetched image URL for "${keyword}": ${imageUrl}`);
      if (usedImages.has(imageUrl)) {
        console.log(`Duplicate image detected for keyword: ${keyword}`);
        return '/media/default-pepper.jpg';
      } else {
        usedImages.add(imageUrl);
        return imageUrl;
      }
    }
    console.log(`No image found for keyword: ${keyword}`);
    return '/media/default-pepper.jpg';
  } catch (error) {
    console.error('Error fetching image for keyword:', keyword, error);
    return '/media/default-pepper.jpg';
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  // Await searchParams if it's a promise.
  const { view, q, filter } = await Promise.resolve(searchParams);
  const viewMode = view === 'list' ? 'list' : 'grid';
  const query = q || '';
  const filterParam = filter || '';

  // Use an absolute URL to avoid URL parsing errors.
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/aggregator`, { next: { revalidate: 60 } });
  const aggregatedData: AggregatedData = await res.json();

  // Combine media items into one flat array.
  const combinedAggregated = [
    ...aggregatedData.wikipedia,
    ...aggregatedData.crossref,
    ...aggregatedData.openAlex,
    ...aggregatedData.archive,
    // For podcasts, prefix the title.
    ...aggregatedData.podcasts.map(podcast => ({
      ...podcast,
      title: `[Podcast] ${podcast.title}`
    }))
  ];

  // Include the fact as a special "article."
  combinedAggregated.push({
    title: `Did You Know? (${aggregatedData.fact.number})`,
    description: aggregatedData.fact.text,
    url: '',
    source: aggregatedData.fact.source
  });

  // Transform aggregated items into Article objects.
  let combinedArticles: Article[] = combinedAggregated.map((item, index) => ({
    id: index + 1,
    title: item.title,
    description: item.description,
    url: item.url,
    association: item.source,
    image: '' // placeholder; to be filled below
  }));

  // Filter out irrelevant articles (ensure they mention "pepper" or "sauce").
  combinedArticles = combinedArticles.filter(article =>
    article.title.toLowerCase().includes('pepper') ||
    article.title.toLowerCase().includes('sauce') ||
    article.description.toLowerCase().includes('pepper') ||
    article.description.toLowerCase().includes('sauce')
  );

  // Create a Set to track used image URLs.
  const usedImages = new Set<string>();

  // For each article, if no image is provided by the aggregator,
  // fetch an image using a keyword extracted from the title.
  const articlesWithImages: Article[] = await Promise.all(
    combinedArticles.map(async (article) => {
      const image = await fetchImageForKeyword(article.title, usedImages);
      return { ...article, image };
    })
  );

  // Further filter articles by search query.
  let filteredArticles = articlesWithImages;
  if (query) {
    filteredArticles = filteredArticles.filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.description.toLowerCase().includes(query.toLowerCase())
    );
  }
  // Filter articles by source (association) if filterParam is provided.
  if (filterParam) {
    filteredArticles = filteredArticles.filter(article =>
      article.association.toLowerCase() === filterParam.toLowerCase()
    );
  }

  const articlesToDisplay = shuffleArray(filteredArticles);

  // Build URL parameters for toggling view modes.
  const urlParams =
    (query ? `&q=${encodeURIComponent(query)}` : '') +
    (filterParam ? `&filter=${encodeURIComponent(filterParam)}` : '');
  const gridLink = `/explore/blog?view=grid${urlParams}`;
  const listLink = `/explore/blog?view=list${urlParams}`;

  return (
    <div className="container mx-auto px-4 py-8">
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
          We have curated articles, podcasts, videos, and journals about peppers,
          spice, and all things hot. Discover authentic sources and insights here.
        </p>
        <Link href="/contact/inquiries">
          <button className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition">
            Contact Us
          </button>
        </Link>
      </section>

      {/* Navbar for Articles */}
      <section className="my-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <form method="GET" action="/explore/blog" className="flex items-center space-x-2">
            <input
              type="text"
              name="q"
              placeholder="Search articles..."
              defaultValue={query}
              className="px-4 py-2 border rounded focus:outline-none"
            />
            <input type="hidden" name="view" value={viewMode} />
            {filterParam && <input type="hidden" name="filter" value={filterParam} />}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Search
            </button>
          </form>
          <form method="GET" action="/explore/blog" className="flex items-center space-x-2">
            <select
              name="filter"
              defaultValue={filterParam}
              className="px-4 py-2 border rounded focus:outline-none"
            >
              <option value="">All Sources</option>
              <option value="Wikipedia">Wikipedia</option>
              <option value="Crossref">Crossref</option>
              <option value="OpenAlex">OpenAlex</option>
              <option value="Internet Archive">Internet Archive</option>
              <option value="iTunes">iTunes</option>
              <option value="Numbers API">Numbers API</option>
            </select>
            <input type="hidden" name="view" value={viewMode} />
            {query && <input type="hidden" name="q" value={query} />}
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
              Filter
            </button>
          </form>
        </div>

        {/* View Toggle Icons */}
        <div className="mt-4 flex flex-col items-center">
          <Link href={gridLink}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Link>
          <span className="text-sm mb-2">or</span>
          <Link href={listLink}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Articles Section */}
      <section>
        {viewMode === 'grid' ? (
          <ArticleGrid articles={articlesToDisplay} />
        ) : (
          <ArticleList articles={articlesToDisplay} />
        )}
      </section>
    </div>
  );
}
