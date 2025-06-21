"use client";

import faqData from "@/data/faqData";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  FiBook,
  FiCheck,
  FiChevronDown,
  FiHelpCircle,
  FiMail,
  FiMessageCircle,
  FiSearch,
} from "react-icons/fi";
import { GiChiliPepper } from "react-icons/gi";

type FAQSection = {
  header: string;
  questions: {
    question: string;
    answer: string;
  }[];
};

export default function FAQPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const toggleAccordion = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  // Filter FAQs based on search query
  const filteredFAQs = useMemo(() => {
    return faqData
      .map((section) => ({
        ...section,
        questions: section.questions.filter(
          (q) =>
            q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      }))
      .filter(
        (section) =>
          selectedCategory === "all" ||
          section.header.toLowerCase() === selectedCategory.toLowerCase(),
      )
      .filter((section) => section.questions.length > 0);
  }, [searchQuery, selectedCategory]);

  // Get unique categories
  const categories = [
    "all",
    ...faqData.map((section) => section.header.toLowerCase()),
  ];

  // Popular questions (you can customize these based on actual data)
  const popularQuestions = [
    "How hot is the pepper sauce?",
    "Where can I buy Sunny Island products?",
    "Do you ship internationally?",
    "What are the ingredients?",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-40 right-20 text-orange-400/5"
        >
          <GiChiliPepper className="text-[400px]" />
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mb-6"
          >
            <FiHelpCircle className="text-white text-3xl" />
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            How Can We Help?
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            Find answers to common questions about our products, ordering, and
            more
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full shadow-lg focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-lg"
              />
              {searchQuery && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setSearchQuery("")}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </motion.button>
              )}
            </div>

            {/* Popular Searches */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex flex-wrap gap-2 justify-center"
            >
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Popular:
              </span>
              {popularQuestions.slice(0, 3).map((question, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(question)}
                  className="text-sm px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
                >
                  {question}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide py-4 gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all
                  ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }
                `}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        {filteredFAQs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <FiSearch className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No results found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Try adjusting your search or browse all categories
            </p>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {filteredFAQs.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Section Header */}
                <div className="px-8 py-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 dark:from-orange-500/20 dark:to-red-500/20">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    {section.header === "General" && (
                      <FiBook className="text-orange-500" />
                    )}
                    {section.header === "Product" && (
                      <GiChiliPepper className="text-red-500" />
                    )}
                    {section.header === "Orders" && (
                      <FiMessageCircle className="text-blue-500" />
                    )}
                    {section.header}
                  </h2>
                </div>

                {/* Questions */}
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {section.questions.map((questionObj, questionIndex) => {
                    const itemId = `faq-${sectionIndex}-${questionIndex}`;
                    const isOpen = expanded === itemId;

                    return (
                      <motion.div
                        key={itemId}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: questionIndex * 0.05 }}
                      >
                        <button
                          onClick={() => toggleAccordion(itemId)}
                          aria-expanded={isOpen}
                          className={`
                            w-full px-8 py-6 text-left flex items-start justify-between 
                            hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300
                            ${isOpen ? "bg-gray-50 dark:bg-gray-700/50" : ""}
                          `}
                        >
                          <div className="flex-1 pr-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {questionObj.question}
                            </h3>
                            {isOpen && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3"
                              >
                                {questionObj.answer}
                              </motion.p>
                            )}
                          </div>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className={`
                              flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                              ${
                                isOpen
                                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                                  : "bg-gray-100 dark:bg-gray-700 text-gray-500"
                              }
                            `}
                          >
                            <FiChevronDown className="text-lg" />
                          </motion.div>
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Our team is here to help with any questions you might have
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <motion.a
              href="/contact/inquiries"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <FiMail className="text-3xl text-orange-500 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Send us a Message
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get a response within 24-48 hours
              </p>
            </motion.a>

            <motion.a
              href="/contact/inquiries"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-white"
            >
              <FiMessageCircle className="text-3xl mb-3" />
              <h3 className="font-semibold mb-2">Live Chat Support</h3>
              <p className="text-sm opacity-90">
                Available Mon-Fri, 9am-5pm EST
              </p>
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Helpful Resources */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Helpful Resources
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <FiBook className="text-2xl" />,
                title: "Product Guide",
                description: "Learn about our entire product line",
                link: "/explore/products",
                color: "text-purple-600 dark:text-purple-400",
              },
              {
                icon: <GiChiliPepper className="text-2xl" />,
                title: "Recipe Ideas",
                description: "Discover ways to use our sauces",
                link: "/explore/recipes",
                color: "text-red-600 dark:text-red-400",
              },
              {
                icon: <FiCheck className="text-2xl" />,
                title: "Quality Promise",
                description: "Our commitment to excellence",
                link: "/explore/about",
                color: "text-green-600 dark:text-green-400",
              },
            ].map((resource, index) => (
              <motion.a
                key={index}
                href={resource.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className={`${resource.color} mb-4`}>{resource.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {resource.description}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {expanded && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-30"
          >
            <FiChevronDown className="rotate-180 text-xl" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Custom Styles */}
      <style jsx global>{`
        /* Hide scrollbar for category tabs */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Custom focus styles */
        button:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(251, 146, 60, 0.3);
        }

        /* Highlight search results */
        mark {
          background-color: #fed7aa;
          color: inherit;
          padding: 0.1em 0.2em;
          border-radius: 0.2em;
        }

        /* Dark mode mark */
        @media (prefers-color-scheme: dark) {
          mark {
            background-color: #ea580c;
            color: white;
          }
        }

        /* Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Premium selection color */
        ::selection {
          background-color: #fb923c;
          color: white;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .text-6xl {
            font-size: 3rem;
          }
        }

        /* Performance optimizations */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}
