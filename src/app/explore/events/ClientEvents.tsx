// src/app/explore/events/ClientEvents.tsx

"use client";

import Image from "next/image";
import { useState } from "react";
import type { EventItem } from "./page";

// Export Section interface for use by the server component.
export interface Section {
  term: string;
  events: EventItem[];
}

// Modal component for full event details.
function Modal({ event, onClose }: { event: EventItem; onClose: () => void }) {
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
              src={event.imageUrl}
              alt={event.title}
              fill
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

export default function ClientEvents({ sections }: { sections: Section[] }) {
  // const [filterDate, setFilterDate] = useState("");
  //const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [modalEvent, setModalEvent] = useState<EventItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(5);

  // Helper: Truncate description with fade overlay and a "+" button.
  const renderTruncatedDescription = (desc: string, ev: EventItem) => {
    const maxLength = 100;
    if (desc.length <= maxLength) {
      return <p className="text-xs">{desc}</p>;
    }
    const truncated = desc.slice(0, maxLength);
    return (
      <div className="relative">
        <p className="text-xs">{truncated}</p>
        <div className="absolute bottom-0 right-0 w-10 h-6 bg-gradient-to-l from-black via-transparent to-transparent flex items-center justify-center">
          <button
            className="text-white text-xs"
            onClick={(e) => {
              e.stopPropagation();
              setModalEvent(ev);
            }}
          >
            +
          </button>
        </div>
      </div>
    );
  };

  // Render all sections.
  return (
    <div>
      {modalEvent && (
        <Modal event={modalEvent} onClose={() => setModalEvent(null)} />
      )}

      {sections.map((section, idx) => (
        <section key={section.term} className="mb-16">
          <h2 className="text-3xl font-extrabold mb-4 uppercase tracking-wide">
            {section.term.charAt(0).toUpperCase() + section.term.slice(1)}
          </h2>
          {idx === 0 && section.events.length > 0 ? (
            <>
              {/* Hero Section: Main Event */}
              <div
                className="main-card mx-auto w-full max-w-5xl cursor-pointer hover:scale-105 transition-transform duration-300 mb-12"
                onClick={() => setModalEvent(section.events[0])}
              >
                <div className="card-inner p-10 bg-black bg-opacity-60 rounded-lg shadow-2xl">
                  <div className="mb-6 w-full h-80 relative">
                    <Image
                      src={section.events[0].imageUrl}
                      alt={section.events[0].title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <h2 className="text-4xl font-bold mb-4">
                    {section.events[0].title}
                  </h2>
                  <p className="mb-2">
                    <strong>Date:</strong> {section.events[0].date}
                  </p>
                  <p className="mb-2">
                    <strong>Location:</strong> {section.events[0].location}
                  </p>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalEvent(section.events[0]);
                    }}
                  >
                    {renderTruncatedDescription(
                      section.events[0].description,
                      section.events[0],
                    )}
                  </div>
                </div>
              </div>

              {/* Featured Section: Next 3 Events */}
              {section.events.length > 1 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold mb-4">Featured</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {section.events.slice(1, 4).map((ev) => (
                      <div
                        key={ev.id}
                        className="featured-card cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => setModalEvent(ev)}
                      >
                        <div className="card-inner p-6 bg-black bg-opacity-60 rounded-lg shadow-lg h-full flex flex-col">
                          <div className="mb-4 w-full h-40 relative">
                            <Image
                              src={ev.imageUrl}
                              alt={ev.title}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <h3 className="text-xl font-bold mb-2">{ev.title}</h3>
                          <p className="text-sm mb-1">
                            <strong>Date:</strong> {ev.date}
                          </p>
                          <p className="text-sm mb-1">
                            <strong>Location:</strong> {ev.location}
                          </p>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalEvent(ev);
                            }}
                          >
                            {renderTruncatedDescription(ev.description, ev)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Default Grid for Remaining Events with Chunking */}
              {section.events.length > 4 && (
                <div>
                  <h3 className="text-2xl font-bold mb-4">More Events</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
                    {section.events.slice(4, 4 + visibleCount).map((ev) => (
                      <div
                        key={ev.id}
                        className="default-card cursor-pointer w-64 h-[18rem] hover:scale-105 transition-transform duration-300"
                        onClick={() => setModalEvent(ev)}
                      >
                        <div className="card-inner p-4 bg-transparent shadow-lg w-full h-full flex flex-col text-white overflow-hidden border-2 border-black">
                          <div className="mb-2 w-full h-24 relative">
                            <Image
                              src={ev.imageUrl}
                              alt={ev.title}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <h3 className="text-sm font-bold mb-1">{ev.title}</h3>
                          <p className="text-xs mb-1">
                            <strong>Date:</strong> {ev.date}
                          </p>
                          <p className="text-xs mb-1">
                            <strong>Location:</strong> {ev.location}
                          </p>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalEvent(ev);
                            }}
                          >
                            {renderTruncatedDescription(ev.description, ev)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {section.events.length > 4 + visibleCount && (
                    <div className="flex justify-center mt-4">
                      <button
                        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
                        onClick={() => setVisibleCount(visibleCount + 5)}
                      >
                        Load More
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            // For non-first sections, render a 5-column grid.
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
              {section.events.map((ev) => (
                <div
                  key={ev.id}
                  className="default-card cursor-pointer w-64 h-[18rem] hover:scale-105 transition-transform duration-300"
                  onClick={() => setModalEvent(ev)}
                >
                  <div className="card-inner p-4 bg-transparent shadow-lg w-full h-full flex flex-col text-white overflow-hidden border-2 border-black">
                    <div className="mb-2 w-full h-24 relative">
                      <Image
                        src={ev.imageUrl}
                        alt={ev.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <h3 className="text-sm font-bold mb-1">{ev.title}</h3>
                    <p className="text-xs mb-1">
                      <strong>Date:</strong> {ev.date}
                    </p>
                    <p className="text-xs mb-1">
                      <strong>Location:</strong> {ev.location}
                    </p>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalEvent(ev);
                      }}
                    >
                      {renderTruncatedDescription(ev.description, ev)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      {/* Custom Border Styles via JSX */}
      <style jsx>{`
        /* ================== Main Card (Hero) ================== */
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

        /* ================== Featured Card Styles ================== */
        .featured-card {
          position: relative;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        .featured-card::before,
        .featured-card::after {
          content: "•";
          position: absolute;
          width: 14px;
          height: 14px;
          font-size: 14px;
          line-height: 12px;
          text-align: center;
          top: 5px;
        }
        .featured-card::before {
          left: 5px;
          color: #ffd700;
          border: 2px solid #ffd700;
        }
        .featured-card::after {
          right: 5px;
          color: #ffd700;
          border: 2px solid #ffd700;
        }
        .featured-card .card-inner {
          position: relative;
          border: 2px solid transparent;
          background-clip: padding-box;
          padding: 40px;
        }
        .featured-card .card-inner::before,
        .featured-card .card-inner::after {
          content: "•";
          position: absolute;
          width: 14px;
          height: 14px;
          font-size: 14px;
          line-height: 12px;
          text-align: center;
          bottom: -2px;
        }
        .featured-card .card-inner::before {
          left: -2px;
          color: #ffd700;
          border: 2px solid #ffd700;
        }
        .featured-card .card-inner::after {
          right: -2px;
          color: #ffd700;
          border: 2px solid #ffd700;
        }
        .featured-card {
          border: 2px solid transparent;
          border-image: linear-gradient(to right, #ffd700, #ffc107, #ffb300) 1;
        }
        .featured-card .card-inner {
          border: 2px solid transparent;
          border-image: linear-gradient(to right, #ffd700, #ffc107, #ffb300) 1;
        }

        /* ================== Default Card Styles (Black Borders) ================== */
        .default-card {
          position: relative;
          border: 2px solid #000 !important;
          background-clip: padding-box;
          transition:
            border 0.5s ease,
            transform 0.3s ease;
        }
        .default-card::before,
        .default-card::after {
          content: "•";
          position: absolute;
          width: 14px;
          height: 14px;
          font-size: 14px;
          line-height: 12px;
          text-align: center;
          top: 5px;
        }
        .default-card::before {
          left: 5px;
          color: #000;
          border: 2px solid #000;
        }
        .default-card::after {
          right: 5px;
          color: #000;
          border: 2px solid #000;
        }
        .default-card .card-inner {
          position: relative;
          border: 2px solid #000 !important;
          background-clip: padding-box;
          height: 100%;
        }
        .default-card:hover {
          border: 2px solid transparent !important;
          border-image: linear-gradient(to right, #ffb300, #da1a35) 1 !important;
        }
        .default-card:hover .card-inner {
          border: 2px solid transparent !important;
          border-image: linear-gradient(to right, #ffb300, #da1a35) 1 !important;
        }
      `}</style>
    </div>
  );
}
