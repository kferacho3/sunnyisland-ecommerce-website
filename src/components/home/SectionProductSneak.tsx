"use client";

import Link from "next/link";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

export default function SectionProductSneak() {
  const [quantity, setQuantity] = useState("5");
  const [customQuantity, setCustomQuantity] = useState("");

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(e.target.value);
  };

  const handleCustomQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCustomQuantity(e.target.value);
  };

  return (
    <section
      id="section-product-sneak"
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-white dark:bg-black dark:text-white"
    >
      {/* Clever Witty Header */}
      <div className="w-full text-center mb-8">
        <h1
          className="text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-widest"
          style={{
            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
          }}
        >
          GET LOST IN THE SAUCE, TASTE THE SPICE!
        </h1>
      </div>

      <div className="max-w-4xl w-full mx-auto bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="flex-1 flex items-center justify-center">
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet="https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/SunnyIslandPepperSaucePortait.png"
            />
            <img
              src="https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/SunnyIslandPepperSaucePortait.png"
              alt="Signature Pepper Sauce Bottle"
              className="w-full object-contain rounded-lg"
            />
          </picture>
        </div>
        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Signature Pepper Sauce</h2>
            <p className="text-xl text-gray-800 dark:text-gray-200 mb-4">
              $9.99
            </p>
            <p className="text-green-600 font-semibold mb-4">
              20% off on orders of 10 or more!
            </p>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-gray-900 dark:text-white mr-2">
                4.9
              </span>
              <div className="flex">
                <span className="text-primary text-2xl">★</span>
                <span className="text-primary text-2xl">★</span>
                <span className="text-primary text-2xl">★</span>
                <span className="text-primary text-2xl">★</span>
                <span className="text-primary text-2xl">★</span>
              </div>
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                (120 reviews)
              </span>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">
                Select Quantity:
              </label>
              <select
                value={quantity}
                onChange={handleQuantityChange}
                className="p-2 rounded border w-full"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="other">Other</option>
              </select>
              {quantity === "other" && (
                <input
                  type="number"
                  value={customQuantity}
                  onChange={handleCustomQuantityChange}
                  placeholder="Enter quantity"
                  className="mt-2 p-2 rounded border w-full"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button className="px-6 py-3 bg-primary text-white font-bold rounded transition-all duration-500 hover:opacity-90">
              Add to Cart
            </button>
            <Link href="/shop">
              <button className="px-6 py-3 bg-secondary text-white font-bold rounded flex items-center gap-2 transition-all duration-500 hover:opacity-90">
                Visit Our Full Shop <FiArrowRight />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
