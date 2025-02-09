"use client";

import { Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { useEffect } from "react";

interface PreloaderProps {
  onLoaded: () => void;
}

export default function Preloader({ onLoaded }: PreloaderProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoaded();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onLoaded]);

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>

      <Html center as="div">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backgroundVariants}
          transition={{ duration: 0.05 }}
          className="fixed inset-0 bg-black z-[9999] flex justify-center items-center"
        >
          <div className="w-[295px] h-[295px] flex justify-center items-center">
            <motion.img
              src="/media/SunnyIslandSymbol.png"
              alt="Sunny Island Symbol"
              className="w-[100px] h-[100px] animate-pulse"
            />
          </div>
        </motion.div>
      </Html>
    </>
  );
}
