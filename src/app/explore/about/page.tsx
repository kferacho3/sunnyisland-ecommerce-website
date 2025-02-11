"use client"; // Required for client-side interactivity and framer-motion

import storyData, { IStorySection } from "@/data/storyData";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GiHexagonalNut } from "react-icons/gi";

// Utility: generate a unique ID (kebab-case) from a topline
function generateId(topline: string): string {
  return topline.toLowerCase().replace(/\s+/g, "-");
}

// Table of Contents component for desktop
function TableOfContents({
  sections,
  activeSection,
}: {
  sections: IStorySection[];
  activeSection: string;
}) {
  return (
    <nav className="sticky top-20 p-4 bg-white dark:bg-gray-900 rounded shadow">
      <h3 className="font-bold mb-4 text-primary">Contents</h3>
      <ul className="space-y-2">
        {sections.map((section) => {
          const id = generateId(section.topline);
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`block text-sm transition-colors hover:text-secondary ${
                  activeSection === id
                    ? "font-bold text-secondary"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {section.topline}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// SectionDisplay displays each section with alternating layout and background color.
function SectionDisplay({
  section,
  index,
}: {
  section: IStorySection;
  index: number;
}) {
  // Framer-motion animation variant
  const fadeVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Use the provided section.imageUrl; if none, choose from placeholderImages
  const placeholderImages = [
    "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/aboutUs/about1.webp",
    "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/aboutUs/about2.webp",
    "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/aboutUs/about3.webp",
    "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/aboutUs/about4.webp",
    "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/aboutUs/about5.webp",
  ];
  const imageSrc = section.imageUrl || placeholderImages[index % placeholderImages.length];

  // Alternate based on index: even sections get image left / text right,
  // odd sections get text left / image right.
  const isEven = index % 2 === 0;
  const containerBg = isEven ? "bg-white dark:bg-black" : "bg-gray-100 dark:bg-gray-800";

  return (
    <motion.div
      id={generateId(section.topline)}
      variants={fadeVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`mb-12 p-6 rounded-lg shadow flex flex-col sm:flex-row items-center gap-6 ${containerBg}`}
    >
      {isEven ? (
        <>
          <div className="flex-1">
            <Image
              src={imageSrc}
              alt={section.topline}
              width={600}
              height={400}
              className="w-full h-auto rounded shadow"
            />
          </div>
          <div className="flex-1">
            <SectionText section={section} />
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 order-2 sm:order-1">
            <SectionText section={section} />
          </div>
          <div className="flex-1 order-1 sm:order-2">
            <Image
              src={imageSrc}
              alt={section.topline}
              width={600}
              height={400}
              className="w-full h-auto rounded shadow"
            />
          </div>
        </>
      )}
    </motion.div>
  );
}

function SectionText({ section }: { section: IStorySection }) {
  return (
    <>
      <h3 className="text-sm sm:text-base uppercase text-secondary font-bold mb-1">
        {section.topline}
      </h3>
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4">{section.header}</h2>
      <p className="text-base mb-4">{section.description}</p>
      <ul className="space-y-2">
        {section.bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <GiHexagonalNut className="w-5 h-5 text-secondary" />
            <span className="text-base">{bullet}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function AboutPage() {
  // Reorder sections: "History" and "About Us" first.
  const historySection = storyData.find((s) => s.topline === "History");
  const aboutUsSection = storyData.find((s) => s.topline === "About Us");
  const remainingSections = storyData.filter(
    (s) => s.topline !== "History" && s.topline !== "About Us"
  );
  const orderedSections: IStorySection[] = [];
  if (historySection) orderedSections.push(historySection);
  if (aboutUsSection) orderedSections.push(aboutUsSection);
  orderedSections.push(...remainingSections);

  // Track the currently visible section for TOC highlighting.
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sectionIds = orderedSections.map((section) => generateId(section.topline));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
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
        <title>Our Story - Sunny Island Pepper Sauce</title>
        <meta
          name="description"
          content="Discover the journey behind Sunny Island Pepper Sauce, our Caribbean heritage, and our commitment to community and flavor."
        />
      </Head>
      <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
        {/* Header with gradient background */}
        <header className="py-8 bg-primary-gradient text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-2">Our Story</h1>
          <p className="text-lg md:text-2xl">
            Spice up any recipe below with Sunny Island Pepper Sauce
          </p>
        </header>
        {/* Layout: TOC sidebar (desktop) + content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="hidden md:block">
            <TableOfContents sections={orderedSections} activeSection={activeSection} />
            <div className="mt-8 p-4 bg-gray-200 dark:bg-gray-700 rounded">
              <h2 className="text-xl font-bold mb-2 uppercase tracking-wider text-primary">
                Recipe Sponsorship
              </h2>
              <p className="text-sm mb-4">
                Have a culturally inspiring dish featuring <em>Sunny Island Pepper Sauce</em>? We’d love to showcase it on our website with your personal touch and credit! Follow our guidelines:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Ensure your dish highlights <em>Sunny Island Pepper Sauce</em>.</li>
                <li>Use a non‑black table for your photo background.</li>
                <li>Photos must be clear and pass our quality check.</li>
                <li>Keep your dish culturally authentic and creative!</li>
              </ul>
              <p className="text-sm mt-4">
                Once approved, we’ll credit you on your dedicated recipe page.
              </p>
              <button
                onClick={() => alert("Redirect to Recipe Submission page?")}
                className="mt-4 px-5 py-2 bg-secondary hover:bg-red-600 rounded text-white font-semibold uppercase"
              >
                Submit Your Recipe
              </button>
            </div>
          </aside>
          <div className="md:col-span-3 space-y-12">
            {orderedSections.map((section, idx) => (
              <SectionDisplay key={section.topline} section={section} index={idx} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
