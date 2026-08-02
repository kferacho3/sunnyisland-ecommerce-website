// src/components/layout/StickyCookieConsent.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiInfo, FiX } from "react-icons/fi";

/**
 * A simple cookie consent button that expands into
 * a panel describing cookie usage and a preference center.
 *
 * For real use, integrate the official OneTrust scripts or library.
 */
export default function StickyCookieConsent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setOpen(true)}
          className="bg-secondary text-black px-3 py-2 shadow hover:opacity-80 transition"
        >
          <FiInfo size={20} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="cookie-consent-panel"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-16 left-4 w-[350px] bg-white dark:bg-gray-800 text-black dark:text-white p-4 shadow-lg z-50"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-bold">Cookie Notices & Consent</h2>
              <button onClick={() => setOpen(false)}>
                <FiX />
              </button>
            </div>

            {/* Scrolling content */}
            <div className="h-40 overflow-y-auto text-xs">
              <p className="mb-2">
                Cookies are integral to the way modern websites work. Most
                personalisation and social media integration relies on
                cookies...
              </p>
              <p className="mb-2">
                <strong>Privacy Preference Center</strong> – you can choose not
                to allow some types of cookies. Blocking some types may impact
                your experience.
              </p>

              <p className="mb-2 font-bold">Manage Consent Preferences</p>
              <ul className="list-disc ml-4 mb-2">
                <li>Strictly Necessary Cookies (Always Active)</li>
                <li>Performance Cookies</li>
                <li>Functional Cookies</li>
                <li>Targeting Cookies</li>
                <li>Social Media Cookies</li>
              </ul>

              <p className="text-center mt-2">
                <button className="bg-gray-300 dark:bg-gray-700 px-2 py-1 text-xs mr-2">
                  Reject All
                </button>
                <button className="bg-secondary text-black px-2 py-1 text-xs">
                  Confirm My Choices
                </button>
              </p>

              <p className="text-right mt-2 text-[10px]">Powered by OneTrust</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
