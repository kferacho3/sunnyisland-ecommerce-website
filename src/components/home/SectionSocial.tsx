"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi";

export default function SectionSocial() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const controls = useAnimation();

  const socialPlatforms = [
    {
      name: "Facebook",
      icon: FaFacebookF,
      url: "https://www.facebook.com/SunnyIslandPepper",
      image:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/social/SunnyIslandFacebook.webp",
      gradient: "from-[#006fff] to-[#00acff]",
      shadowColor: "rgba(0,111,255,0.5)",
      textColor: "text-white",
      bgColor: "bg-gradient-to-br",
      stats: "15K followers",
    },
    {
      name: "TikTok",
      icon: FaTiktok,
      url: "https://www.tiktok.com/@SunnyIslandPepper",
      image:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/social/SunnyIslandTikTok.webp",
      gradient: "from-black to-gray-800",
      shadowColor: "rgba(0,0,0,0.3)",
      textColor: "text-white",
      bgColor: "bg-gradient-to-br",
      stats: "50K followers",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      url: "https://www.instagram.com/SunnyIslandPepper",
      image:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/social/SunnyIslandInstagram.webp",
      gradient: "from-purple-600 via-pink-600 to-orange-500",
      shadowColor: "rgba(255,16,39,0.5)",
      textColor: "text-white",
      bgColor: "bg-gradient-to-br",
      stats: "25K followers",
    },
    {
      name: "X",
      icon: FaXTwitter,
      url: "https://x.com/SunnyIslandPepper",
      image:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/social/SunnyIslandX.webp",
      gradient: "from-gray-900 to-black",
      shadowColor: "rgba(0,0,0,0.5)",
      textColor: "text-white",
      bgColor: "bg-gradient-to-br",
      stats: "10K followers",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      url: "https://www.youtube.com/SunnyIslandPepper",
      image:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/social/SunnyIslandYoutube.webp",
      gradient: "from-red-600 to-red-700",
      shadowColor: "rgba(255,16,39,0.5)",
      textColor: "text-white",
      bgColor: "bg-gradient-to-br",
      stats: "30K subscribers",
    },
  ];

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    });
  }, [controls]);

  return (
    <section
      id="section-social"
      className="relative min-h-screen py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* Premium gradient background matching explore section */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />

      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 40% 20%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                [
                  "rgba(59, 130, 246, 0.1)",
                  "rgba(236, 72, 153, 0.1)",
                  "rgba(34, 197, 94, 0.1)",
                ][i % 3]
              } 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <HiSparkles className="text-4xl text-yellow-500" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            Sunny Social Island
          </h2>

          {/* Logo with glow effect */}
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full" />
              <Image
                src="/SunnyIslandSymbol.png"
                alt="Sunny Island Symbol"
                width={80}
                height={80}
                className="relative z-10"
              />
            </div>
          </motion.div>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Join our spicy community and share your Sunny Island moments!
          </p>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Tag us @SunnyIslandPepper
          </p>
        </motion.div>

        {/* Social Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {socialPlatforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
                onMouseEnter={() => setHoveredCard(platform.name)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <motion.div
                  className={`relative overflow-hidden rounded-2xl ${platform.bgColor} ${platform.gradient} p-1 h-full`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    boxShadow:
                      hoveredCard === platform.name
                        ? `0 20px 40px -10px ${platform.shadowColor}`
                        : `0 10px 25px -10px ${platform.shadowColor}`,
                  }}
                >
                  <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl p-4 h-full flex flex-col">
                    {/* Platform Icon */}
                    <div className="absolute top-3 right-3 z-20">
                      <motion.div
                        animate={
                          hoveredCard === platform.name
                            ? { rotate: 360 }
                            : { rotate: 0 }
                        }
                        transition={{ duration: 0.5 }}
                        className={`p-2 rounded-lg bg-white/10 backdrop-blur-sm ${platform.textColor}`}
                      >
                        <platform.icon size={20} />
                      </motion.div>
                    </div>

                    {/* Image Container */}
                    <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                      <motion.div
                        className="absolute inset-0"
                        animate={
                          hoveredCard === platform.name
                            ? { scale: 1.1 }
                            : { scale: 1 }
                        }
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={platform.image}
                          alt={platform.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                        />
                      </motion.div>

                      {/* Hover Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-4"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: hoveredCard === platform.name ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-white text-sm font-medium">
                          {platform.stats}
                        </span>
                      </motion.div>
                    </div>

                    {/* Platform Name */}
                    <div className="mt-auto">
                      <div
                        className={`flex items-center justify-between ${platform.textColor}`}
                      >
                        <span className="font-bold text-lg">
                          {platform.name}
                        </span>
                        <motion.span
                          className="text-sm opacity-70"
                          animate={{ x: hoveredCard === platform.name ? 5 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          →
                        </motion.span>
                      </div>
                    </div>

                    {/* Animated border glow */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl ${platform.bgColor} ${platform.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      style={{ padding: "2px", margin: "-1px" }}
                    />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/5 backdrop-blur-sm px-8 py-6 rounded-2xl border border-white/10">
            <div className="text-left">
              <h3 className="text-xl font-bold text-white mb-1">
                Stay Connected
              </h3>
              <p className="text-sm text-gray-400">
                Follow us for exclusive content, recipes, and spicy updates!
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all"
            >
              Follow All
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
