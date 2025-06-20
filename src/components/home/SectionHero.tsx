"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowRight } from "react-icons/ai";
import { GiChiliPepper } from "react-icons/gi";

interface SectionHeroProps {
  onExploreClick: () => void;
}

export default function SectionHero({ onExploreClick }: SectionHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showContent, setShowContent] = useState(true);
  const [viewport, setViewport] = useState({ width: 0, height: 0 }); // ← NEW
  useEffect(() => {
    // Runs only in the browser
    const handleResize = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth > 768) {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        });
      }
    };

    const handleScroll = () => setShowContent(window.scrollY < 10);

    handleResize(); // initial
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center text-white bg-black overflow-hidden">
      {/* SVG gradients and filters */}
      <svg className="absolute" width="0" height="0">
        <defs>
          <linearGradient
            id="pepper-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#DA1A35">
              <animate
                attributeName="stop-color"
                values="#DA1A35;#FF1744;#DA1A35"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="65%" stopColor="#DA1A35" />
            <stop offset="100%" stopColor="#FFB300">
              <animate
                attributeName="stop-color"
                values="#FFB300;#FFC107;#FFB300"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Video background with enhanced mobile support */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 0.7 : 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          x5-playsinline="true"
          preload="auto"
          className="w-full h-full object-cover"
          src="https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/hero/SunnyIslandPepperSauceHero.mp4"
          onLoadedData={() => setIsLoaded(true)}
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(viewport.width && viewport.width < 768 ? 10 : 20)].map(
          (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-400/30 rounded-full"
              initial={{
                x: Math.random() * viewport.width,
                y: viewport.height + 10,
              }}
              animate={{
                y: -10,
                x: Math.random() * viewport.width,
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            />
          ),
        )}
      </div>

      {/* Main content container with fade on scroll */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 md:gap-4 p-4 sm:p-8 max-w-7xl mx-auto w-full"
        style={{
          transform:
            viewport.width > 768
              ? `translate(${mousePosition.x}px, ${mousePosition.y}px)`
              : "none",
          transition: "transform 0.3s ease-out",
        }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Enhanced title with animations */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center  space-y-1 md:space-y-2"
          >
            {/* Premium tagline */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-xs sm:text-sm md:text-base font-light tracking-[0.2em] sm:tracking-[0.3em] leading-snug text-orange-300/80 uppercase"
            >
              Artisan Crafted • Premium Quality
            </motion.p>

            {/* Main headline with staggered animation */}
            <div className="">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-100 to-white">
                  GET THE SPICE
                </span>
              </motion.h1>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black">
                  THAT'S RIGHT
                </span>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <GiChiliPepper
                    className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl"
                    style={{
                      stroke: "url(#pepper-gradient)",
                      fill: "url(#pepper-gradient)",
                      filter: "url(#glow)",
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Subheadline with wave animation */}
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <motion.span
                className="inline-block bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              >
                SUNNY ISLAND
              </motion.span>
              <span className="text-white ml-2 sm:ml-3">IS HERE!</span>
            </motion.h2>
          </motion.div>
        </AnimatePresence>

        {/* Enhanced CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col items-center gap-1 md:gap-2"
        >
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 w-full sm:w-auto">
            {/* Products Button */}
            <motion.a
              href="/explore/products"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 overflow-hidden rounded-full font-bold text-sm sm:text-base md:text-lg transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-400 opacity-90" />
              <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-1 sm:gap-2 text-white">
                Products
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="group-hover:block hidden"
                >
                  <GiChiliPepper className="text-lg sm:text-xl" />
                </motion.div>
                <GiChiliPepper className="text-lg sm:text-xl group-hover:hidden" />
              </span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.a>

            {/* Shop Button */}
            <motion.a
              href="/shop"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 overflow-hidden rounded-full font-bold text-sm sm:text-base md:text-lg bg-white text-black border-2 border-white transition-all duration-300"
            >
              <span className="relative flex items-center justify-center gap-2 sm:gap-3">
                Shop Now
                <AiOutlineArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-green-400/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.a>
          </div>

          {/* Explore Button */}
          <motion.button
            onClick={onExploreClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 text-white/80 font-medium text-sm sm:text-base border border-white/30 rounded-full backdrop-blur-sm transition-all duration-300 hover:border-white hover:text-white"
          >
            <span>Explore More</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AiOutlineArrowDown className="text-base sm:text-lg" />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Trust indicators - positioned at bottom with proper spacing */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-32 sm:bottom-32 left-0 right-0 flex justify-center gap-4 sm:gap-6 md:gap-8 text-[10px] sm:text-xs md:text-sm text-white/60 px-4"
      >
        <span className="whitespace-nowrap">🌶️ Small Batch</span>
        <span className="whitespace-nowrap">🏆 Award Winning</span>
        <span className="whitespace-nowrap">🌿 Natural Ingredients</span>
      </motion.div>

      {/* Scroll indicator - also fades on scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-0.5 h-2 sm:w-1 sm:h-3 bg-white/60 rounded-full mt-1.5 sm:mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Enhanced video loading fallback for mobile */}
      <style jsx global>{`
        @media (max-width: 768px) {
          video {
            object-fit: cover !important;
          }
        }

        /* iOS Safari specific video autoplay fix */
        @supports (-webkit-touch-callout: none) {
          video {
            -webkit-playsinline: true;
          }
        }
      `}</style>
    </section>
  );
}
