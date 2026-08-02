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
import { BsLightbulb, BsPeople } from "react-icons/bs";
import {
  FiArrowRight,
  FiAward,
  FiBriefcase,
  FiCheck,
  FiGlobe,
  FiHeart,
  FiMapPin,
  FiStar,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { GiChefToque, GiKnifeFork } from "react-icons/gi";
import { HiOutlineSparkles } from "react-icons/hi";
import { IoMdRocket } from "react-icons/io";
import { MdOutlineStorefront } from "react-icons/md";
import {
  RiHandHeartLine,
  RiRestaurantLine,
  RiSparklingFill,
  RiTeamLine,
} from "react-icons/ri";

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
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

  // Career opportunities data
  const opportunities = [
    {
      id: "kitchen",
      title: "Kitchen Workers",
      icon: <GiKnifeFork className="w-8 h-8" />,
      image:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/contact/careers/SunnyIslandCareers.webp",
      description:
        "Help us produce our signature pepper sauce in a vibrant, fully licensed commercial kitchen.",
      fullDescription:
        "We're always seeking dedicated folks ready to prep, cook, and package with precision. If you're passionate about quality and love working with fresh ingredients, this is for you!",
      accentColor: "from-orange-600 to-red-600",
      glowColor: "#ff6b35",
      perks: [
        "Competitive hourly wages",
        "Flexible scheduling",
        "Free product samples",
        "Growth opportunities",
      ],
      requirements: [
        "Food handling certification",
        "Attention to detail",
        "Team player attitude",
        "Physical stamina",
      ],
      cta: "Apply Now",
      openPositions: 5,
    },
    {
      id: "ambassador",
      title: "Brand Ambassadors",
      icon: <BsPeople className="w-8 h-8" />,
      image:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/contact/careers/SunnyIslandCareers2.webp",
      description:
        "Share your love for Sunny Island Pepper Sauce and become the face of our brand.",
      fullDescription:
        "If you have a knack for social media and want to share your love for Sunny Island Pepper Sauce, join us as a Brand Ambassador! From live demos to Instagram reels, show the world how our sauce can elevate any meal.",
      accentColor: "from-pink-600 to-purple-600",
      glowColor: "#ec4899",
      perks: [
        "Commission-based earnings",
        "Free products monthly",
        "Exclusive events access",
        "Social media features",
      ],
      requirements: [
        "Active social media presence",
        "Excellent communication",
        "Creative content creation",
        "Passion for food",
      ],
      cta: "Learn More",
      openPositions: 10,
    },
    {
      id: "chef",
      title: "Chef Collaborations",
      icon: <GiChefToque className="w-8 h-8" />,
      image:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/contact/careers/SunnyIslandCareers3.webp",
      description:
        "Partner with us to create unique recipes that showcase our pepper sauce.",
      fullDescription:
        "Have a unique recipe that showcases our pepper sauce? We'll partner with you to feature it on our site and tag you for recognition. Let's bring bold, culturally inspiring dishes to life together—your creativity, our flavor!",
      accentColor: "from-teal-600 to-blue-600",
      glowColor: "#14b8a6",
      perks: [
        "Recipe feature on website",
        "Social media recognition",
        "Collaboration opportunities",
        "Product sponsorship",
      ],
      requirements: [
        "Professional culinary experience",
        "Creative recipe development",
        "Photography skills (bonus)",
        "Cultural cuisine knowledge",
      ],
      cta: "Submit Recipe",
      openPositions: "Ongoing",
    },
    {
      id: "wholesale",
      title: "Wholesale Partners",
      icon: <MdOutlineStorefront className="w-8 h-8" />,
      image:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/contact/careers/SunnyIslandCareers4.webp",
      description:
        "Stock our sauce in your store or restaurant with flexible wholesale options.",
      fullDescription:
        "Stock our sauce in your store or use it in your eatery—whatever you need, we've got flexible wholesale options. Let's work together so your customers can enjoy the island flair wherever they dine.",
      accentColor: "from-purple-600 to-indigo-600",
      glowColor: "#8b5cf6",
      perks: [
        "Competitive wholesale pricing",
        "Marketing support",
        "Flexible minimum orders",
        "Exclusive promotions",
      ],
      requirements: [
        "Valid business license",
        "Storage capabilities",
        "Customer base alignment",
        "Commitment to quality",
      ],
      cta: "Partner With Us",
      openPositions: "Unlimited",
    },
  ];

  // Company values
  const values = [
    {
      icon: <FiHeart />,
      title: "Passion",
      description: "Love what you do, every single day",
    },
    {
      icon: <BsLightbulb />,
      title: "Innovation",
      description: "Always looking for better ways",
    },
    {
      icon: <RiTeamLine />,
      title: "Community",
      description: "Together we achieve more",
    },
    {
      icon: <FiTrendingUp />,
      title: "Growth",
      description: "Personal and professional development",
    },
  ];

  // Benefits
  const benefits = [
    {
      icon: <FiAward />,
      title: "Recognition",
      description: "Your contributions matter",
    },
    {
      icon: <IoMdRocket />,
      title: "Career Growth",
      description: "Clear advancement paths",
    },
    {
      icon: <RiHandHeartLine />,
      title: "Work-Life Balance",
      description: "Flexible scheduling options",
    },
    {
      icon: <FiGlobe />,
      title: "Diverse Culture",
      description: "Inclusive environment for all",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Advanced Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(800px circle at 0% 0%, rgba(255,107,53,0.15), transparent 50%)",
              "radial-gradient(800px circle at 100% 100%, rgba(139,92,246,0.15), transparent 50%)",
              "radial-gradient(800px circle at 0% 100%, rgba(236,72,153,0.15), transparent 50%)",
              "radial-gradient(800px circle at 100% 0%, rgba(20,184,166,0.15), transparent 50%)",
              "radial-gradient(800px circle at 0% 0%, rgba(255,107,53,0.15), transparent 50%)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <div
          className="absolute inset-0 opacity-10"
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500/10 to-purple-500/10 backdrop-blur-md mb-8 border border-white/10"
            >
              <RiSparklingFill className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                We're Hiring
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
                Join Our
              </span>
              <br />
              <span className="relative z-10 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Growing Family
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
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Be part of something special. Help us spread the warmth of
              Caribbean flavors while building a career you'll love.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-8 mt-12"
            >
              {[
                { value: "50+", label: "Team Members" },
                { value: "4.8", label: "Employee Rating" },
                { value: "15+", label: "Open Positions" },
                { value: "100%", label: "Growth Rate" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Opportunities Section */}
      <section className="relative py-20 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-md mb-4 border border-white/10">
              <FiBriefcase className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-400">
                Open Positions
              </span>
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Role
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Explore exciting opportunities to grow your career while making a
              real impact
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {opportunities.map((opp, idx) => (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group relative"
                onMouseEnter={() => setSelectedRole(opp.id)}
                onMouseLeave={() => setSelectedRole(null)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${opp.accentColor} opacity-10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all`}
                />
                <div className="relative h-full bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all">
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={opp.image}
                      alt={opp.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    {/* Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm border border-white/20">
                      <span className="text-xs font-semibold">
                        {typeof opp.openPositions === "number"
                          ? `${opp.openPositions} Openings`
                          : opp.openPositions}
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className={`absolute bottom-4 left-4 p-3 bg-gradient-to-br ${opp.accentColor} shadow-2xl`}
                    >
                      {opp.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3">{opp.title}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {opp.description}
                    </p>

                    {/* Expandable Details */}
                    <AnimatePresence>
                      {selectedRole === opp.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-gray-400 mb-4">
                            {opp.fullDescription}
                          </p>

                          <div className="grid sm:grid-cols-2 gap-4 mb-6">
                            {/* Perks */}
                            <div>
                              <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <FiStar className="w-4 h-4 text-yellow-400" />
                                Perks
                              </h4>
                              <ul className="space-y-1">
                                {opp.perks.map((perk, idx) => (
                                  <li
                                    key={idx}
                                    className="text-sm text-gray-300 flex items-start gap-2"
                                  >
                                    <FiCheck className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                    {perk}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Requirements */}
                            <div>
                              <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <FiUsers className="w-4 h-4 text-blue-400" />
                                Requirements
                              </h4>
                              <ul className="space-y-1">
                                {opp.requirements.map((req, idx) => (
                                  <li
                                    key={idx}
                                    className="text-sm text-gray-300 flex items-start gap-2"
                                  >
                                    <div className="w-1.5 h-1.5 bg-gray-500 mt-1.5 flex-shrink-0" />
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* CTA Button */}
                    <button
                      className={`w-full py-3 bg-gradient-to-r ${opp.accentColor} font-semibold hover:scale-105 hover:shadow-lg transition-all inline-flex items-center justify-center gap-2 group`}
                    >
                      {opp.cta}
                      <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture Section */}
      <section className="relative py-20 px-4 z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/10 via-pink-900/10 to-purple-900/10" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-pink-500/10 backdrop-blur-md mb-4 border border-white/10">
              <HiOutlineSparkles className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-semibold text-orange-400">
                Our Culture
              </span>
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why You'll Love Working Here
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              We're more than just a workplace—we're a community that celebrates
              diversity, creativity, and growth.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all text-center group"
              >
                <div className="inline-flex p-3 bg-gradient-to-br from-orange-500/20 to-pink-500/20 mb-4 group-hover:scale-110 transition-transform">
                  {React.cloneElement(value.icon, {
                    className: "w-6 h-6 text-orange-400",
                  })}
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-gray-700/50">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Benefits That Matter
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex-shrink-0">
                    {React.cloneElement(benefit.icon, {
                      className: "w-5 h-5 text-purple-400",
                    })}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{benefit.title}</h4>
                    <p className="text-sm text-gray-400">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Employee Testimonials */}
      <section className="relative py-20 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-md mb-4 border border-white/10">
              <FiHeart className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-green-400">
                Team Stories
              </span>
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Hear From Our Team
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "Working here feels like being part of a family. The support and growth opportunities are incredible!",
                author: "Sarah M.",
                role: "Kitchen Lead",
                rating: 5,
              },
              {
                quote:
                  "I love how my creativity is valued. Every day brings new challenges and opportunities to innovate.",
                author: "Marcus J.",
                role: "Brand Ambassador",
                rating: 5,
              },
              {
                quote:
                  "The flexible hours and positive environment make this the best job I've ever had.",
                author: "Elena R.",
                role: "Production Staff",
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl p-6 border border-gray-700/50"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
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

      {/* Location Section */}
      <section className="relative py-20 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-gray-700/50">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <FiMapPin className="w-8 h-8 text-orange-400" />
                  Work in Paradise
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Our state-of-the-art facility is located in the heart of the
                  Caribbean, where the sun shines bright and the culture is
                  vibrant. Experience the perfect work-life balance in a
                  tropical paradise.
                </p>
                <ul className="space-y-3">
                  {[
                    "Modern, fully-equipped commercial kitchen",
                    "Beautiful break areas with ocean views",
                    "Easy access to public transportation",
                    "Free parking for all employees",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <FiCheck className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-96 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-purple-500/20 z-10" />
                <Image
                  src="https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/contact/careers/SunnyIslandCareers.webp"
                  alt="Sunny Island Facility"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="relative py-20 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-md mb-4 border border-white/10">
              <IoMdRocket className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-semibold text-indigo-400">
                Simple Process
              </span>
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Start Your Journey in 3 Steps
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Apply Online",
                description:
                  "Submit your application through our easy online form. Tell us about yourself and why you want to join our team.",
                icon: <FiBriefcase className="w-6 h-6" />,
                color: "from-orange-500 to-red-500",
              },
              {
                step: "02",
                title: "Meet the Team",
                description:
                  "We'll invite you for a casual chat to get to know you better. This is your chance to ask questions too!",
                icon: <FiUsers className="w-6 h-6" />,
                color: "from-pink-500 to-purple-500",
              },
              {
                step: "03",
                title: "Start Growing",
                description:
                  "Once you're on board, we'll provide comprehensive training and support to help you succeed.",
                icon: <FiTrendingUp className="w-6 h-6" />,
                color: "from-teal-500 to-blue-500",
              },
            ].map((process, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="relative"
              >
                {/* Connection Line */}
                {idx < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-gray-700 to-transparent" />
                )}

                <div className="text-center">
                  {/* Step Number */}
                  <div className="relative inline-flex">
                    <div
                      className={`w-24 h-24 bg-gradient-to-br ${process.color} p-[2px]`}
                    >
                      <div className="w-full h-full bg-black flex items-center justify-center">
                        <span className="text-3xl font-bold">
                          {process.step}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`absolute -bottom-2 -right-2 p-2 bg-gradient-to-br ${process.color}`}
                    >
                      {process.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mt-6 mb-3">
                    {process.title}
                  </h3>
                  <p className="text-gray-400">{process.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 px-4 z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "Do I need prior experience?",
                answer:
                  "Not always! We value passion and willingness to learn. Some positions require specific skills, but we provide training for all roles.",
              },
              {
                question: "What are the working hours?",
                answer:
                  "We offer flexible scheduling to accommodate different lifestyles. Full-time, part-time, and seasonal positions are available.",
              },
              {
                question: "Is there room for advancement?",
                answer:
                  "Absolutely! We promote from within and provide clear career paths. Many of our leaders started in entry-level positions.",
              },
              {
                question: "What's the company culture like?",
                answer:
                  "We're a tight-knit family that celebrates diversity, creativity, and hard work. Expect a fun, supportive environment where your ideas matter.",
              },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl p-6 border border-gray-700/50"
              >
                <h4 className="font-semibold text-lg mb-2">{faq.question}</h4>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 px-4 z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 blur-3xl" />

            <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-gray-700/50 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm mb-8"
              >
                <HiOutlineSparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-semibold">Ready to Join?</span>
                <HiOutlineSparkles className="w-5 h-5 text-yellow-400" />
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Spice Up Your Career
              </h2>

              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Don't wait for the perfect moment—create it! Join our passionate
                team and help us spread the Caribbean spirit around the world.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 font-semibold hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 transition-all inline-flex items-center gap-2 group">
                  Apply Now
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 font-semibold hover:bg-white/20 transition-all">
                  Contact HR Team
                </button>
              </div>

              {/* Contact Info */}
              <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-center gap-8">
                <a
                  href="mailto:careers@sunnyisland.com"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <RiRestaurantLine className="w-5 h-5" />
                  careers@sunnyisland.com
                </a>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FiHeart className="w-5 h-5" />
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-gray-800 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="font-semibold mb-4">About Sunny Island</h3>
              <p className="text-sm text-gray-400">
                We're more than just a pepper sauce company—we're a family
                dedicated to spreading Caribbean warmth and supporting our
                community.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Career Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Employee Handbook
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Benefits Overview
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Training Programs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Equal Opportunity
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-semibold mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="p-2 bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <FiHeart className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <FiUsers className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <FiGlobe className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Sunny Island Pepper Sauce. All rights
              reserved.
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Made with 🌶️ and ❤️ in the Caribbean | Equal Opportunity Employer
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
