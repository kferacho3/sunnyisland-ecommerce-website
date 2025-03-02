"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { EventItem } from "../../../data/eventsData";

export interface Section {
  term: string;
  events: EventItem[];
}

interface ClientEventsProps {
  sections: Section[];
  featuredEvent?: EventItem;
}

/* ========================================================= */
/* ================ Border Components ====================== */
/* ========================================================= */

/**
 * RegularBorder:
 * Applies the "Default Card Styles" (black borders with markers)
 * from your old iteration.
 */
function RegularBorder({ children }: { children: React.ReactNode }) {
  return (
    <div className="regular-border-wrapper">
      <div className="regular-border-inner">{children}</div>
      <style jsx>{`
        .regular-border-wrapper {
          position: relative;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        .regular-border-wrapper::before,
        .regular-border-wrapper::after {
          content: "•";
          position: absolute;
          width: 14px;
          height: 14px;
          font-size: 14px;
          line-height: 12px;
          text-align: center;
          top: 5px;
        }
        .regular-border-wrapper::before {
          left: 5px;
          color: #000;
          border: 2px solid #000;
        }
        .regular-border-wrapper::after {
          right: 5px;
          color: #000;
          border: 2px solid #000;
        }
        .regular-border-inner {
          position: relative;
          border: 2px solid #000;
          background-clip: padding-box;
          padding: 10px;
          transition:
            border 0.5s ease,
            transform 0.3s ease;
        }
        .regular-border-inner::before,
        .regular-border-inner::after {
          content: "•";
          position: absolute;
          width: 14px;
          height: 14px;
          font-size: 14px;
          line-height: 12px;
          text-align: center;
          bottom: -2px;
        }
        .regular-border-inner::before {
          left: -2px;
          color: #000;
          border: 2px solid #000;
        }
        .regular-border-inner::after {
          right: -2px;
          color: #000;
          border: 2px solid #000;
        }
        /* Hover effect for regular cards */
        .regular-border-wrapper:hover .regular-border-inner {
          border: 2px solid transparent;
          border-image: linear-gradient(to right, #ffb300, #da1a35) 1;
        }
      `}</style>
    </div>
  );
}

/**
 * SunnyIslandBorder:
 * Applies the "Featured Card Styles" (with gradient borders and markers)
 * from your old iteration.
 */
function SunnyIslandBorder({ children }: { children: React.ReactNode }) {
  return (
    <div className="sunny-border-wrapper">
      <div className="sunny-border-inner">{children}</div>
      <style jsx>{`
        .sunny-border-wrapper {
          position: relative;
          border: 2px solid transparent;
          background-clip: padding-box;
          border-image: linear-gradient(to right, #ffd700, #ffc107, #ffb300) 1;
        }
        .sunny-border-wrapper::before,
        .sunny-border-wrapper::after {
          content: "•";
          position: absolute;
          width: 14px;
          height: 14px;
          font-size: 14px;
          line-height: 12px;
          text-align: center;
          top: 5px;
        }
        .sunny-border-wrapper::before {
          left: 5px;
          color: #ffd700;
          border: 2px solid #ffd700;
        }
        .sunny-border-wrapper::after {
          right: 5px;
          color: #ffd700;
          border: 2px solid #ffd700;
        }
        .sunny-border-inner {
          position: relative;
          border: 2px solid transparent;
          background-clip: padding-box;
          padding: 40px;
          border-image: linear-gradient(to right, #ffd700, #ffc107, #ffb300) 1;
        }
        .sunny-border-inner::before,
        .sunny-border-inner::after {
          content: "•";
          position: absolute;
          width: 14px;
          height: 14px;
          font-size: 14px;
          line-height: 12px;
          text-align: center;
          bottom: -2px;
        }
        .sunny-border-inner::before {
          left: -2px;
          color: #ffd700;
          border: 2px solid #ffd700;
        }
        .sunny-border-inner::after {
          right: -2px;
          color: #ffd700;
          border: 2px solid #ffd700;
        }
      `}</style>
    </div>
  );
}

