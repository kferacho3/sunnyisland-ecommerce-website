"use client";

import { AiOutlineArrowDown, AiOutlineArrowRight } from "react-icons/ai";
import { GiChiliPepper } from "react-icons/gi";

interface SectionHeroProps {
  onExploreClick: () => void;
}

export default function SectionHero({ onExploreClick }: SectionHeroProps) {
  return (
    <section className="group relative w-full h-screen flex flex-col items-center justify-center text-white bg-black overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity duration-500"
        src="https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/hero/SunnyIslandPepperSauceHero.mp4"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Title and Buttons Container */}
      <div className="relative z-10 flex flex-col items-center gap-8 p-4 sm:p-8">
        {/* Title Overlay (visible by default; fades out on hover/touch) */}
        <div className="text-center transition-opacity duration-500 group-hover:opacity-0 group-active:opacity-0">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
            GET THE SPICE THAT'S RIGHT{" "}
            <GiChiliPepper
              className="inline-block"
              style={{
                animation: "gradientShift 5s linear infinite",
                background: "linear-gradient(90deg, red, orange, yellow)",
                backgroundSize: "200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            />
          </h1>
          <h2 className="text-4xl sm:text-5xl font-bold">
            SUNNY ISLAND IS HERE!
          </h2>
        </div>

        {/* Buttons Container */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            {/* Products Button */}
            <a
              href="/explore/products"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-yellow-300 text-black font-bold rounded-lg shadow-lg border border-transparent transition-all duration-300 transform hover:scale-105 hover:border-white"
            >
              Products{" "}
              <GiChiliPepper className="transition-colors duration-300 group-hover:text-red-500" />
            </a>

            {/* Shop Button */}
            <a
              href="/shop"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-300 to-green-300 text-black font-bold rounded-lg shadow-lg border border-transparent transition-all duration-300 transform hover:scale-105 hover:border-white relative overflow-hidden"
            >
              <span className="transition-colors duration-300">Shop</span>
              {/* Default Arrow Icon */}
              <AiOutlineArrowRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-0" />
              {/* Hover Arrow Icon (more defined right arrow) */}
              <svg
                className="absolute right-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 4L16 12L8 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
          {/* Explore Button */}
          <button
            onClick={onExploreClick}
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg border border-transparent transition-all duration-300 transform hover:scale-105 hover:border-white"
          >
            <span className="transition-colors duration-300 group-hover:text-yellow-300">
              Explore
            </span>{" "}
            <AiOutlineArrowDown className="transition-transform duration-300 group-hover:translate-y-1" />
          </button>
        </div>
      </div>

      {/* Keyframes for gradient animation */}
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0%;
          }
          100% {
            background-position: 200%;
          }
        }
      `}</style>
    </section>
  );
}
