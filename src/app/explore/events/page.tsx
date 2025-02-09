// src/app/explore/events/page.tsx

import ClientEvents, { Section } from "./ClientEvents";

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  price: string;
  url: string;
  imageUrl: string;
  theme: string;
}

// Subset of Ticketmaster API response for an event.
interface TicketmasterEvent {
  id: string;
  name: string;
  dates: {
    start: {
      localDate: string; // e.g. "2025-03-15"
      localTime?: string; // e.g. "19:30:00"
    };
  };
  _embedded?: {
    venues: Array<{
      name: string;
      city: { name: string };
      country: { name: string };
    }>;
  };
  images?: Array<{ url: string }>;
  info?: string;
  priceRanges?: Array<{
    min: number;
    max: number;
    currency: string;
  }>;
  url: string;
}

interface TicketmasterResponse {
  _embedded?: {
    events: TicketmasterEvent[];
  };
}

// Helper: Remove milliseconds from an ISO string.
function formatISOWithoutMs(date: Date): string {
  return date.toISOString().split('.')[0] + 'Z';
}

// Fallback: Use Unsplash to provide an image if none is available.
function getUnsplashThumbnailUrl(title: string, width = 400, height = 300): string {
  return `https://source.unsplash.com/random/${width}x${height}/?caribbean,african,${encodeURIComponent(title)}`;
}

// Map a TicketmasterEvent to our EventItem type.
function mapEvent(ev: TicketmasterEvent): EventItem {
  return {
    id: ev.id,
    title: ev.name,
    date:
      ev.dates.start.localDate +
      (ev.dates.start.localTime ? " " + ev.dates.start.localTime : ""),
    location:
      ev._embedded?.venues && ev._embedded.venues.length > 0
        ? `${ev._embedded.venues[0].name}, ${ev._embedded.venues[0].city.name}, ${ev._embedded.venues[0].country.name}`
        : "Unknown",
    description: ev.info
      ? ev.info.length > 200
        ? ev.info.slice(0, 200) + "..."
        : ev.info
      : "No description available",
    price:
      ev.priceRanges && ev.priceRanges.length > 0
        ? `${ev.priceRanges[0].min} - ${ev.priceRanges[0].max} ${ev.priceRanges[0].currency}`
        : "Free or N/A",
    url: ev.url,
    imageUrl:
      ev.images && ev.images.length > 0 ? ev.images[0].url : getUnsplashThumbnailUrl(ev.name),
    theme: ev.info ? ev.info.slice(0, 10) : "Ticketmaster",
  };
}

// Helper: Delay function.
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Fetch events from Ticketmaster for a given search term.
async function fetchEventsForTerm(term: string): Promise<EventItem[]> {
  const apiKey = process.env.TICKETMASTER_API_KEY;
  if (!apiKey) {
    console.error("Missing TICKETMASTER_API_KEY in .env.local!");
    return [];
  }
  const nowISOString = formatISOWithoutMs(new Date());
  const endDateTime = "2025-12-31T23:59:59Z";
  const endpoint = "https://app.ticketmaster.com/discovery/v2/events.json";
  const url = new URL(endpoint);
  url.searchParams.set("apikey", apiKey);
  url.searchParams.set("keyword", term);
  url.searchParams.set("countryCode", "US");
  url.searchParams.set("startDateTime", nowISOString);
  url.searchParams.set("endDateTime", endDateTime);

  console.log(`Fetching Ticketmaster events for term "${term}" from:`, url.toString());

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) {
      console.error(`Error fetching events for term "${term}":`, await res.text());
      return [];
    }
    const data: TicketmasterResponse = await res.json();
    console.log(`Fetched events JSON for term "${term}":`, JSON.stringify(data, null, 2));
    if (!data._embedded?.events) return [];
    return data._embedded.events.map(mapEvent);
  } catch (error) {
    console.error(`Exception fetching events for term "${term}":`, error);
    return [];
  }
}

// Define search terms.
const searchTerms = [
  "african",
  "african american",
  "caribbean",
  "food festival",
  "spicy food",
  "spicy sauce",
  "condiment"
];

export default async function EventsPage() {
  const sections: Section[] = [];
  // Fetch each term sequentially with a delay to avoid rate limiting.
  for (const term of searchTerms) {
    const events = await fetchEventsForTerm(term);
    sections.push({ term, events });
    await delay(300);
  }

  return (
    <div
      className="pt-[100px] min-h-screen text-white px-4"
      style={{ background: "linear-gradient(to right, #1f1c2c, #928dab)" }}
    >
      <h1 className="text-5xl font-extrabold mb-8 text-center uppercase tracking-wider">
        Upcoming Events
      </h1>
      <ClientEvents sections={sections} />
    </div>
  );
}
