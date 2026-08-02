"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CollageImage = {
  src: string;
  style: React.CSSProperties;
};

export default function LocationsPage() {
  // State to store user’s latitude & longitude
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // State to hold our randomly selected 6 collage images with computed positions
  const [selectedImages, setSelectedImages] = useState<CollageImage[]>([]);

  useEffect(() => {
    // Attempt to get the user's geolocation in the browser
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.warn(
            "Geolocation not available or permission denied.",
            error,
          );
        },
      );
    }

    // All 10 collage images
    const collageImages = [
      {
        src: "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/locations/locations1.webp",
      },
      {
        src: "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/locations/locations2.webp",
      },
      {
        src: "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/locations/locations3.webp",
      },
      {
        src: "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/locations/locations4.webp",
      },
      {
        src: "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/locations/locations5.webp",
      },
      {
        src: "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/locations/locations6.webp",
      },
      {
        src: "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/locations/locations7.webp",
      },
      {
        src: "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/locations/locations8.webp",
      },
      {
        src: "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/locations/locations9.webp",
      },
      {
        src: "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/locations/locations10.webp",
      },
    ];

    // Shuffle and pick 6 random images
    const shuffledImages = [...collageImages]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);

    // Define a cluster area for images within the container (percentages relative to the whiteboard)
    // Reserve the top 25% for the logo and cluster the grid within the next 70% of the container.
    const clusterLeft = 10; // in percent
    const clusterTop = 25; // in percent (images start below the logo)
    const clusterWidth = 80; // in percent of container's width
    const clusterHeight = 70; // in percent of container's height

    // Use a 2x3 grid (6 cells) within the cluster area.
    const numCols = 3;
    const numRows = 2;
    const cellWidth = clusterWidth / numCols; // e.g., ~26.67%
    const cellHeight = clusterHeight / numRows; // e.g., ~35%

    // Define image size (as a percentage of the container's width)
    const imageSizePercent = 24; // slightly smaller than cell width to allow some margin

    // Maximum random offset so that each image stays within its cell.
    const maxOffsetX = cellWidth - imageSizePercent;
    const maxOffsetY = cellHeight - imageSizePercent;

    // Generate grid cells for the 2x3 grid.
    const cells: { col: number; row: number }[] = [];
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        cells.push({ col, row });
      }
    }
    // Shuffle the cells and pick all 6 cells.
    const shuffledCells = cells.sort(() => Math.random() - 0.5).slice(0, 6);

    // Map each selected image to its cell with a slight random offset and rotation.
    const imagesWithPositions = shuffledImages.map((img, index) => {
      const cell = shuffledCells[index];
      const offsetX = Math.random() * maxOffsetX;
      const offsetY = Math.random() * maxOffsetY;
      const left = clusterLeft + cell.col * cellWidth + offsetX;
      const top = clusterTop + cell.row * cellHeight + offsetY;
      // Random rotation between -8 and 8 degrees.
      const rotation = (Math.random() * 16 - 8).toFixed(2);
      return {
        ...img,
        style: {
          position: "absolute" as "absolute",
          left: `${left}%`,
          top: `${top}%`,
          width: `${imageSizePercent}%`,
          transform: `rotate(${rotation}deg)`,
        },
      };
    });

    setSelectedImages(imagesWithPositions);
  }, []);

  return (
    <main className="pt-[50px] min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* ========================= Hero Section with Collage ========================= */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Collage Container */}
          <div className="w-full md:w-1/2">
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
              {/* Logo at the top center of the collage, ensuring it doesn't overlap images */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20">
                <img
                  src="https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/locations/UKRblack.webp"
                  alt="UKR Logo"
                  className="w-16 h-16"
                />
              </div>
              {/* Whiteboard container for the 2x3 grid */}
              <div className="absolute inset-0 flex justify-center items-center">
                <div
                  className="relative w-[80%] h-[80%] overflow-hidden"
                  style={{
                    backgroundColor: "#f2f2f2",
                    borderRadius: "5px",
                    border: "10px solid #adb2bd",
                    boxShadow:
                      "inset -1px 2px 2px #404040, 6px 9px 1px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {/* Render each randomly positioned image */}
                  {selectedImages.map((img, index) => (
                    <Link
                      key={index}
                      href="https://www.ukitchenrental.com/our-kitchen"
                      target="_blank"
                    >
                      <img
                        src={img.src}
                        alt={`Location ${index + 1}`}
                        className="absolute object-cover rounded-lg hover:scale-105 transition-transform duration-300 shadow-md"
                        style={img.style}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hero Text */}
          <div className="w-full md:w-1/2 space-y-5">
            <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
              Welcome to Our Shared Kitchen
            </h1>
            <p className="leading-relaxed">
              We operate out of a fully licensed commercial kitchen in Oakland
              Park, FL. Our team emphasizes a{" "}
              <strong>clean cooking process</strong> and the highest quality
              ingredients. Every batch of <em>Sunny Island Pepper Sauce</em> is
              hand‑made, ensuring unmatched freshness and flavor. We believe in
              taking our time to deliver a superior product that captures the
              essence of our Caribbean heritage.
            </p>
            <p className="leading-relaxed">
              From gas stoves and convection ovens to walk‑in coolers and
              freezers, our kitchen is equipped for any scale of production.
              This professional environment allows us to{" "}
              <strong>focus on quality</strong> so you can enjoy the best pepper
              sauce around.
            </p>
          </div>
        </div>
      </section>

      {/* ========================= Kitchen Details ========================= */}
      <section className="max-w-4xl mx-auto px-4 py-8 space-y-4 bg-black bg-opacity-40 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold">Our Oakland Park Kitchen</h2>
        <p className="text-sm md:text-base">
          <strong>Location:</strong> 4072 NE 5th Ter, Fort Lauderdale, FL 33334
        </p>
        <p className="text-sm md:text-base">
          We share this kitchen space alongside other passionate food
          entrepreneurs. It features:
        </p>
        <ul className="list-disc list-inside text-sm md:text-base">
          <li>Spacious 5000+ sq ft fully licensed commercial facility</li>
          <li>Walk‑in coolers, freezers, gas stoves, ovens, slicers, mixers</li>
          <li>Stainless prep tables, sinks, fire suppression & grease traps</li>
          <li>
            Secure 24/7 access with WiFi, camera systems, & climate control
          </li>
          <li>Plenty of parking & food truck friendly</li>
        </ul>
        <p className="text-sm md:text-base">
          Whether for test batches or full production runs, we maintain rigorous
          sanitary standards to ensure our pepper sauces are consistently
          top‑notch.
        </p>
      </section>

      {/* ========================= Distribution Locations ========================= */}
      <section className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Sunny Island Pepper Sauce Distribution
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Atlanta, GA */}
          <div className="p-6 bg-black bg-opacity-30 rounded-lg shadow-lg flex flex-col gap-4">
            <h3 className="text-xl font-semibold tracking-wide">
              Atlanta, Georgia
            </h3>
            <p className="text-sm md:text-base">
              Our product will soon be available for pick‑up or local delivery
              in the Atlanta Metro area. Stay tuned for more info as we finalize
              distribution partnerships.
            </p>
            <iframe
              className="w-full h-60 rounded-md border-none"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13277.30896430532!2d-84.39218549999999!3d33.7530685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f504635dbbe0c7%3A0xb273e7c722f6db47!2sAtlanta%2C%20GA!5e0!3m2!1sen!2sus!4v1676580499462!5m2!1sen!2sus"
              allowFullScreen
              loading="lazy"
            />
          </div>
          {/* Ft. Lauderdale, FL */}
          <div className="p-6 bg-black bg-opacity-30 rounded-lg shadow-lg flex flex-col gap-4">
            <h3 className="text-xl font-semibold tracking-wide">
              Ft. Lauderdale, Florida
            </h3>
            <p className="text-sm md:text-base">
              Home to our primary kitchen operations. Pick‑ups can be arranged
              by appointment, and we’re working on expanding local store
              availability.
            </p>
            <iframe
              className="w-full h-60 rounded-md border-none"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14347.476105005318!2d-80.14073769999999!3d26.1224735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d901df837ae4e5%3A0x8e7ad2dce108484c!2sFort%20Lauderdale%2C%20FL!5e0!3m2!1sen!2sus!4v1676580565463!5m2!1sen!2sus"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ========================= About Our Process ========================= */}
      <section className="max-w-5xl mx-auto px-4 py-10 space-y-4 bg-black bg-opacity-30 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Clean Cooking & Quality You Can Trust
        </h2>
        <p className="text-sm md:text-base leading-relaxed">
          Each bottle of <em>Sunny Island Pepper Sauce</em> undergoes a
          thorough, hands‑on production cycle. From meticulously selecting fresh
          peppers and spices to slow cooking in small batches, we refuse to
          compromise on taste or safety. Our facility meets all commercial
          standards, but it’s our passion and care that elevate our sauce above
          the rest. This is why each order may take time—we want it perfect for
          you!
        </p>
        <p className="text-sm md:text-base leading-relaxed">
          Questions or special requests? Reach out—we love hearing from fellow
          hot sauce enthusiasts.
        </p>
      </section>

      {/* ========================= (Optional) User Location Debug ========================= */}
      {userLocation && (
        <div className="max-w-xl mx-auto px-4 py-6 mt-10 text-center bg-black bg-opacity-40 rounded-lg shadow-lg">
          <p className="text-xs">
            <strong>Your location (approx.):</strong> Latitude{" "}
            {userLocation.lat.toFixed(4)}, Longitude{" "}
            {userLocation.lng.toFixed(4)}
          </p>
        </div>
      )}
    </main>
  );
}
