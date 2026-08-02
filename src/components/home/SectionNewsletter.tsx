// src/components/home/SectionNewsletter.tsx
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { FiCheck, FiMail, FiSend, FiUser } from "react-icons/fi";
import { GiChiliPepper, GiCook } from "react-icons/gi";
import { IoIosStopwatch } from "react-icons/io";

import { IoGift } from "react-icons/io5";

import { HiSparkles } from "react-icons/hi";
export default function SectionNewsletter() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ firstName: "", lastName: "", email: "" });
    }, 3000);
  };

  return (
    <section
      id="section-newsletter"
      className="relative min-h-[600px] p-8 sm:p-12 lg:p-16 overflow-hidden"
    >
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-orange-50 dark:from-black dark:via-gray-900 dark:to-gray-800" />

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6B6B' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating peppers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-orange-400/20 dark:text-orange-600/20"
            initial={{
              x: Math.random() * viewport.width,
              y: -50,
              rotate: 0,
            }}
            animate={{
              y: viewport.height + 50,
              rotate: 360,
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear",
            }}
          >
            <GiChiliPepper className="text-4xl" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header with animations */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <HiSparkles className="text-4xl text-yellow-500" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent">
            STAY IN THE LOOP!
          </h2>

          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Join our spice-loving community and be the first to taste what's
            hot, receive exclusive offers, and get insider access to new flavors
          </p>
        </motion.div>
        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
        >
          {[
            {
              icon: <IoGift className="mx-auto text-5xl text-orange-500" />,
              title: "Exclusive Offers",
              desc: "Special discounts for subscribers",
            },
            {
              icon: (
                <IoIosStopwatch className="mx-auto text-5xl text-blue-500" />
              ),
              title: "Early Access",
              desc: "New products before anyone else",
            },
            {
              icon: <GiCook className="mx-auto text-5xl text-green-500" />,
              title: "Recipe Ideas",
              desc: "Creative ways to use our sauces",
            },
          ].map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="mb-3">{benefit.icon}</div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-3xl blur-xl opacity-20" />

          <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8 sm:p-10 lg:p-12">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubscribe}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* First Name */}
                    <motion.div
                      whileTap={{ scale: 0.995 }}
                      className="relative"
                    >
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        First Name
                      </label>
                      <div className="relative">
                        <FiUser
                          className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg transition-colors ${
                            focusedField === "firstName"
                              ? "text-orange-500"
                              : "text-gray-400"
                          }`}
                        />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField("firstName")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:outline-none transition-all duration-300 text-gray-900 dark:text-white"
                          placeholder="John"
                        />
                      </div>
                    </motion.div>

                    {/* Last Name */}
                    <motion.div
                      whileTap={{ scale: 0.995 }}
                      className="relative"
                    >
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Last Name
                      </label>
                      <div className="relative">
                        <FiUser
                          className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg transition-colors ${
                            focusedField === "lastName"
                              ? "text-orange-500"
                              : "text-gray-400"
                          }`}
                        />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField("lastName")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:outline-none transition-all duration-300 text-gray-900 dark:text-white"
                          placeholder="Doe"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Email */}
                  <motion.div whileTap={{ scale: 0.995 }} className="relative">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <FiMail
                        className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg transition-colors ${
                          focusedField === "email"
                            ? "text-orange-500"
                            : "text-gray-400"
                        }`}
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:outline-none transition-all duration-300 text-gray-900 dark:text-white"
                        placeholder="john@example.com"
                      />
                    </div>
                  </motion.div>

                  {/* Privacy Policy */}
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    By subscribing, you agree to receive marketing emails from
                    Sunny Island. You can unsubscribe anytime. View our
                    <Link
                      href="/legal/privacy"
                      className="text-orange-600 dark:text-orange-400 hover:underline ml-1 font-medium"
                    >
                      Privacy Policy
                    </Link>
                  </p>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      relative w-full sm:w-auto px-12 py-4 
                      bg-gradient-to-r from-orange-500 to-red-500 
                      hover:from-orange-600 hover:to-red-600 
                      text-white font-bold text-lg 
                      shadow-xl hover:shadow-2xl 
                      transition-all duration-300 
                      disabled:opacity-50 disabled:cursor-not-allowed
                      overflow-hidden group
                    `}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <FiSend className="text-xl" />
                          </motion.div>
                          Subscribing...
                        </>
                      ) : (
                        <>
                          Join the Spice Squad
                          <FiSend className="text-xl group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 mb-6"
                  >
                    <FiCheck className="text-4xl text-green-600 dark:text-green-400" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Welcome to the Squad!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Check your email for a spicy welcome gift 🎁
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-6 py-4 shadow-lg">
            <div className="flex -space-x-3">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-400 border-2 border-white dark:border-gray-800 flex items-center justify-center text-white font-bold text-sm"
                >
                  {["JD", "AS", "MK", "RT"][i]}
                </motion.div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Join 10,000+ spice lovers
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Getting exclusive deals weekly
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none" />

      {/* Animated glow effects */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-400/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-400/10 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Premium CSS */}
      <style jsx global>{`
        /* Input field animations */
        input:focus {
          transform: translateY(-1px);
          box-shadow: 0 10px 25px -5px rgba(251, 146, 60, 0.1);
        }

        /* Button shine effect */
        @keyframes shine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }

        .shine-effect::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transform: rotate(45deg);
          transition: all 0.5s;
        }

        .shine-effect:hover::after {
          animation: shine 0.5s ease-in-out;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom focus styles */
        input:focus-visible {
          outline: 2px solid transparent;
          outline-offset: 2px;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          input {
            font-size: 16px; /* Prevents zoom on iOS */
          }
        }

        /* Dark mode enhancements */
        @media (prefers-color-scheme: dark) {
          .gradient-text {
            filter: brightness(1.2);
          }
        }
      `}</style>
    </section>
  );
}
