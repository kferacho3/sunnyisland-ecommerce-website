"use client";

import Image from "next/image";

export default function NutritionSection() {
  return (
    <section className="w-full bg-black bg-opacity-80 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Styled Nutrition Facts */}
        <div className="bg-gray-900 bg-opacity-50 p-6 rounded space-y-2">
          <h2 className="text-xl md:text-2xl font-bold mb-4 uppercase tracking-wider">
            Nutrition Facts
          </h2>
          <p className="text-sm md:text-base">
            <strong>48</strong> Servings per container
          </p>
          <p className="text-sm md:text-base">Serving size 1 tsp (5.7g)</p>
          <hr className="border-gray-600 my-2" />

          <div className="flex justify-between">
            <p className="text-sm md:text-base font-semibold">Amount per serving</p>
            <p className="text-sm md:text-base font-semibold">0 Calories</p>
          </div>

          <hr className="border-gray-600 my-2" />

          <p className="text-xs md:text-sm text-gray-400">% Daily Value*</p>
          <div className="flex justify-between">
            <p className="text-sm md:text-base">Total Fat 0g</p>
            <p className="text-sm md:text-base">0%</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm md:text-base">Cholesterol 0mg</p>
            <p className="text-sm md:text-base">0%</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm md:text-base">Sodium 100mg</p>
            <p className="text-sm md:text-base">5%</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm md:text-base">Total Carbohydrate 0g</p>
            <p className="text-sm md:text-base">0%</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm md:text-base">Total Sugars 0g</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm md:text-base">Protein 0g</p>
            <p className="text-sm md:text-base">0%</p>
          </div>

          <hr className="border-gray-600 my-2" />
          <p className="text-xs md:text-sm text-gray-300">
            Ingredients: Peppers, Garlic, Water, Vinegar, Fruit, Condiments, Salt
          </p>
          <p className="text-xs md:text-sm text-gray-400 mt-2">
            For more info or allergy concerns, contact 
            <br />
            <strong>TheFerachoGroup@gmail.com</strong>
          </p>
        </div>

        {/* Right: Product Image or any relevant art */}
        <div className="relative w-full h-80 md:h-[28rem]">
          <Image
            src="/images/sunny-island-nutrition.jpg" // placeholder
            alt="Nutrition Product Shot"
            fill
            className="object-cover rounded-md shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
