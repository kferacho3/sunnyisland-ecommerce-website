import { NextResponse } from "next/server";

// Minimal TypeScript interfaces for external API responses.
type WikiResponse = [string, string[], string[], string[]];

interface CrossrefItem {
  title?: string[];
  "container-title"?: string[];
  URL: string;
}
interface CrossrefResponse {
  message: {
    items: CrossrefItem[];
  };
}

interface OpenAlexItem {
  display_name: string;
  abstract?: string;
  ids: {
    doi?: string;
    openalex?: string;
  };
}
interface OpenAlexResponse {
  results: OpenAlexItem[];
}

interface ArchiveDoc {
  identifier: string;
  title?: string;
  description?: string;
}
interface ArchiveResponse {
  response: {
    docs: ArchiveDoc[];
  };
}

interface ITunesItem {
  collectionName?: string;
  trackName?: string;
  primaryGenreName?: string;
  collectionViewUrl?: string;
  trackViewUrl?: string;
}
interface ITunesResponse {
  results: ITunesItem[];
}

interface NumbersResponse {
  text: string;
  number: number;
  type: string;
}

export async function GET() {
  const wikipediaUrl =
    "https://en.wikipedia.org/w/api.php?action=opensearch&search=pepper&limit=5&namespace=0&format=json&origin=*";
  const crossrefUrl = "https://api.crossref.org/works?query=pepper&rows=5";
  const openAlexUrl = "https://api.openalex.org/works?search=pepper&per_page=5";
  const numbersUrl = "http://numbersapi.com/random/trivia?json";
  const archiveUrl =
    'https://archive.org/advancedsearch.php?q=subject:"pepper"&fl[]=identifier,title,description&output=json&rows=5';
  const iTunesUrl =
    "https://itunes.apple.com/search?term=pepper+podcast&media=podcast&limit=5";

  try {
    const [
      wikiRes,
      crossrefRes,
      openAlexRes,
      numbersRes,
      archiveRes,
      iTunesRes,
    ] = await Promise.all([
      fetch(wikipediaUrl),
      fetch(crossrefUrl),
      fetch(openAlexUrl),
      fetch(numbersUrl),
      fetch(archiveUrl),
      fetch(iTunesUrl),
    ]);

    const wikiData = (await wikiRes.json()) as WikiResponse;
    const crossrefData = (await crossrefRes.json()) as CrossrefResponse;
    const openAlexData = (await openAlexRes.json()) as OpenAlexResponse;
    const numbersData = (await numbersRes.json()) as NumbersResponse;
    const archiveData = (await archiveRes.json()) as ArchiveResponse;
    const iTunesData = (await iTunesRes.json()) as ITunesResponse;

    const wikiArticles =
      wikiData.length >= 4
        ? wikiData[1].map((title: string, index: number) => ({
            title,
            description: wikiData[2][index],
            url: wikiData[3][index],
            source: "Wikipedia",
          }))
        : [];

    const crossrefArticles = (crossrefData.message.items || []).map((item) => ({
      title: item.title ? item.title[0] : "No title",
      description: item["container-title"] ? item["container-title"][0] : "",
      url: item.URL,
      source: "Crossref",
    }));

    const openAlexArticles = (openAlexData.results || []).map((item) => ({
      title: item.display_name,
      description: item.abstract ? item.abstract.substring(0, 200) + "..." : "",
      url:
        item.ids && item.ids.doi
          ? `https://doi.org/${item.ids.doi}`
          : item.ids.openalex || "",
      source: "OpenAlex",
    }));

    const fact = {
      text: numbersData.text,
      number: numbersData.number,
      type: numbersData.type,
      source: "Numbers API",
    };

    const archiveVideos =
      archiveData.response?.docs?.map((doc) => ({
        title: doc.title || "No title",
        description: doc.description || "",
        url: `https://archive.org/details/${doc.identifier}`,
        source: "Internet Archive",
      })) || [];

    const podcasts = (iTunesData.results || []).map((item) => ({
      title: item.collectionName || item.trackName || "No title",
      description: item.primaryGenreName || "",
      url: item.collectionViewUrl || item.trackViewUrl || "",
      source: "iTunes",
    }));

    const aggregatedData = {
      wikipedia: wikiArticles,
      crossref: crossrefArticles,
      openAlex: openAlexArticles,
      fact,
      archive: archiveVideos,
      podcasts,
    };

    return NextResponse.json(aggregatedData);
  } catch (error) {
    console.error("Error fetching aggregated data:", error);
    return NextResponse.error();
  }
}
