"use client";

import { Html, useProgress } from "@react-three/drei";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface PreloaderProps {
  onLoaded: () => void;
}

export default function Preloader({ onLoaded }: PreloaderProps) {
  // Track loading progress (this hook must be rendered inside a Canvas)
  const { progress, loaded, total, active } = useProgress();
  const [animateOut, setAnimateOut] = useState(false);

  // When loading reaches 100%, trigger exit animation after a small delay
  useEffect(() => {
    if (!active && total > 0 && loaded === total) {
      const timer = setTimeout(() => {
        setAnimateOut(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [active, loaded, total]);

  // Variants for the overall preloader container (slide down off-screen)
  const containerVariants = {
    visible: { y: 0 },
    exit: { y: "100vh", transition: { duration: 1, ease: "easeInOut" } },
  };

  // Variants for the image animation: continuous spin, bounce, and slight scale change
  const imageVariants = {
    initial: { rotate: 0, y: 0, scale: 1 },
    animate: {
      rotate: [0, 360],
      y: [0, -30, 0, 30, 0],
      scale: [1, 1.1, 1],
      transition: { duration: 2, ease: "easeInOut", repeat: Infinity },
    },
  };

  // Variants for the progress bar inner element
  const progressBarVariants = {
    initial: { width: "0%" },
    animate: {
      width: `${progress}%`,
      transition: { ease: "linear", duration: 0.1 },
    },
  };

  return (
    <Html center as="div">
      <motion.div
        initial="visible"
        animate={animateOut ? "exit" : "visible"}
        variants={containerVariants}
        onAnimationComplete={() => {
          if (animateOut) onLoaded();
        }}
        className="fixed inset-0 bg-black z-[9999] flex flex-col justify-center items-center overflow-hidden"
      >
        <div className="w-full h-full flex flex-col justify-center items-center">
          <motion.img
            src="/media/SunnyIslandSymbol.png"
            alt="Sunny Island Symbol"
            className="w-full h-full max-w-[300px] max-h-[300px] object-contain"
            variants={imageVariants}
            initial="initial"
            animate="animate"
          />
          <div className="text-white mt-4 text-lg font-medium">
            {progress.toFixed(0)}% loaded
          </div>
          <div className="w-[80%] h-2 bg-gray-800 mt-4">
            <motion.div
              className="h-full bg-white"
              variants={progressBarVariants}
              initial="initial"
              animate="animate"
            />
          </div>
        </div>
      </motion.div>
    </Html>
  );
}
