"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { BsCreditCard2Back, BsGraphUpArrow, BsPeople } from "react-icons/bs";
import {
  FiArrowRight,
  FiAward,
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
  FiHeart,
  FiShare2,
  FiShoppingBag,
  FiStar,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import { IoMdRocket } from "react-icons/io";
import {
  RiHandHeartLine,
  RiRestaurantLine,
  RiSparklingFill,
} from "react-icons/ri";

export default function SupportUsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50]);

  // Track mouse for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Enhanced slides data
  const slides = [
    {
      id: "buy",
      title: "Taste the Difference",
      subtitle: "Premium Pepper Sauce Collection",
      icon: <FiShoppingBag className="w-10 h-10" />,
      accentColor: "from-amber-600 via-orange-500 to-red-600",
      glowColor: "#ff6b35",
      bgPattern:
        'bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ff6b35" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')]',
      image:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/contact/supportUs/SunnyIslandSupport1.webp",
      content:
        "Experience the authentic taste of the Caribbean with every bottle. Our handcrafted pepper sauce is made from locally sourced ingredients, bringing you the perfect blend of heat and flavor that transforms any meal into a culinary adventure.",
      features: [
        { icon: <FiAward className="w-4 h-4" />, text: "Award-Winning Recipe" },
        {
          icon: <RiSparklingFill className="w-4 h-4" />,
          text: "100% Natural Ingredients",
        },
        {
          icon: <BsCreditCard2Back className="w-4 h-4" />,
          text: "Secure Checkout",
        },
      ],
      cta: "Shop Collection",
      stats: {
        label: "Satisfied Customers",
        value: "50,000+",
        growth: "+125%",
      },
    },
    {
      id: "share",
      title: "Spread the Love",
      subtitle: "Join Our Community",
      icon: <FiHeart className="w-10 h-10" />,
      accentColor: "from-pink-600 via-purple-500 to-indigo-600",
      glowColor: "#ec4899",
      bgPattern:
        'bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ec4899" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')]',
      image:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/contact/supportUs/SunnyIslandSupport2.webp",
      content:
        "Your voice matters! Share your Sunny Island experience on social media and help us reach more spice enthusiasts. Tag us in your culinary creations and join thousands who've made our sauce their kitchen essential.",
      features: [
        { icon: <FiShare2 className="w-4 h-4" />, text: "#SunnyIslandMoments" },
        { icon: <BsPeople className="w-4 h-4" />, text: "Vibrant Community" },
        { icon: <IoMdRocket className="w-4 h-4" />, text: "Exclusive Rewards" },
      ],
      cta: "Join Community",
      stats: { label: "Social Mentions", value: "15,000+", growth: "+200%" },
    },
    {
      id: "give",
      title: "Make an Impact",
      subtitle: "Mental Health Advocacy",
      icon: <FiUsers className="w-10 h-10" />,
      accentColor: "from-teal-600 via-cyan-500 to-blue-600",
      glowColor: "#14b8a6",
      bgPattern:
        'bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2314b8a6" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')]',
      image:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/contact/supportUs/SunnyIslandSupport3.webp",
      content:
        "We're committed to breaking barriers around mental health. By supporting mental health initiatives, you're joining us in creating positive change. Together, we can make a difference in our communities and beyond.",
      features: [
        {
          icon: <RiHandHeartLine className="w-4 h-4" />,
          text: "Community Support",
        },
        { icon: <FiTrendingUp className="w-4 h-4" />, text: "Growing Impact" },
        {
          icon: <HiOutlineSparkles className="w-4 h-4" />,
          text: "Real Change",
        },
      ],
      cta: "Learn More",
      stats: { label: "Lives Touched", value: "5,000+", growth: "+300%" },
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const handleSlideChange = (direction: "next" | "prev" | number) => {
    setIsAutoPlaying(false);
    if (direction === "next") {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else if (direction === "prev") {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    } else {
      setCurrentSlide(direction);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Advanced Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(600px circle at 0% 0%, rgba(255,107,53,0.1), transparent 50%)",
              "radial-gradient(600px circle at 100% 100%, rgba(236,72,153,0.1), transparent 50%)",
              "radial-gradient(600px circle at 0% 0%, rgba(255,107,53,0.1), transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 40%)`,
          }}
        />
      </div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ y: parallaxY }}
        className="relative pt-32 pb-20 px-4 z-10"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: isHeroInView ? 1 : 0,
              y: isHeroInView ? 0 : 30,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500/10 to-pink-500/10 backdrop-blur-md rounded-full mb-8 border border-white/10"
            >
              <RiSparklingFill className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                Join the Movement
              </span>
              <RiSparklingFill className="w-5 h-5 text-yellow-400 animate-pulse" />
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-6xl md:text-8xl font-black mb-6 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="relative z-10 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Support Our
              </span>
              <br />
              <span className="relative z-10 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Journey
              </span>
              <motion.div
                className="absolute inset-0 blur-3xl opacity-30"
                animate={{
                  background: [
                    "radial-gradient(circle, rgba(251,146,60,0.3), transparent 70%)",
                    "radial-gradient(circle, rgba(236,72,153,0.3), transparent 70%)",
                    "radial-gradient(circle, rgba(251,146,60,0.3), transparent 70%)",
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-              gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Every bottle purchased, every story shared, and every act of
              kindness helps us spread the warmth of Caribbean flavors while
              making a difference in our community.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            >
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 font-semibold hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 transition-all inline-flex items-center gap-2 group">
                Get Started
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 font-semibold hover:bg-white/20 transition-all">
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Carousel Section */}
      <section className="relative py-16 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content Side */}
                <div className="space-y-8">
                  {/* Slide Number */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-6xl font-black text-gray-800">
                      0{currentSlide + 1}
                    </span>
                    <div className="h-[2px] w-20 bg-gradient-to-r from-gray-700 to-transparent" />
                  </motion.div>

                  {/* Icon and Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >
                    <div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${slides[currentSlide].accentColor} shadow-2xl`}
                    >
                      {slides[currentSlide].icon}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold">
                      {slides[currentSlide].title}
                    </h2>
                    <p className="text-xl text-gray-400">
                      {slides[currentSlide].subtitle}
                    </p>
                  </motion.div>

                  {/* Content */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg text-gray-300 leading-relaxed"
                  >
                    {slides[currentSlide].content}
                  </motion.p>

                  {/* Features Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                  >
                    {slides[currentSlide].features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
                      >
                        <div
                          className={`text-gradient-to-r ${slides[currentSlide].accentColor} bg-clip-text text-transparent`}
                        >
                          {feature.icon}
                        </div>
                        <span className="text-sm text-gray-300">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Stats and CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-900/50 rounded-xl">
                        <BsGraphUpArrow className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold">
                          {slides[currentSlide].stats.value}
                        </p>
                        <p className="text-sm text-gray-400">
                          {slides[currentSlide].stats.label}
                        </p>
                        <p className="text-xs text-green-400">
                          {slides[currentSlide].stats.growth} this year
                        </p>
                      </div>
                    </div>
                    <button
                      className={`px-8 py-4 rounded-full bg-gradient-to-r ${slides[currentSlide].accentColor} font-semibold hover:scale-105 hover:shadow-lg transition-all inline-flex items-center gap-2 group`}
                    >
                      {slides[currentSlide].cta}
                      <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                </div>

                {/* Image Side */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <div
                    className={`absolute inset-0 ${slides[currentSlide].bgPattern} opacity-20`}
                  />
                  <div className="relative aspect-square max-w-lg mx-auto">
                    {/* Dynamic Glow */}
                    <motion.div
                      className="absolute inset-0 blur-3xl opacity-40"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{
                        background: `radial-gradient(circle, ${slides[currentSlide].glowColor}, transparent 60%)`,
                      }}
                    />

                    {/* Image Container */}
                    <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl p-8 border border-gray-700/50">
                      <Image
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].title}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>

                    {/* Floating Elements */}
                    <motion.div
                      className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br from-orange-400/20 to-pink-400/20 blur-2xl"
                      animate={{
                        y: [0, -20, 0],
                        x: [0, 10, 0],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 blur-2xl"
                      animate={{
                        y: [0, 20, 0],
                        x: [0, -10, 0],
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-16">
            <button
              onClick={() => handleSlideChange("prev")}
              className="p-4 rounded-full bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:bg-gray-800/50 hover:border-gray-700 transition-all group"
              aria-label="Previous slide"
            >
              <FiChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>

            {/* Progress Dots */}
            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSlideChange(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide
                      ? "w-12 bg-gradient-to-r from-orange-400 to-pink-400"
                      : "w-2 bg-gray-700 hover:bg-gray-600"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => handleSlideChange("next")}
              className="p-4 rounded-full bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:bg-gray-800/50 hover:border-gray-700 transition-all group"
              aria-label="Next slide"
            >
              <FiChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Additional Support Cards */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-md rounded-full mb-4 border border-white/10">
              <HiOutlineSparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-400">
                Expand Your Impact
              </span>
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              More Ways to Support
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Discover additional opportunities to join our mission and become
              part of the Sunny Island family.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Career Card */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all" />
              <div className="relative h-full bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl">
                    <FiBriefcase className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Join Our Team</h3>
                    <p className="text-gray-400">Career Opportunities</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-8 leading-relaxed">
                  Be part of something bigger! We're looking for passionate
                  individuals who share our love for authentic flavors and
                  community impact. Join us in spreading Caribbean joy
                  worldwide.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    { icon: <FiStar />, text: "Competitive compensation" },
                    { icon: <FiAward />, text: "Growth opportunities" },
                    {
                      icon: <RiHandHeartLine />,
                      text: "Purpose-driven culture",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="text-yellow-400">
                        {React.cloneElement(item.icon, {
                          className: "w-5 h-5",
                        })}
                      </div>
                      <span className="text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 font-semibold hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 transition-all inline-flex items-center justify-center gap-2 group">
                  Explore Careers
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Recipe Sponsorship Card */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all" />
              <div className="relative h-full bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-600 to-red-600 shadow-2xl">
                    <RiRestaurantLine className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      Recipe Sponsorship
                    </h3>
                    <p className="text-gray-400">Share Your Creations</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-8 leading-relaxed">
                  Have a culturally inspiring dish featuring our pepper sauce?
                  We'd love to showcase it on our website with full credit to
                  you!
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    "Feature Sunny Island Pepper Sauce prominently",
                    "Use non-black table backgrounds for photos",
                    "Pass our quality & presentation standards",
                    "Keep it culturally authentic & creative",
                  ].map((requirement, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-red-400 mt-2 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">
                        {requirement}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-4 rounded-full bg-gradient-to-r from-orange-600 to-red-600 font-semibold hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 transition-all inline-flex items-center justify-center gap-2 group">
                  Submit Your Recipe
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-pink-900/10 to-orange-900/10" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-md rounded-full mb-4 border border-white/10">
              <BsGraphUpArrow className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-green-400">
                Our Impact
              </span>
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Together We're Stronger
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Thanks to supporters like you, we're making a real difference
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                label: "Bottles Sold",
                value: "50K+",
                icon: <FiShoppingBag className="w-6 h-6" />,
                color: "from-orange-500 to-red-500",
              },
              {
                label: "Happy Customers",
                value: "10K+",
                icon: <FiHeart className="w-6 h-6" />,
                color: "from-pink-500 to-purple-500",
              },
              {
                label: "Mental Health Donations",
                value: "$25K+",
                icon: <RiHandHeartLine className="w-6 h-6" />,
                color: "from-teal-500 to-blue-500",
              },
              {
                label: "Community Members",
                value: "5K+",
                icon: <FiUsers className="w-6 h-6" />,
                color: "from-purple-500 to-indigo-500",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all text-center">
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}
                  >
                    {stat.icon}
                  </div>
                  <h3
                    className={`text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.value}
                  </h3>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-md rounded-full mb-4 border border-white/10">
              <FiHeart className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-400">
                What People Say
              </span>
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Stories from Our Supporters
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "The best pepper sauce I've ever tasted! It's become a staple in my kitchen.",
                author: "Maria S.",
                role: "Loyal Customer",
              },
              {
                quote:
                  "Supporting mental health awareness while enjoying amazing flavors - it's a win-win!",
                author: "James K.",
                role: "Community Member",
              },
              {
                quote:
                  "The recipe sponsorship program helped me share my culture with the world.",
                author: "Aisha M.",
                role: "Recipe Contributor",
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-4 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 blur-3xl" />

            <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/50">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <HiOutlineSparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium">Thank You</span>
              </span>

              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Ready to Make a Difference?
              </h2>

              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Whether you buy a bottle, share a post, join our team, or donate
                to a cause, every act of support matters. Together, we're
                building something special.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 font-semibold hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 transition-all inline-flex items-center gap-2 group">
                  Start Supporting Today
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 font-semibold hover:bg-white/20 transition-all inline-flex items-center gap-2">
                  <FiShare2 className="w-5 h-5" />
                  Share This Page
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative py-12 px-4 border-t border-gray-800 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-400 mb-2">
                © {new Date().getFullYear()} Sunny Island Pepper Sauce. All
                rights reserved.
              </p>
              <p className="text-sm text-gray-500">
                Made with 🌶️ and ❤️ in the Caribbean
              </p>
            </div>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
