"use client"; // Required for using Framer Motion in Next.js App Router

import storyData, { IStorySection } from "@/data/storyData";
import { motion } from "framer-motion";

export default function AboutPage() {
  // We want "History" and "About Us" first. Then the rest in the order they appear.
  // The original array is: [Nutritional Value, History, About Us, Mental Health..., Partnering...]
  // So let's reorder:
  const historySection = storyData.find((s) => s.topline === "History");
  const aboutUsSection = storyData.find((s) => s.topline === "About Us");

  // Filter out History & About Us from the original data
  const remainingSections = storyData.filter(
    (s) => s.topline !== "History" && s.topline !== "About Us"
  );

  // Construct final array: [History, About Us, ...others]
  // You specifically asked for History, then About Us as first two sections
  const orderedSections: IStorySection[] = [];
  if (historySection) orderedSections.push(historySection);
  if (aboutUsSection) orderedSections.push(aboutUsSection);
  orderedSections.push(...remainingSections);

  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <section className="p-4 sm:p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold text-center mb-6">
          Our Story
        </h1>
        <p className="text-center text-sm sm:text-base mb-12">
          Discover how Sunny Island Pepper Sauce came to life and the values
          that drive us forward.
        </p>

        {orderedSections.map((section, idx) => (
          <SectionDisplay key={section.topline} section={section} index={idx} />
        ))}
      </section>
    </main>
  );
}

// Sub-component that handles the layout styles, images, and animations
interface SectionDisplayProps {
  section: IStorySection;
  index: number; // to help alternate or choose different styles
}

/**
 * This component uses framer-motion for subtle animations
 * and changes layout depending on the index / topline.
 */
function SectionDisplay({ section, index }: SectionDisplayProps) {
  // We'll define a random or cyclical set of layout patterns
  // For instance, 3 patterns:
  // 0 -> Image on left, text on right
  // 1 -> Full width background, text overlay
  // 2 -> Image on right, text on left
  // Then cycle them with: patternIndex = index % 3

  const patternIndex = index % 3;

  // Basic framer-motion variants
  const fadeVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // If you have images, replace the placeholders with real images
  // or dynamic assets. We'll just use random placeholder URLs.
  const placeholderImages = [
    "https://via.placeholder.com/600x400?text=SunnyIsland1",
    "https://via.placeholder.com/600x400?text=SunnyIsland2",
    "https://via.placeholder.com/600x400?text=SunnyIsland3",
    "https://via.placeholder.com/600x400?text=SunnyIsland4",
    "https://via.placeholder.com/600x400?text=SunnyIsland5",
  ];
  // pick one image based on index
  const imageSrc = placeholderImages[index % placeholderImages.length];

  // Decide layout:
  if (patternIndex === 0) {
    // Image left, text right
    return (
      <motion.div
        variants={fadeVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-12 flex flex-col sm:flex-row items-center gap-6"
      >
        {/* Image left */}
        <div className="flex-1">
          <img
            src={imageSrc}
            alt={section.topline}
            className="w-full h-auto rounded shadow"
          />
        </div>
        {/* Text right */}
        <div className="flex-1">
          <SectionText section={section} />
        </div>
      </motion.div>
    );
  } else if (patternIndex === 1) {
    // Full width background with text overlay
    return (
      <motion.div
        variants={fadeVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-12 relative bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow"
      >
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1 order-2 sm:order-1">
            <SectionText section={section} />
          </div>
          <div className="flex-1 order-1 sm:order-2">
            <img
              src={imageSrc}
              alt={section.topline}
              className="w-full h-auto rounded shadow"
            />
          </div>
        </div>
      </motion.div>
    );
  } else {
    // patternIndex === 2 -> Image right, text left
    return (
      <motion.div
        variants={fadeVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-12 flex flex-col sm:flex-row items-center gap-6"
      >
        {/* Text left */}
        <div className="flex-1 order-2 sm:order-1">
          <SectionText section={section} />
        </div>
        {/* Image right */}
        <div className="flex-1 order-1 sm:order-2">
          <img
            src={imageSrc}
            alt={section.topline}
            className="w-full h-auto rounded shadow"
          />
        </div>
      </motion.div>
    );
  }
}

// A small sub-component that displays the text portion
function SectionText({ section }: { section: IStorySection }) {
  return (
    <>
      <h3 className="text-sm sm:text-base uppercase text-secondary font-bold mb-1">
        {section.topline}
      </h3>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">
        {section.header}
      </h2>
      <p className="text-sm sm:text-base mb-4">{section.description}</p>
      <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
        {section.bullets.map((bullet, idx) => (
          <li key={idx}>{bullet}</li>
        ))}
      </ul>
    </>
  );
}
