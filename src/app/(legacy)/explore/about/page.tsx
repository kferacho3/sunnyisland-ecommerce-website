"use client";

import storyData, { IStorySection } from "@/data/storyData";
import { motion, useScroll, useTransform } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  FiArrowRight,
  FiAward,
  FiHeart,
  FiMenu,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { GiChiliPepper, GiNoodles } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi";

// Utility: generate a unique ID (kebab-case) from a topline
function generateId(topline: string): string {
  return topline.toLowerCase().replace(/\s+/g, "-");
}

// Hero Section Component
function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/aboutUs/about1.webp"
          alt="Sunny Island Heritage"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative h-full flex items-center justify-center text-center px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <HiSparkles className="text-4xl text-yellow-400 mx-auto mb-4" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            Our Story
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 font-light"
          >
            From Caribbean roots to tables worldwide, discover the passion
            behind every bottle
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-wrap gap-6 justify-center text-white"
          >
            <div className="flex items-center gap-2">
              <FiAward className="text-2xl text-yellow-400" />
              <span>Est. 1994</span>
            </div>
            <div className="flex items-center gap-2">
              <FiHeart className="text-2xl text-red-400" />
              <span>Family Recipe</span>
            </div>
            <div className="flex items-center gap-2">
              <FiUsers className="text-2xl text-orange-400" />
              <span>Community First</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/50 flex justify-center">
          <div className="w-1 h-3 bg-white/50 mt-2" />
        </div>
      </motion.div>
    </section>
  );
}

