// ClientEvents.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { EventItem } from "@/data/eventsData";

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
        className="cursor-pointer w-full h-96 group relative overflow-hidden transition-all duration-500 hover:shadow-2xl"
        onClick={onClick}
      >
        {/* Premium glass-morphism card design */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-xl shadow-xl"></div>

        <div className="relative w-full h-full flex flex-col p-6">
          {/* Image section with premium overlay */}
          <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 group-hover:scale-[1.02] transition-transform duration-500">
            <Image
              src={thumb}
              alt={ev.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={90}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Content section with premium typography */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors duration-300">
              {ev.title}
            </h3>

            <div className="space-y-1 mb-3">
              <p className="text-sm text-slate-600 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>
                  {new Date(ev.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </p>
              <p className="text-sm text-slate-600 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="line-clamp-1">{ev.location}</span>
              </p>
            </div>

            {/* Description with premium fade effect */}
            <div className="relative flex-1">
              <p className="text-sm text-slate-700 line-clamp-3">
                {ev.description}
              </p>
              {isTruncated && (
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
              )}
            </div>

            {/* Premium action button */}
            {isTruncated && (
              <button
                className="mt-3 self-end px-4 py-1.5 bg-amber-600 text-white text-sm rounded-full hover:bg-amber-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalEvent(ev);
                }}
              >
                Read More
              </button>
            )}
          </div>
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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl relative w-full max-w-4xl max-h-[90vh] overflow-hidden animate-modalSlideIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Premium close button */}
        <button
          className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white shadow-lg transition-all duration-300 z-10"
          onClick={onClose}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          {/* Hero image section */}
          <div className="relative w-full h-80">
            <Image
              src={thumb}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={90}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h2 className="text-4xl font-bold text-white mb-2">
                {event.title}
              </h2>
              <div className="flex items-center gap-4 text-white/90">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  {event.theme}
                </span>
                <span className="text-sm">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Content section */}
          <div className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-amber-600 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-slate-900">Location</h3>
                    <p className="text-slate-600">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-amber-600 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-slate-900">Price</h3>
                    <p className="text-slate-600">{event.price}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="font-semibold">Get Tickets</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-slate-900 mb-3">
                About This Event
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
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
  const [visibleCount, setVisibleCount] = useState(8);

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
        : ev.location.toLowerCase().includes(filterLocation.toLowerCase());
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

      {/* Premium Filter Bar */}
      <div className="mb-12 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Location
            </label>
            <select
              id="location"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
            >
              <option value="All">All Locations</option>
              <option value="Georgia">Georgia</option>
              <option value="Florida">Florida</option>
            </select>
          </div>

          <div className="relative">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Date From
            </label>
            <input
              id="date"
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="theme"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Theme or Keyword
            </label>
            <input
              id="theme"
              type="text"
              value={filterTheme}
              onChange={(e) => setFilterTheme(e.target.value)}
              placeholder="e.g., food, arts, festival"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Featured Event Hero */}
      {featuredEvent && (
        <div className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured Event
            </span>
          </div>

          <div
            className="main-card cursor-pointer hover:scale-[1.02] transition-transform duration-500"
            onClick={() => setModalEvent(featuredEvent)}
          >
            <div className="outer-border">
              <div className="mid-border">
                <div className="inner-border">
                  <div className="relative bg-white/95 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl">
                    <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                      <div className="space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                          {featuredEvent.title}
                        </h2>

                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-slate-700">
                            <svg
                              className="w-5 h-5 text-amber-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <span className="font-medium">
                              {new Date(featuredEvent.date).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                },
                              )}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-slate-700">
                            <svg
                              className="w-5 h-5 text-amber-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <span className="font-medium">
                              {featuredEvent.location}
                            </span>
                          </div>
                        </div>

                        <p className="text-lg text-slate-700 leading-relaxed">
                          {featuredEvent.description}
                        </p>

                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                          <span className="font-semibold">Learn More</span>
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="relative h-64 md:h-auto rounded-xl overflow-hidden">
                        <Image
                          src={useThumbnail(
                            featuredEvent.title,
                            featuredEvent.imageUrl,
                          )}
                          alt={featuredEvent.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          quality={100}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sunny Island Section */}
      <div className="mb-16">
        <SunnyIslandBorder>
          <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-xl p-12 text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Sunny Island Experiences
            </h2>
            <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto">
              Exclusive culinary adventures and premium dining experiences
              curated for the most discerning food enthusiasts
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-100 text-amber-800 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold">Coming Soon</span>
            </div>
          </div>
        </SunnyIslandBorder>
      </div>

      {/* Event Sections */}
      {filteredSections.length === 0 ? (
        <div className="text-center py-16">
          <svg
            className="w-16 h-16 text-slate-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-xl text-slate-600">
            No events found matching your criteria
          </p>
          <button
            onClick={() => {
              setFilterLocation("All");
              setFilterDate("");
              setFilterTheme("");
            }}
            className="mt-4 px-6 py-2 text-amber-600 hover:text-amber-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        filteredSections.map((section, index) => (
          <section
            key={section.term}
            className={index !== filteredSections.length - 1 ? "mb-16" : ""}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-200 mb-2">
                {section.term}
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
              <div className="flex justify-center mt-8">
                <button
                  className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => setVisibleCount(visibleCount + 8)}
                >
                  <span className="font-semibold">Load More Events</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </section>
        ))
      )}

      {/* Premium Font Import */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap");

        body {
          font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            "Helvetica Neue",
            Arial,
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Premium animations */
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-modalSlideIn {
          animation: modalSlideIn 0.3s ease-out;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Premium selection color */
        ::selection {
          background-color: #fbbf24;
          color: #1f2937;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /* Line clamp utilities */
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      `}</style>

      {/* Preserved Border Styles */}
      <style jsx>{`
        /* ---------------- Main Card (Hero) Styles ---------------- */
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
          border: 3px solid #de9b72;
          height: 100%;
          width: 100%;
          padding: 10px;
          margin: 0 auto;
        }
        .mid-border {
          border: 4px solid #de9b72;
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
      `}</style>
    </div>
  );
}
