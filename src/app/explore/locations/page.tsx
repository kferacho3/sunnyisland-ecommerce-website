"use client";
// ^ If using Next.js App Router and want to use client-side logic (e.g. geolocation),
//   keep this directive. If using Pages Router, it's not strictly necessary.

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * For SSR-friendliness with geolocation:
 * - We'll gather user location client-side only (after hydration).
 * - The rest of the page is rendered on the server, so search engines can index it,
 *   but the geolocator logic happens in `useEffect`.
 */

export default function LocationsPage() {
  // State to store user’s latitude & longitude
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Attempt to get the user's geolocation in the browser
  useEffect(() => {
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
  }, []);

  return (
    <main className="pt-[100px] min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* ========================= Hero Section ========================= */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Hero Image (Kitchen) */}
          <div className="w-full md:w-1/2 h-64 md:h-80 relative">
            <Image
              src="/images/kitchen-hero.jpg"
              // Replace with a relevant image in your `public/images` folder
              alt="Commercial Kitchen"
              fill
              className="object-cover rounded-lg shadow-lg"
              // Using 'fill' with parent relative to fill the container.
            />
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
            {/* Example: Embedded Google Map or static image */}
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
