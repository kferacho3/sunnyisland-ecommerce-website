// src/components/home/SectionHero.tsx
"use client"; // If you need client-side interactivity, e.g., scrollIntoView

import { AiOutlineArrowRight } from "react-icons/ai";
import { GiChiliPepper } from "react-icons/gi"; // Example food-condiment icon

interface SectionHeroProps {
  onExploreClick: () => void;
}

export default function SectionHero({ onExploreClick }: SectionHeroProps) {
  return (
    <section
      className="relative w-full h-screen flex flex-col items-center justify-center text-white bg-black"
      // Optional: If you want a background image or gradient overlay
      // style={{ background: "url('/path/to/your/image.jpg') center/cover no-repeat" }}
    >
      {/* Placeholder video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        src="https://www.w3schools.com/html/mov_bbb.mp4" // Replace with your promotional video
      />

      {/* Overlay for darkening or coloring the video */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 p-4 sm:p-8">
        <div className="flex gap-4">
          {/* Products Button */}
          <a
            href="/explore/products"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-black font-bold rounded hover:opacity-80 transition"
          >
            Products <GiChiliPepper />
          </a>

          {/* Shop Button */}
          <a
            href="/shop"
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-black font-bold rounded hover:opacity-80 transition"
          >
            Shop <AiOutlineArrowRight />
          </a>
        </div>

        {/* Explore Button */}
        <button
          onClick={onExploreClick}
          className="mt-6 underline hover:opacity-80 transition text-sm sm:text-base"
        >
          Explore ↓
        </button>
      </div>
    </section>
  );
}
