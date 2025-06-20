"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { FaTiktok, FaXTwitter } from "react-icons/fa6";
import {
  FiCheck,
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiYoutube,
} from "react-icons/fi";
import { GiChiliPepper } from "react-icons/gi";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubscribed(true);
    setIsLoading(false);
    setEmail("");

    // Reset after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const footerLinks = {
    shop: [
      {
        href: "https://sunnyislandpepper.myshopify.com/",
        label: "All Products",
      },
      { href: "/shop", label: "Sauce Guide" },
      { href: "/explore/scoville", label: "Heat Levels" },
      {
        href: "https://sunnyislandpepper.myshopify.com/products/sunny-island-pepper-sauce-classic-gold",
        label: "Best Sellers",
      },
    ],
    explore: [
      { href: "/explore/about", label: "Our Story" },
      { href: "/explore/blog", label: "Blog & News" },
      { href: "/explore/events", label: "Events" },
      { href: "/explore/recipes", label: "Recipes" },
      { href: "/explore/locations", label: "Find Us" },
    ],
    support: [
      { href: "/contact/inquiries", label: "Contact Us" },
      { href: "/contact/FAQs", label: "FAQs" },
      { href: "/contact/careers", label: "Careers" },
      { href: "/contact/supportUs", label: "Partners" },
    ],
    legal: [
      { href: "/legal/privacy", label: "Privacy Policy" },
      { href: "/legal/terms", label: "Terms of Service" },
      { href: "/legal/accessibility", label: "Accessibility" },
      { href: "/legal/cookies", label: "Cookie Policy" },
    ],
  };

  const socialLinks = [
    {
      icon: FiInstagram,
      href: "https://www.instagram.com/sunnyislandpepper/",
      label: "Instagram",
    },
    {
      icon: FaXTwitter,
      href: "https://www.x.com/sunnyislandpepper/",
      label: "X (Twitter)",
    },
    {
      icon: FiFacebook,
      href: "https://www.facebook.com/sunnyislandpepper/",
      label: "Facebook",
    },
    {
      icon: FaTiktok,
      href: "https://www.tiktok.com/sunnyislandpepper/",
      label: "TikTok",
    },
    {
      icon: FiYoutube,
      href: "https://www.youtube.com/sunnyislandpepper/",
      label: "YouTube",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6B6B' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-gray-700/50">
          <div className="container mx-auto px-4 py-8 sm:py-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Join the Spice Revolution
                </h3>
                <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
                  Get exclusive offers, new product announcements, and spicy
                  recipes delivered to your inbox.
                </p>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <div className="relative flex-1">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-12 pr-4 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 transition-colors text-sm sm:text-base"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isLoading || isSubscribed}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {isSubscribed ? (
                    <>
                      <FiCheck className="text-lg" />
                      Subscribed!
                    </>
                  ) : isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <GiChiliPepper className="text-lg" />
                    </motion.div>
                  ) : (
                    <>
                      Subscribe
                      <FiSend className="text-lg" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="container mx-auto px-4 py-10 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-12">
            {/* Brand Column - Full width on mobile */}
            <div className="col-span-2 lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="/SunnyIslandLogo.png"
                  alt="Sunny Island"
                  className="w-40 sm:w-48 h-auto mb-4"
                />
                <p className="text-gray-400 mb-4 max-w-xs text-sm">
                  Bringing the authentic taste of Caribbean sunshine to your
                  table since 1994.
                </p>

                {/* Social Links */}
                <div className="flex gap-2 sm:gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ y: -3 }}
                      className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 rounded-lg flex items-center justify-center transition-all group"
                      aria-label={social.label}
                    >
                      <social.icon className="text-base sm:text-lg group-hover:text-white transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Shop Links */}
            <div className="col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h4 className="font-bold text-base sm:text-lg mb-3 text-orange-400">
                  Shop
                </h4>
                <ul className="space-y-2">
                  {footerLinks.shop.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors relative group text-sm"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Explore Links */}
            <div className="col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="font-bold text-base sm:text-lg mb-3 text-orange-400">
                  Explore
                </h4>
                <ul className="space-y-2">
                  {footerLinks.explore.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors relative group text-sm"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Support Links */}
            <div className="col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h4 className="font-bold text-base sm:text-lg mb-3 text-orange-400">
                  Support
                </h4>
                <ul className="space-y-2">
                  {footerLinks.support.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors relative group text-sm"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Contact Info */}
            <div className="col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h4 className="font-bold text-base sm:text-lg mb-3 text-orange-400">
                  Contact
                </h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start gap-2">
                    <FiMapPin className="text-orange-500 mt-0.5 flex-shrink-0 text-sm" />
                    <span className="text-xs sm:text-sm">
                      123 Pepper Lane
                      <br />
                      Sunny Island, Caribbean
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiPhone className="text-orange-500 flex-shrink-0 text-sm" />
                    <a
                      href="tel:+1234567890"
                      className="hover:text-white transition-colors text-xs sm:text-sm"
                    >
                      +1 (234) 567-890
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiMail className="text-orange-500 flex-shrink-0 text-sm" />
                    <a
                      href="mailto:info@sunnyisland.com"
                      className="hover:text-white transition-colors text-xs sm:text-sm break-all"
                    >
                      hello@sunnyisland.com
                    </a>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-4 sm:py-5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-xs sm:text-sm text-gray-400"
              >
                © {new Date().getFullYear()} Sunny Island®. All rights
                reserved.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm"
              >
                {footerLinks.legal.map((link, index) => (
                  <React.Fragment key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                    {index < footerLinks.legal.length - 1 && (
                      <span className="text-gray-600 hidden sm:inline">•</span>
                    )}
                  </React.Fragment>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(251, 146, 60, 0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -top-32 -right-32 w-64 h-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* Floating pepper icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-orange-400/5"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: typeof window !== "undefined" ? window.innerHeight : 800,
            }}
            animate={{
              y: -100,
              rotate: 360,
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 7,
              ease: "linear",
            }}
          >
            <GiChiliPepper className="text-6xl" />
          </motion.div>
        ))}
      </div>

      {/* Premium styles */}
      <style jsx global>{`
        /* Footer link hover effects */
        footer a {
          position: relative;
          transition: all 0.3s ease;
        }

        /* Smooth scroll for anchor links */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar for footer */
        footer::-webkit-scrollbar {
          width: 8px;
        }

        footer::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }

        footer::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f97316, #ef4444);
          border-radius: 4px;
        }

        /* Input focus styles */
        footer input:focus {
          box-shadow: 0 0 0 2px rgba(251, 146, 60, 0.2);
        }

        /* Button hover effect */
        footer button {
          position: relative;
          overflow: hidden;
        }

        footer button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.5s;
        }

        footer button:hover::before {
          left: 100%;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          footer {
            padding-bottom: env(safe-area-inset-bottom);
          }
        }

        /* Dark mode enhancements */
        @media (prefers-color-scheme: dark) {
          footer {
            background: linear-gradient(to bottom, #111827, #000000);
          }
        }

        /* Performance optimizations */
        .footer-link {
          transform: translateZ(0);
          will-change: transform;
          backface-visibility: hidden;
        }

        /* Accessibility improvements */
        footer a:focus-visible {
          outline: 2px solid #f97316;
          outline-offset: 2px;
          border-radius: 4px;
        }

        /* Newsletter input animations */
        @keyframes pulse-border {
          0% {
            box-shadow: 0 0 0 0 rgba(251, 146, 60, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(251, 146, 60, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(251, 146, 60, 0);
          }
        }

        footer input:focus {
          animation: pulse-border 1.5s ease-out;
        }
      `}</style>
    </footer>
  );
}
