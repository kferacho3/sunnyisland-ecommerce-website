"use client";

import { productsData } from "@/data/productsData";
import Image from "next/image";
import { useState } from "react";
import { GiChiliPepper } from "react-icons/gi";

export default function ShopSection() {
  // Only products with a valid modelId are available for purchase.
  const availableProducts = productsData.filter((p) => p.modelId);
  // Default to the first available product (if any)
  const [selectedFlavor, setSelectedFlavor] = useState(
    availableProducts.length ? availableProducts[0].name : productsData[0].name,
  );
  const [quantity, setQuantity] = useState("5");
  const [customQuantity, setCustomQuantity] = useState("");

  const handleCustomQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCustomQuantity(e.target.value);
  };

  const handleFlavorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFlavor(e.target.value);
  };

  const selectedProduct = productsData.find(
    (product) => product.name === selectedFlavor,
  );

  // A product is available only if its modelId is not null.
  const isFlavorAvailable = selectedProduct?.modelId !== null;

  // Quantity options as small square buttons
  const quantityOptions = ["5", "10", "25", "50", "100", "other"];

  return (
    <section className="w-full bg-black bg-opacity-70 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Column: Purchase Options */}
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest">
            {selectedProduct?.name || "Pepper Sauce"}
          </h2>
          <p className="text-sm md:text-base text-gray-300 flex items-center">
            {selectedProduct?.scoville || ""}
            {" | "}
            <span className="ml-2 flex items-center">
              {Array.from({ length: selectedProduct?.spiceLevel || 0 }).map(
                (_, idx) => (
                  <GiChiliPepper
                    key={idx}
                    style={{ color: selectedProduct?.spiceColor || "red" }}
                  />
                ),
              )}
            </span>
          </p>

          {/* Flavor Selection */}
          <div className="mt-4 space-y-3">
            <div>
              <label className="block text-gray-200 text-sm font-semibold">
                Pick Your Flavor
              </label>
              <select
                value={selectedFlavor}
                onChange={handleFlavorChange}
                className="bg-gray-800 text-white p-2 rounded mt-1"
              >
                {productsData.map((product) => (
                  <option key={product.id} value={product.name}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isFlavorAvailable ? (
            <>
              {/* Quantity Selection as small squares */}
              <div className="mt-6">
                <label className="block text-gray-200 text-sm font-semibold mb-2">
                  Quantity
                </label>
                <div className="flex space-x-2">
                  {quantityOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setQuantity(option)}
                      className={`w-10 h-10 flex items-center justify-center border rounded ${
                        quantity === option
                          ? "bg-orange-500 border-orange-500"
                          : "bg-gray-800 border-gray-600"
                      }`}
                    >
                      {option !== "other" ? option : "Other"}
                    </button>
                  ))}
                </div>
                {quantity === "other" && (
                  <input
                    type="number"
                    value={customQuantity}
                    onChange={handleCustomQuantityChange}
                    placeholder="Enter quantity"
                    className="mt-2 p-2 rounded border w-full bg-gray-800 text-white"
                  />
                )}
              </div>

              {/* Add To Cart Button */}
              <button className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-400 rounded font-semibold uppercase">
                Add To Cart
              </button>
            </>
          ) : (
            <div className="mt-6">
              <p className="text-lg text-yellow-300 font-bold">Coming Soon!</p>
            </div>
          )}

          {/* Product Description */}
          <div className="mt-4 space-y-2">
            <h3 className="text-lg font-bold">Product Description</h3>
            <p className="text-sm md:text-base text-gray-200">
              {selectedProduct?.description || ""}
              <br />
              <span className="underline cursor-pointer">
                View Nutrition Facts
              </span>
            </p>
          </div>
        </div>

        {/* Right Column: Large Product Image */}
        <div className="relative w-auto h-96">
          <Image
            src="https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/shop/SunnyIslandPepperSaucePNGNoBackground.webp" // replace with the real image if available
            alt={selectedProduct?.name || "Pepper Sauce"}
            fill
            className="object-contain rounded shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