// Enhanced Sidebar Component
function Sidebar({
  sections,
  activeSection,
}: {
  sections: IStorySection[];
  activeSection: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarHeight, setSidebarHeight] = useState("auto");

  useEffect(() => {
    const updateSidebarHeight = () => {
      if (sidebarRef.current && window.innerWidth >= 1024) {
        const viewportHeight = window.innerHeight;
        const topOffset = 120; // Adjust based on your header height
        const maxHeight = viewportHeight - topOffset - 40;
        setSidebarHeight(`${maxHeight}px`);
      }
    };

    updateSidebarHeight();
    window.addEventListener("resize", updateSidebarHeight);
    return () => window.removeEventListener("resize", updateSidebarHeight);
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <FiX className="text-2xl" />
        ) : (
          <FiMenu className="text-2xl" />
        )}
      </motion.button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
          fixed lg:sticky top-16 lg:top-28
          ${isOpen ? "left-0" : "-left-full lg:left-auto"}
          w-80 lg:w-full
          h-screen lg:h-auto
          max-h-[calc(100vh-5rem)] lg:max-h-none
          bg-white dark:bg-gray-900 lg:bg-transparent
          z-40 lg:z-auto
          transition-all duration-300
          overflow-y-auto
        `}
        /* Let the effect decide the height. Never read window during render. */
        style={{ height: sidebarHeight }}
      >
        <div className="p-6 lg:p-0 space-y-6">
          {/* Table of Contents */}
          <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-6 border border-gray-200/20 dark:border-gray-700/30 shadow-xl">
            <h3 className="font-bold text-xl mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent flex items-center gap-2">
              <HiSparkles className="text-orange-500" />
              Quick Navigation
            </h3>
            <ul className="space-y-2">
              {sections.map((section, index) => {
                const id = generateId(section.topline);
                const isActive = activeSection === id;

                return (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <a
                      href={`#${id}`}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center gap-3 px-3 py-2 transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-orange-500/10 to-red-500/10 text-orange-600 font-semibold"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 transition-all duration-300 flex-shrink-0 ${
                          isActive
                            ? "bg-gradient-to-r from-orange-500 to-red-500 scale-125"
                            : "bg-gray-300 dark:bg-gray-600 group-hover:bg-orange-400"
                        }`}
                      />
                      <span className="text-sm leading-tight">
                        {section.topline}
                      </span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Recipe Sponsorship Card */}
          <RecipeSponsorshipCard />
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

// Enhanced Recipe Sponsorship Card
function RecipeSponsorshipCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-gradient-to-br from-orange-500 to-red-500 p-[2px] shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-white dark:bg-gray-900 p-5 overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
          }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-orange-400 to-red-400 flex-shrink-0">
              <GiChiliPepper className="text-xl text-white" />
            </div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Recipe Sponsorship
            </h3>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            Share your culinary creations featuring Sunny Island Pepper Sauce!
          </p>

          <div className="space-y-2 mb-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
              Guidelines:
            </h4>
            <ul className="space-y-1.5">
              {[
                "Feature our sauce prominently",
                "High-quality photos",
                "Authentic recipes",
                "Include full ingredients",
              ].map((guideline, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400"
                >
                  <span className="text-orange-500 mt-0.5">•</span>
                  <span>{guideline}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => (window.location.href = "/submit-recipe")}
            className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group text-sm"
          >
            <span className="flex items-center justify-center gap-2">
              Submit Your Recipe
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// Premium Section Display
function SectionDisplay({
  section,
  index,
}: {
  section: IStorySection;
  index: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const placeholderImages = [
    "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/aboutUs/about1.webp",
    "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/aboutUs/about2.webp",
    "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/aboutUs/about3.webp",
    "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/aboutUs/about4.webp",
    "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/aboutUs/about5.webp",
    "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/aboutUs/about6.webp",
    "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/aboutUs/about7.webp",
    "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/aboutUs/about8.webp",
  ];

  const imageSrc =
    section.imageUrl || placeholderImages[index % placeholderImages.length];
  const isEven = index % 2 === 0;

  return (
    <motion.section
      ref={ref}
      id={generateId(section.topline)}
      style={{ opacity }}
      className="relative py-16 sm:py-20 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute ${isEven ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 blur-3xl opacity-5 sm:opacity-10 ${
            index % 3 === 0
              ? "bg-orange-500"
              : index % 3 === 1
                ? "bg-red-500"
                : "bg-yellow-500"
          }`}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center ${
            isEven ? "" : "lg:[&>*:first-child]:order-2"
          }`}
        >
          {/* Image Section */}
          <motion.div
            style={{ y: isEven ? y : undefined }}
            className="relative group"
          >
            <div className="relative overflow-hidden shadow-2xl">
              <Image
                src={imageSrc}
                alt={section.topline}
                width={800}
                height={600}
                className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-orange-400 to-red-400 blur-2xl opacity-30 sm:opacity-50" />
            <div className="absolute -bottom-4 -left-4 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-br from-yellow-400 to-orange-400 blur-2xl opacity-30 sm:opacity-50" />
          </motion.div>

          {/* Content Section */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: isEven ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Topline */}
              <div className="flex items-center gap-3 mb-4">
                <GiChiliPepper className="text-xl sm:text-2xl text-orange-500" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-orange-500">
                  {section.topline}
                </span>
              </div>

              {/* Header */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {section.header}
              </h2>

              {/* Description */}
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 leading-relaxed">
                {section.description}
              </p>

              {/* Bullets */}
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {section.bullets.map((bullet, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 p-1 bg-gradient-to-br from-orange-400 to-red-400 flex-shrink-0">
                      <GiNoodles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 flex-1">
                      {bullet}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA for specific sections */}
              {index === 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
                >
                  Learn More About Our Heritage
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// Stats Section
function StatsSection() {
  const stats = [
    { value: "30+", label: "Years of Excellence" },
    { value: "1M+", label: "Happy Customers" },
    { value: "50+", label: "Countries Served" },
    { value: "100%", label: "Natural Ingredients" },
  ];

  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-r from-orange-500 to-red-500">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                {stat.value}
              </h3>
              <p className="text-sm sm:text-base text-white/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main About Page Component
export default function AboutPage() {
  const historySection = storyData.find((s) => s.topline === "History");
  const aboutUsSection = storyData.find((s) => s.topline === "About Us");
  const remainingSections = storyData.filter(
    (s) => s.topline !== "History" && s.topline !== "About Us",
  );

  const orderedSections: IStorySection[] = [];
  if (historySection) orderedSections.push(historySection);
  if (aboutUsSection) orderedSections.push(aboutUsSection);
  orderedSections.push(...remainingSections);

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sectionIds = orderedSections.map((section) =>
      generateId(section.topline),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [orderedSections]);

  return (
    <>
      <Head>
        <title>
          Our Story - Sunny Island Pepper Sauce | Caribbean Heritage Since 1994
        </title>
        <meta
          name="description"
          content="Discover the journey behind Sunny Island Pepper Sauce, our Caribbean heritage, family recipe, and commitment to bringing authentic island flavors to your table."
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
        {/* Hero Section */}
        <HeroSection />

        {/* Main Content */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Enhanced Sidebar */}
              <div className="lg:col-span-1">
                <Sidebar
                  sections={orderedSections}
                  activeSection={activeSection}
                />
              </div>

              {/* Content */}
              <div className="lg:col-span-3">
                {orderedSections.map((section, idx) => (
                  <SectionDisplay
                    key={section.topline}
                    section={section}
                    index={idx}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <StatsSection />
        </div>
      </main>

      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Anton&display=swap"
        rel="stylesheet"
      />

      {/* Custom Styles */}
      <style jsx global>{`
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f97316, #ef4444);
          border-radius: 5px;
        }

        /* Page transitions */
        .page-transition {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Image loading animation */
        @keyframes imageLoad {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        img {
          animation: imageLoad 0.6s ease-out;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Sticky sidebar improvements */
        @media (min-width: 1024px) {
          aside::-webkit-scrollbar {
            width: 6px;
          }

          aside::-webkit-scrollbar-track {
            background: transparent;
          }

          aside::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #f97316, #ef4444);
            border-radius: 3px;
            opacity: 0.5;
          }

          aside:hover::-webkit-scrollbar-thumb {
            opacity: 1;
          }
        }

        /* Mobile menu animation */
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        /* Premium hover effects */
        .sidebar-link {
          position: relative;
          overflow: hidden;
        }

        .sidebar-link::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(251, 146, 60, 0.1),
            transparent
          );
          transition: left 0.5s;
        }

        .sidebar-link:hover::before {
          left: 100%;
        }

        /* Mobile optimizations */
        @media (max-width: 1024px) {
          .sidebar-mobile {
            animation: slideIn 0.3s ease-out;
          }
        }

        /* Fortune 500 level polish */
        .premium-shadow {
          box-shadow:
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .premium-border {
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.05),
            transparent
          );
        }

        /* Accessibility improvements */
        .focus-visible:focus {
          outline: 2px solid #f97316;
          outline-offset: 2px;
        }

        /* Performance optimizations */
        .gpu-accelerated {
          transform: translateZ(0);
          will-change: transform;
          backface-visibility: hidden;
        }

        /* Print styles */
        @media print {
          .no-print {
            display: none !important;
          }

          main {
            background: white !important;
          }

          .text-gradient {
            -webkit-text-fill-color: black !important;
          }
        }
      `}</style>
    </>
  );
}
