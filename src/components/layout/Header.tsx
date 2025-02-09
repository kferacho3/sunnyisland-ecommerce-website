"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Header() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hide header as soon as scrollY > 0; show when at top.
      setHide(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Header is fixed immediately below the navbar.
  // For example, if the navbar's height is 64px, we use top-16 (64px).
  // The header's background is red.
  return (
    <AnimatePresence>
      {!hide && (
        <motion.header
          className="fixed top-20 w-full bg-red-600 text-white dark:bg-red-700 z-40"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-2 text-center">
            <p className="text-sm">
              Enjoy our Caribbean Pepper Sauce! Free shipping on orders over $100.
            </p>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
