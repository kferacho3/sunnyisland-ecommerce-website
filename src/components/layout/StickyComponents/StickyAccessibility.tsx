// src/components/layout/StickyComponents/StickyAccessibility.tsx

"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { FiUserCheck, FiX } from "react-icons/fi";

/**
 * Basic accessibility toggles:
 * - "Color Blind Mode" (placeholder)
 * - "No Animations" (disables or reduces motion)
 * - "Night/Day Mode" (ThemeContext usage)
 * - "Captions / Transcripts" (placeholder)
 */
export default function StickyAccessibility() {
  const [open, setOpen] = useState(false);

  // For advanced usage: you might handle colorBlindMode or noAnimations globally
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [noAnimations, setNoAnimations] = useState(false);

  const backdropRef = useRef<HTMLDivElement>(null);

  const handleColorBlindToggle = () => {
    setColorBlindMode(!colorBlindMode);
  };

  const handleNoAnimationToggle = () => {
    setNoAnimations(!noAnimations);
  };

  // Click outside the modal container to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Floating button at bottom-right (2.5% from right, 5% from bottom) */}
      <div
        className="fixed"
        style={{ bottom: "5%", right: "2.5%", zIndex: 50 }}
      >
        <button
          onClick={() => setOpen(true)}
          className="bg-secondary text-black px-3 py-2 shadow hover:opacity-80 transition"
        >
          <FiUserCheck size={20} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="accessibility-backdrop"
            ref={backdropRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={handleBackdropClick}
          >
            {/* Centered modal container */}
            <motion.div
              key="accessibility-panel"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-80 max-w-[90%] bg-white dark:bg-gray-800 text-black dark:text-white p-4 shadow-lg relative"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-bold">Accessibility Options</h2>
                <button onClick={() => setOpen(false)}>
                  <FiX />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Color Blind Mode</span>
                  <input
                    type="checkbox"
                    checked={colorBlindMode}
                    onChange={handleColorBlindToggle}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>No Animations</span>
                  <input
                    type="checkbox"
                    checked={noAnimations}
                    onChange={handleNoAnimationToggle}
                  />
                </div>
              </div>

              <hr className="my-3" />

              {/* reCAPTCHA disclaimers */}
              <p className="text-xs">
                <strong>Protected by reCAPTCHA Enterprise.</strong> The Google{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-secondary"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-secondary"
                >
                  Terms of Service
                </a>{" "}
                apply.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
