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
  // For mobile, navbar height is h-16 so top is 16 (px equivalent); for md and above, top is 20.
  return (
    <AnimatePresence>
      {!hide && (
        <motion.header
          className="fixed top-16 md:top-20 w-full bg-red-600 text-white dark:bg-red-700 z-40"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 1 }}
        >
          <div className="container mx-auto px-4 py-1 md:py-2 text-center">
            <p className="text-xs md:text-sm">
              Enjoy our Caribbean Pepper Sauce! Free shipping on orders over
              $100.
            </p>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
