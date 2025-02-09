"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";

export default function SectionParallax() {
  const containerRef = useRef(null);

  // useScroll with the container as the target
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect values (do not adjust these)
  // Image 2 moves upward from 0 to -100px.
  const translateYImage2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  // Image 3 moves upward from 0 to -120px.
  const translateYImage3 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // Header text moves upward more noticeably.
  const translateYHeader = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const scaleHeader = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // Rotation for decorative triangles around the rising sun.
  const rotateTriangles = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, white 0%, #87CEEB 30%, #F4A460 70%, #FAEBD7 100%)",
      }}
    >
      {/* Parallax Header with moving text */}
      <motion.div
        style={{ y: translateYHeader, scale: scaleHeader }}
        className="relative z-20 text-center mb-8"
      >
        <h1 className="beach-header text-4xl sm:text-6xl font-extrabold">
          TAKE A VISIT TO SUNNY ISLAND!
        </h1>
        <h2 className="beach-header text-2xl sm:text-4xl font-extrabold mt-2">
          View our products or shop now!
        </h2>
      </motion.div>

      {/* Animated Clouds and Birds */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Fancy CSS clouds */}
        <div className="cloud fancy-cloud" style={{ top: "10%", left: "20%" }}></div>
        <div className="cloud fancy-cloud" style={{ top: "15%", left: "70%" }}></div>
        {/* Fancy animated birds */}
        <div className="bird fancy-bird" style={{ top: "20%", left: "30%" }}></div>
        <div className="bird fancy-bird" style={{ top: "25%", left: "80%" }}></div>
      </div>

      {/* Image Container */}
      <div className="relative w-full flex items-center justify-center">
        {/* Parallax Image 1 (Static, in the back) */}
        <motion.img
          src="https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/parallax/SunnyIslandPepperSauceParallax1.png"
          alt="Parallax 1"
          className="absolute object-cover h-auto"
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
          style={{
            left: "50%",
            x: "-50%",
            y: translateYImage2,
            zIndex: 2,
            scale: 1.25,
          }}
        />

        {/* Parallax Image 3 (Front layer – Rising Sun) */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
          }}
        >
          <motion.img
            src="https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/parallax/SunnyIslandPepperSauceParallax3.png"
            alt="Parallax 3"
            className="absolute object-cover h-auto"
            style={{
              y: translateYImage3,
              scale: 1.25,
              filter: "drop-shadow(0 0 20px #3490dc)", // Primary color glow
            }}
          />
          {/* Decorative rotating triangles simulating sun rays */}
          <motion.div
            style={{ rotate: rotateTriangles }}
            className="sun-triangles"
          ></motion.div>
        </div>
      </div>

      {/* Buttons container, centered below the images */}
      <div className="relative z-20 mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link href="/explore/products">
          <button className="px-6 py-3 bg-primary text-white font-bold rounded transition-all duration-500 hover:opacity-90">
            View Our Products
          </button>
        </Link>
        <Link href="/shop">
          <button className="px-6 py-3 bg-secondary text-white font-bold rounded flex items-center gap-2 transition-all duration-500 hover:opacity-90">
            Shop Now <FiArrowRight />
          </button>
        </Link>
      </div>

      {/* Styled JSX for custom styles */}
      <style jsx>{`
        .beach-header {
          color: white;
          -webkit-text-stroke: 0.01px black;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
          font-family: "Anton", sans-serif;
        }
        /* Fancy Cloud Styling */
        .fancy-cloud {
          width: 100px;
          height: 60px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 20px 10px 30px rgba(255, 255, 255, 0.5);
          opacity: 0.8;
          animation: floatCloud 20s linear infinite;
        }
        @keyframes floatCloud {
          0% { transform: translateX(0); }
          50% { transform: translateX(30px); }
          100% { transform: translateX(0); }
        }
        /* Fancy Bird Styling */
        .fancy-bird {
          font-size: 2rem;
          animation: flyBird 8s linear infinite;
        }
        @keyframes flyBird {
          0% { transform: translateX(0); }
          50% { transform: translateX(50px) translateY(-20px); }
          100% { transform: translateX(0); }
        }
        /* Decorative sun triangles */
        .sun-triangles {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 150px;
          height: 150px;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .sun-triangles::before,
        .sun-triangles::after {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border-style: solid;
        }
        .sun-triangles::before {
          border-width: 0 75px 130px 75px;
          border-color: transparent transparent #3490dc transparent;
          top: 0;
          left: 0;
          transform-origin: center;
          animation: rotateTriangle 10s linear infinite;
        }
        .sun-triangles::after {
          border-width: 130px 75px 0 75px;
          border-color: #3490dc transparent transparent transparent;
          bottom: 0;
          left: 0;
          transform-origin: center;
          animation: rotateTriangle 10s linear infinite reverse;
        }
        @keyframes rotateTriangle {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      {/* Google Font Link for Anton (Bold, thick font) */}
      <link
        href="https://fonts.googleapis.com/css2?family=Anton&display=swap"
        rel="stylesheet"
      />
    </section>
  );
}
