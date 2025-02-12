// pages/index.tsx
"use client";

import SectionExploreGrid from "@/components/home/SectionExploreGrid";
import SectionHero from "@/components/home/SectionHero";
import SectionNewsletter from "@/components/home/SectionNewsletter";
import SectionParallax from "@/components/home/SectionParallax";
import SectionProductSneak from "@/components/home/SectionProductSneak";
import SectionSocial from "@/components/home/SectionSocial";
import Head from "next/head";
import { useRef } from "react";

const Home = () => {
  const productSectionRef = useRef<HTMLDivElement>(null);

  const handleExploreClick = () => {
    productSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Head>
        <title>Sunny Island Pepper | Home</title>
        <meta
          name="description"
          content="Welcome to Sunny Island Pepper, your source for authentic Caribbean pepper sauce."
        />
      </Head>

      <main className="min-h-screen bg-white dark:bg-black dark:text-white">
        {/* Hero Section */}

        <SectionHero onExploreClick={handleExploreClick} />

        {/* Section 2: Product Sneak Peek */}
        <div ref={productSectionRef}>
          <SectionProductSneak />
        </div>
        {/* Section 3: Parallax Product View */}
        <SectionParallax />

        {/* Section 4: Explore Grid */}
        <SectionExploreGrid />

        {/* Section 5: Newsletter Signup */}
        <SectionNewsletter />

        {/* Section 6: Social / Blog Section */}
        <SectionSocial />
      </main>
    </>
  );
};

export default Home;