/* ========================================================= */
/* ================ Helper Functions ======================= */
/* ========================================================= */

function useThumbnail(title: string, fallback?: string): string {
  const [thumbnail, setThumbnail] = useState<string>(
    fallback || "/media/default-pepper.jpg",
  );

  useEffect(() => {
    async function fetchThumbnail() {
      try {
        const accessKey =
          process.env.NEXT_PUBLIC_PEXELS_API_KEY ||
          "VXlFYUc4IsxVdFQjueP6uClpLLRZqqW4NkAUKT5ZS6EqRz2TGiAvHHtE";
        const query = encodeURIComponent(title);
        const res = await fetch(
          `https://api.pexels.com/v1/search?query=${query}&per_page=1`,
          {
            headers: {
              Authorization: accessKey,
            },
          },
        );
        const data = await res.json();
        if (data.photos && data.photos.length > 0) {
          setThumbnail(data.photos[0].src.medium);
        } else {
          setThumbnail("/media/default-pepper.jpg");
        }
      } catch (error) {
        console.error("Error fetching thumbnail for", title, error);
        setThumbnail("/media/default-pepper.jpg");
      }
    }
    fetchThumbnail();
  }, [title]);

  return thumbnail;
}

function getTruncatedText(desc: string, maxLength = 100): string {
  if (desc.length <= maxLength) return desc;
  return desc.slice(0, maxLength);
}

function normalizeTheme(theme: string): string {
  const lower = theme.toLowerCase();
  if (lower.includes("latin") || lower.includes("spanish")) {
    return "Latin Culture & Food";
  }
  if (lower.includes("african")) {
    return "African Culture";
  }
  if (lower.includes("caribbean")) {
    return "Caribbean Culture";
  }
  if (
    lower.includes("asian") ||
    lower.includes("chinese") ||
    lower.includes("japanese") ||
    lower.includes("korean") ||
    lower.includes("thai")
  ) {
    return "Asian Culture";
  }
  if (lower.includes("farmers market") || lower.includes("farm-to-table")) {
    return "Farmers Market";
  }
  if (lower.includes("street food") || lower.includes("food truck")) {
    return "Street Food and Food Trucks";
  }
  if (
    lower.includes("oktoberfest") ||
    (lower.includes("festival") &&
      (lower.includes("beer") ||
        lower.includes("drinks") ||
        lower.includes("food")))
  ) {
    return "Drinks & Food events";
  }
  if (
    lower.includes("festival") ||
    lower.includes("carnival") ||
    lower.includes("fair") ||
    lower.includes("holiday")
  ) {
    return "Festival";
  }
  return "Miscellaneous";
}

