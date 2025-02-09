"use client";

import faqData from "@/data/faqData";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

type FAQSection = {
  header: string;
  questions: {
    question: string;
    answer: string;
  }[];
};

export default function FAQPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <main className="min-h-screen w-full bg-white dark:bg-black dark:text-white p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h1>

        {faqData.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-12">
            {/* Section Header */}
            <h2 className="text-xl sm:text-2xl font-semibold text-secondary mb-4 uppercase">
              {section.header}
            </h2>

            {/* Questions */}
            {section.questions.map((questionObj, questionIndex) => {
              const itemId = `faq-${sectionIndex}-${questionIndex}`;
              const isOpen = expanded === itemId;

              return (
                <div
                  key={itemId}
                  className="border-b border-gray-300 dark:border-gray-600 py-3"
                >
                  {/* Accordion Button */}
                  <button
                    onClick={() => toggleAccordion(itemId)}
                    aria-expanded={isOpen}
                    className="w-full text-left flex justify-between items-center focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-medium dark:text-white">
                      {questionObj.question}
                    </span>
                    <span className="ml-2 text-secondary">
                      {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                          <p>{questionObj.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </main>
  );
}
