"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { GiHeartBottle } from "react-icons/gi";

export default function SectionParallax() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // useScroll with the container as the target
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Use reduced motion values on mobile/low-performance devices
  const translateYImage2 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : 50],
  );
  const translateYImage3 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : -650],
  );
  const translateYHeader = useTransform(
    scrollYProgress,
    [0, 1],
    [shouldReduceMotion ? 0 : -100, 0],
  );
  const scaleHeader = useTransform(
    scrollYProgress,
    [0, 1],
    [1, shouldReduceMotion ? 1 : 0.98],
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, white 0%, #87CEEB 30%, #F4A460 70%, #FAEBD7 100%)",
        fontFamily: "'ZelioonWild', sans-serif",
      }}
    >
      {/* Custom Font for Parallax Page */}
      <style jsx>{`
        @font-face {
          font-family: "ZelioonWild";
          src: url("/ZelioonWild-BLOm5.otf") format("opentype");
          font-weight: normal;
          font-style: normal;
        }
        .custom-sun {
          font-family: "ZelioonWild", sans-serif;
        }
        .beach-header {
          color: white;
          -webkit-text-stroke: 0.01px black;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        }
      `}</style>

      {/* Sun Animation Styles */}
      <style jsx>{`
        .sun {
          margin-left: 7%;
          top: 1%;
          animation: ${shouldReduceMotion
            ? "none"
            : "rotate 4s linear infinite"};
          --color: yellow;
          --scale: 0.5;
        }
        .center {
          height: calc(var(--scale) * 10em);
          width: calc(var(--scale) * 10em);
          transition:
            background-color 2s linear,
            box-shadow 2s linear;
          background-color: var(--color);
          border-radius: 50%;
          box-shadow: 0 0 calc(var(--scale) * 3em) var(--color);
        }
        .ray {
          position: absolute;
          height: calc(var(--scale) * 3em);
          width: calc(var(--scale) * 0.5em);
          transition:
            background-color 2s ease-in-out,
            box-shadow 2s ease-in-out;
          box-shadow: 0 0 calc(var(--scale) * 1em) var(--color);
          background-color: var(--color);
        }
        .r-1 {
          margin-left: calc(var(--scale) * 4.75em);
          margin-top: calc(var(--scale) * 1em);
        }
        .r-2 {
          margin-left: calc(var(--scale) * 12.25em);
          margin-top: calc(var(--scale) * -6.25em);
          transform: rotate(90deg);
        }
        .r-3 {
          margin-left: calc(var(--scale) * 4.75em);
          margin-top: calc(var(--scale) * -14em);
        }
        .r-4 {
          margin-left: calc(var(--scale) * -2.75em);
          margin-top: calc(var(--scale) * -6.25em);
          transform: rotate(90deg);
        }
        .r-5 {
          margin-left: calc(var(--scale) * -0.5em);
          margin-top: calc(var(--scale) * -1em);
          transform: rotate(45deg);
        }
        .r-6 {
          margin-left: calc(var(--scale) * 9.75em);
          margin-top: calc(var(--scale) * -1em);
          transform: rotate(-45deg);
        }
        .r-7 {
          margin-left: calc(var(--scale) * 10.25em);
          margin-top: calc(var(--scale) * -11.75em);
          transform: rotate(45deg);
        }
        .r-8 {
          margin-left: calc(var(--scale) * -0.5em);
          margin-top: calc(var(--scale) * -11.75em);
          transform: rotate(-45deg);
        }
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
            --color: yellow;
          }
          100% {
            transform: rotate(360deg);
            --color: orange;
          }
        }
      `}</style>

      {/* Parallax Header with moving text */}
      <motion.div
        style={{ y: translateYHeader, scale: scaleHeader }}
        className="relative z-20 text-center mb-8"
      >
        <h1 className="beach-header text-6xl sm:text-8xl ">
          Grab a bottle of sunshine with
        </h1>
        <h2 className="beach-header text-3xl sm:text-6xl mt-2">SUNNY ISLAND</h2>
      </motion.div>

      {/* Image Container */}
      <div className="relative w-full flex items-center justify-center">
        {/* Parallax Image 1 (Static, in the back) */}
        <motion.img
          src="https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/parallax/SunnyIslandPepperSauceParallax1.png"
          alt="Parallax 1"
          className="absolute object-cover h-auto"
          loading="lazy"
          style={{
            left: "50%",
            x: "-50%",
            zIndex: 1,
            scale: 1.25,
          }}
        />

        {/* Parallax Image 2 (Middle layer) */}
        <motion.img
          src="https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/parallax/SunnyIslandPepperSauceParallax2.png"
          alt="Parallax 2"
          className="absolute object-cover h-auto"
          loading="lazy"
          style={{
            left: "50%",
            x: "-50%",
            y: translateYImage2,
            zIndex: 2,
            scale: 1.25,
          }}
        />

        {/* Parallax Image 3 with Rotating Sun Rays */}
        <motion.div
          style={{
            filter: "drop-shadow(0 0 20px #3490dc)",
            position: "absolute",
            y: translateYImage3,
            zIndex: 1,
          }}
        >
          <div className="sun">
            <motion.img
              src="https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/parallax/SunnyIslandPepperSauceParallax3.png"
              alt="Parallax 3"
              className="object-cover w-full h-full"
              loading="lazy"
              style={{
                filter: "drop-shadow(0 0 20px #3490dc)",
                position: "absolute",
                top: "127.5px",
                transform: "scale(4.5)",
              }}
            />
            <div className="center"></div>
            <div className="ray r-1"></div>
            <div className="ray r-2"></div>
            <div className="ray r-3"></div>
            <div className="ray r-4"></div>
            <div className="ray r-5"></div>
            <div className="ray r-6"></div>
            <div className="ray r-7"></div>
            <div className="ray r-8"></div>
          </div>

          {/* Sun glow effect */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.75 }}
            transition={{ delay: 1.5, duration: 1 }}
            style={{
              position: "absolute",
              left: "50%",
              top: "20%",
              transform: "translate(-50%, -50%)",
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              background: "rgba(255, 223, 0, 0.4)",
              filter: "blur(20px)",
              zIndex: 0,
            }}
          />
        </motion.div>
      </div>

      {/* Buttons Container */}
      <div className="relative z-20 mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link href="/explore/products">
          <button className="group flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#FFB300] via-[#FFC107] to-[#FFA000] text-black font-bold rounded-lg shadow-lg border border-transparent transition-all duration-300 transform hover:scale-105 hover:border-white">
            View Our Products
            <GiHeartBottle className="transition-transform duration-300 group-hover:animate-shake" />
          </button>
        </Link>
        <Link href="https://sunnyislandpepper.myshopify.com/products/sunny-island-pepper-sauce-classic-gold">
          <button className="group flex items-center gap-2 px-8 py-3 bg-secondary text-white font-bold rounded-lg shadow-lg border border-transparent transition-all duration-300 transform hover:scale-105 hover:border-white">
            Shop Now
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
          </button>
        </Link>
      </div>

      {/* Google Font Link for Anton (used only for the first header line) */}
      <link
        href="https://fonts.googleapis.com/css2?family=Anton&display=swap"
        rel="stylesheet"
      />

      {/* Shake Animation for the bottle icon */}
      <style jsx>{`
        @keyframes shake {
          0% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          50% {
            transform: translateX(5px);
          }
          75% {
            transform: translateX(-5px);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </section>
  );
}