/* ========================================================= */
/* ================ Event Card Component =================== */
/* ========================================================= */
function EventCard({
  ev,
  onClick,
  setModalEvent,
}: {
  ev: EventItem;
  onClick: () => void;
  setModalEvent: (ev: EventItem) => void;
}) {
  const thumb = useThumbnail(ev.title, ev.imageUrl);
  const truncatedDesc = getTruncatedText(ev.description, 100);
  const isTruncated = ev.description.length > 100;

  return (
    <RegularBorder>
      <div
        key={ev.id}
        className="default-card cursor-pointer gap-2  w-[11.5rem] h-56 sm:w-64 sm:h-[18rem] hover:scale-105 transition-transform duration-300 relative"
        onClick={onClick}
      >
        <div className="card-inner p-4 bg-transparent w-full h-full flex flex-col text-white overflow-hidden">
          {/* Top image */}
          <div className="mb-2 w-full h-16 sm:h-24 relative">
            <Image
              src={thumb}
              alt={ev.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={90}
              className="object-cover rounded-md"
            />
          </div>

          {/* Title & Basic Info */}
          <h3 className="text-sm font-bold mb-1">{ev.title}</h3>
          <p className="text-xs mb-1">
            <strong>Date:</strong> {ev.date}
          </p>
          <p className="text-xs mb-1">
            <strong>Location:</strong> {ev.location}
          </p>

          {/* Description text – hidden on mobile */}
          <p className="text-xs pr-5 hidden sm:block">{truncatedDesc}</p>

          {/* If the text is truncated, show the plus button in the bottom-right */}
          {isTruncated && (
            <div className="group absolute bottom-1 right-1 w-7 h-7 rounded-full bg-gradient-to-r from-black via-gray-800 to-gray-400 flex items-center justify-center transition-colors duration-300 hover:cursor-pointer hover:from-secondary hover:via-secondary hover:to-secondary">
              <button
                className="text-white text-sm w-full h-full flex items-center justify-center group-hover:text-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalEvent(ev);
                }}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </RegularBorder>
  );
}

/* ========================================================= */
/* ================ Modal Component ======================== */
/* ========================================================= */

function Modal({ event, onClose }: { event: EventItem; onClose: () => void }) {
  const thumb = useThumbnail(event.title, event.imageUrl);
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 relative w-[75vw] h-[75vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col items-center">
          <div className="relative w-full h-64 mb-4">
            <Image
              src={thumb}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={90}
              className="object-cover rounded-md"
            />
          </div>
          <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
          <p className="mb-2">
            <strong>Date:</strong> {event.date}
          </p>
          <p className="mb-2">
            <strong>Location:</strong> {event.location}
          </p>
          <p className="mb-2">
            <strong>Theme:</strong> {event.theme}
          </p>
          <p className="mb-2">{event.description}</p>
          <p className="mb-2">
            <strong>Price:</strong> {event.price}
          </p>
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
          >
            View Event
          </a>
        </div>
      </div>
    </div>
  );
}

/* ========================================================= */
/* ================ Main Component ========================= */
/* ========================================================= */

export default function ClientEvents({
  sections,
  featuredEvent,
}: ClientEventsProps) {
  const [modalEvent, setModalEvent] = useState<EventItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(5);

  // Filter states
  const [filterLocation, setFilterLocation] = useState("All");
  const [filterDate, setFilterDate] = useState("");
  const [filterTheme, setFilterTheme] = useState("");

  // Combine all events from all sections
  const allEvents = sections.flatMap((section) => section.events);

  // Apply filters
  const filteredEvents = allEvents.filter((ev) => {
    const matchesLocation =
      filterLocation === "All"
        ? true
        : ev.location.toLowerCase() === filterLocation.toLowerCase();
    const matchesTheme = filterTheme
      ? ev.theme.toLowerCase().includes(filterTheme.toLowerCase()) ||
        ev.title.toLowerCase().includes(filterTheme.toLowerCase())
      : true;
    const matchesDate = filterDate
      ? new Date(ev.date) >= new Date(filterDate)
      : true;
    return matchesLocation && matchesTheme && matchesDate;
  });

  // Sort events by date (soonest first)
  const sortedEvents = filteredEvents.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  // Group by normalized theme
  const groupedByTheme = sortedEvents.reduce(
    (acc: Record<string, EventItem[]>, ev) => {
      const normalized = normalizeTheme(ev.theme);
      if (!acc[normalized]) acc[normalized] = [];
      acc[normalized].push(ev);
      return acc;
    },
    {},
  );

  const filteredSections = Object.keys(groupedByTheme).map((theme) => ({
    term: theme,
    events: groupedByTheme[theme],
  }));

  return (
    <div>
      {modalEvent && (
        <Modal event={modalEvent} onClose={() => setModalEvent(null)} />
      )}

      {/* Filter Bar */}
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <div>
          <label htmlFor="location" className="mr-2 text-white">
            Location:
          </label>
          <select
            id="location"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="p-2 rounded"
          >
            <option value="All">All</option>
            <option value="Georgia">Georgia</option>
            <option value="Florida">Florida</option>
          </select>
        </div>
        <div>
          <label htmlFor="date" className="mr-2 text-white">
            Date from:
          </label>
          <input
            id="date"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="theme" className="mr-2 text-white">
            Theme/Keyword:
          </label>
          <input
            id="theme"
            type="text"
            value={filterTheme}
            onChange={(e) => setFilterTheme(e.target.value)}
            placeholder="e.g., food, arts, festival"
            className="p-2 rounded"
          />
        </div>
      </div>

      {/* Global Featured Event (Hero Component) */}
      {featuredEvent && (
        <div
          className="main-card mx-auto w-full max-w-5xl cursor-pointer hover:scale-105 transition-transform duration-300 mb-12 relative"
          onClick={() => setModalEvent(featuredEvent)}
        >
          <div className="outer-border relative">
            <div className="mid-border relative">
              <div className="inner-border relative">
                <img
                  className="corner-decoration corner-left-top"
                  src="https://i.ibb.co/4mKvK3N/corner-decoration.jpg"
                  alt="decoration"
                />
                <img
                  className="corner-decoration corner-right-top"
                  src="https://i.ibb.co/4mKvK3N/corner-decoration.jpg"
                  alt="decoration"
                />
                <img
                  className="corner-decoration corner-right-bottom"
                  src="https://i.ibb.co/4mKvK3N/corner-decoration.jpg"
                  alt="decoration"
                />
                <img
                  className="corner-decoration corner-left-bottom"
                  src="https://i.ibb.co/4mKvK3N/corner-decoration.jpg"
                  alt="decoration"
                />
                <img
                  className="vertical-decoration top"
                  src="https://i.ibb.co/JRTK9z4/horizontally-centered-vertical-decoration.png"
                  alt="vertical decoration"
                />
                <img
                  className="vertical-decoration bottom"
                  src="https://i.ibb.co/JRTK9z4/horizontally-centered-vertical-decoration.png"
                  alt="vertical decoration"
                />
                <div className="card-inner p-10 bg-black bg-opacity-60 rounded-lg shadow-2xl relative">
                  <div className="mb-6 w-full h-80 relative">
                    <Image
                      src={useThumbnail(
                        featuredEvent.title,
                        featuredEvent.imageUrl,
                      )}
                      alt={featuredEvent.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={100}
                      className="object-cover rounded-md"
                    />
                  </div>
                  <h2 className="text-4xl font-bold mb-4">
                    {featuredEvent.title}
                  </h2>
                  <p className="mb-2">
                    <strong>Date:</strong> {featuredEvent.date}
                  </p>
                  <p className="mb-2">
                    <strong>Location:</strong> {featuredEvent.location}
                  </p>
                  <p className="mb-2 text-xs pr-5">
                    {getTruncatedText(featuredEvent.description)}
                  </p>
                  {featuredEvent.description.length > 100 && (
                    <div className="group absolute bottom-6 right-6 w-8 h-8 rounded-full bg-gradient-to-r from-black via-gray-800 to-gray-400 flex items-center justify-center transition-colors duration-300 hover:cursor-pointer hover:from-secondary hover:via-secondary hover:to-secondary">
                      <button
                        className="text-white text-sm w-full h-full flex items-center justify-center group-hover:text-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalEvent(featuredEvent);
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Featured Sunny Island Section */}
      <div
        className="mx-auto w-full max-w-5xl mb-12 cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={() => {}}
      >
        <SunnyIslandBorder>
          <div className="p-10 bg-black bg-opacity-60 rounded-lg shadow-2xl">
            <h2 className="text-4xl font-bold text-center text-white">
              Featured Sunny Island
            </h2>
            <p className="text-center text-white mt-4">Coming Soon</p>
          </div>
        </SunnyIslandBorder>
      </div>

      {/* Render Filtered Sections (Grouped by Theme) */}
      {filteredSections.length === 0 ? (
        <p className="text-center text-white">
          No events found matching the selected filters.
        </p>
      ) : (
        filteredSections.map((section) => (
          <section key={section.term} className="p-5 sm:p-20 mb-26">
            <h2 className="text-3xl font-extrabold mb-4 uppercase tracking-wide">
              {section.term}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
              {section.events.slice(0, visibleCount).map((ev) => (
                <EventCard
                  key={ev.id}
                  ev={ev}
                  onClick={() => setModalEvent(ev)}
                  setModalEvent={setModalEvent}
                />
              ))}
            </div>
            {section.events.length > visibleCount && (
              <div className="flex justify-center mt-4">
                <button
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
                  onClick={() => setVisibleCount(visibleCount + 5)}
                >
                  Load More
                </button>
              </div>
            )}
          </section>
        ))
      )}

      {/* Global Font Update */}
      <style jsx global>{`
        body {
          font-family: "Open Sans", sans-serif;
        }
      `}</style>

      {/* Custom Border & Decoration Styles for main and featured cards remain unchanged */}
      <style jsx>{`
        /* ---------------- Main Card (Hero) Styles (Unchanged) ---------------- */
        .main-card {
          position: relative;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        .main-card::before,
        .main-card::after {
          content: "•";
          position: absolute;
          width: 14px;
          height: 14px;
          font-size: 14px;
          line-height: 12px;
          text-align: center;
          top: 5px;
        }
        .main-card::before {
          left: 5px;
          color: #800080;
          border: 2px solid #800080;
        }
        .main-card::after {
          right: 5px;
          color: #800080;
          border: 2px solid #800080;
        }
        .main-card .card-inner {
          position: relative;
          border: 2px solid transparent;
          background-clip: padding-box;
          padding: 40px;
        }
        .main-card .card-inner::before,
        .main-card .card-inner::after {
          content: "•";
          position: absolute;
          width: 14px;
          height: 14px;
          font-size: 14px;
          line-height: 12px;
          text-align: center;
          bottom: -2px;
        }
        .main-card .card-inner::before {
          left: -2px;
          color: #800080;
          border: 2px solid #800080;
        }
        .main-card .card-inner::after {
          right: -2px;
          color: #800080;
          border: 2px solid #800080;
        }
        .main-card {
          border: 2px solid transparent;
          border-image: linear-gradient(to right, #800080, #ff0000, #ffc0cb) 1;
        }
        .main-card .card-inner {
          border: 2px solid transparent;
          border-image: linear-gradient(to right, #800080, #ff0000, #ffc0cb) 1;
        }
        /* ---------------- Featured (Hero) Component Borders ---------------- */
        .outer-border {
          border: 2px solid #de9b72;
          height: 99%;
          width: 98%;
          padding: 6px;
          margin: 0 auto;
        }
        .mid-border {
          border: 6px solid #de9b72;
          height: 100%;
          width: 100%;
          padding: 6px;
          margin: auto;
        }
        .inner-border {
          position: relative;
          border: 2px solid #de9b72;
          height: 100%;
          width: 100%;
          margin: auto;
        }
        /* ---------------- Decorations for Featured Component ---------------- */
        .corner-decoration {
          position: absolute;
          width: 0em;
          margin: -3px;
        }
        @media (min-width: 768px) {
          .corner-decoration {
            width: 0em;
            margin: -4px;
          }
        }
        @media (min-width: 992px) {
          .corner-decoration {
            width: 0em;
            margin: -5px;
          }
        }
        @media (min-width: 1200px) {
          .corner-decoration {
            width: 0em;
            margin: -6px;
          }
        }
        .corner-decoration.corner-left-top {
          left: 0;
          top: 0;
        }
        .corner-decoration.corner-right-top {
          top: 0;
          right: 0;
          transform: scaleX(-1);
        }
        .corner-decoration.corner-right-bottom {
          right: 0;
          bottom: 0;
          transform: scale(-1);
        }
        .corner-decoration.corner-left-bottom {
          left: 0;
          bottom: 0;
          transform: scaleY(-1);
        }
        .vertical-decoration {
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          width: 11em;
        }
        @media (min-width: 768px) {
          .vertical-decoration {
            width: 16em;
          }
        }
        @media (min-width: 992px) {
          .vertical-decoration {
            width: 20em;
          }
        }
        @media (min-width: 1200px) {
          .vertical-decoration {
            width: 27em;
          }
        }
        .vertical-decoration.top {
          top: 0;
        }
        .vertical-decoration.bottom {
          bottom: 0;
          transform: scaleY(-1);
        }
      `}</style>
    </div>
  );
}
