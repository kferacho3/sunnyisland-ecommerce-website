"use client";

import Image from "next/image";
import { useState } from "react";

export default function SupportUsPage() {
  // Basic carousel index
  const [currentSlide, setCurrentSlide] = useState(0);

  // The three ways to support
  const slides = [
    {
      title: "Buy Our Product",
      subtitle: "Sunny Island Pepper Sauce",
      image:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/contact/supportUs/SunnyIslandSupport1.webp",
      content: `
        One of the best ways to support us is to purchase 
        our delicious pepper sauce! Each bottle is made by hand
        with the freshest ingredients, capturing the flavors
        of the Caribbean. 
      `,
    },
    {
      title: "Share Your Thoughts",
      subtitle: "Social Media Love",
      image:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/contact/supportUs/SunnyIslandSupport2.webp",
      content: `
        Love our product? Spread the word on social media!
        Tag us @sunnypepperisland, use our hashtags, and let
        the world know how our sauce made your meals sizzle.
      `,
    },
    {
      title: "Give Back",
      subtitle: "Mental Health Awareness",
      image:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/contact/supportUs/SunnyIslandSupport3.webp",
      content: `
        We believe in supporting mental health causes. 
        Consider donating your time, resources, or funds
        to any mental health awareness organization.
        Paying it forward is a big part of our mission.
      `,
    },
  ];

  const totalSlides = slides.length;

  // Move to next/previous slide
  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };
  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <main className="pt-[100px] min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Hero / Intro */}
      <section className="max-w-5xl mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-widest">
          Support Us
        </h1>
        <p className="text-sm md:text-base">
          We appreciate your support in any shape or form! Explore the ways you
          can help Sunny Island Pepper Sauce continue to grow and impact the
          community.
        </p>
      </section>

      {/* Carousel Container */}
      <section className="max-w-4xl mx-auto px-4 py-8 relative">
        {/* Slides Wrapper */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, idx) => {
              // Determine the gradient overlay style:
              const overlayStyle =
                slide.title === "Give Back"
                  ? {
                      background:
                        "linear-gradient(45deg, rgba(245,245,220,0.3), rgba(210,180,140,0.3), rgba(222,184,135,0.3))",
                      filter: "blur(8px)",
                      mixBlendMode: "screen",
                    }
                  : {
                      background:
                        "linear-gradient(45deg, rgba(255,0,0,0.3), rgba(255,165,0,0.3), rgba(255,255,0,0.3))",
                      filter: "blur(8px)",
                      mixBlendMode: "screen",
                    };

              return (
                <div
                  key={idx}
                  className="w-full flex-shrink-0 px-2"
                  style={{ minWidth: "100%" }}
                >
                  {/* Unique Shape Container */}
                  <div
                    className="bg-black bg-opacity-30 rounded-xl shadow-lg p-6 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden"
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)",
                    }}
                  >
                    {/* Slide Image with Glowing Overlay */}
                    <div className="w-full h-40 md:h-60 relative">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-contain"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={overlayStyle}
                      />
                    </div>
                    <h2 className="text-2xl font-bold mt-4 mb-2">
                      {slide.title}
                    </h2>
                    <h3 className="text-sm md:text-base font-semibold mb-4 text-indigo-400 uppercase tracking-wider">
                      {slide.subtitle}
                    </h3>
                    <p className="text-sm md:text-base max-w-md text-center leading-relaxed">
                      {slide.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white"
          >
            Next
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-4 gap-2">
          {slides.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`block w-3 h-3 rounded-full cursor-pointer ${
                idx === currentSlide ? "bg-indigo-400" : "bg-gray-500"
              }`}
            ></span>
          ))}
        </div>
      </section>

      {/* Additional Info / CTA */}
      <section className="max-w-5xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Join Our Journey</h2>
        <p className="text-sm md:text-base mb-4">
          Whether you buy a bottle, share a post, or donate to a mental health
          cause, every act of support matters. Thank you for being part of the
          Sunny Island family!
        </p>
        <button
          className="px-6 py-3 bg-pink-600 hover:bg-pink-500 rounded text-white font-semibold uppercase"
          onClick={() => alert("Thanks for Supporting!")}
        >
          Learn More
        </button>
      </section>

      {/* ====================== CAREER SUPPORT SECTION ====================== */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div
          className="bg-black bg-opacity-30 rounded-xl shadow-lg p-6 relative overflow-hidden flex flex-col items-center text-center"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%)",
          }}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-2 uppercase tracking-wider">
            Career Support
          </h2>
          <p className="max-w-xl text-sm md:text-base leading-relaxed mb-4">
            Want to do more than just buy a bottle? Join our team! Sunny Island
            Pepper Sauce is always on the lookout for passionate people to help
            us grow. From product testing to marketing and community outreach,
            there’s a place for you if you love bold flavors and big dreams.
          </p>
          <button
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white font-semibold uppercase"
            onClick={() => alert("Redirect to Careers / Recruiting page?")}
          >
            Explore Careers
          </button>
        </div>
      </section>

      {/* ================== RECIPE SPONSORSHIP SUPPORT SECTION ================== */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div
          className="bg-black bg-opacity-30 rounded-xl shadow-lg p-6 relative overflow-hidden flex flex-col items-center text-center"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%)",
          }}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-2 uppercase tracking-wider">
            Recipe Sponsorship
          </h2>
          <p className="max-w-xl text-sm md:text-base leading-relaxed mb-4">
            Have a culturally inspiring dish that features our pepper sauce?
            We’d love to showcase it on our website with your personal touch and
            credit! Just follow our guidelines:
          </p>
          <ul className="text-left max-w-lg mx-auto list-disc list-inside space-y-1 text-sm md:text-base">
            <li>
              Ensure the dish highlights <em>Sunny Island Pepper Sauce</em>.
            </li>
            <li>
              Use a <strong>non-black table</strong> for your photo background.
            </li>
            <li>
              Photos must pass our <strong>human quality check</strong> for
              clarity &amp; presentation.
            </li>
            <li>Keep it culturally authentic and creative!</li>
          </ul>
          <p className="max-w-xl text-sm md:text-base leading-relaxed mt-4">
            Once approved, we’ll tag you on your dedicated recipe page!
          </p>
          <button
            className="mt-4 px-5 py-2 bg-pink-600 hover:bg-pink-500 rounded text-white font-semibold uppercase"
            onClick={() => alert("Redirect to Recipe Submission page?")}
          >
            Submit Your Recipe
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 py-8">
        <p>
          © {new Date().getFullYear()} Sunny Island Pepper Sauce. All rights
          reserved.
        </p>
      </footer>
    </main>
  );
}
