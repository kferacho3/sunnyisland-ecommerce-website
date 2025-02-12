"use client";

import { useState } from "react";

interface Review {
  user: string;
  rating: number;
  comment: string;
}

export default function RatingsReviewSection() {
  // Sample reviews
  const [reviews] = useState<Review[]>([
    { user: "Alicia M.", rating: 5, comment: "Absolutely love the flavor!" },
    {
      user: "James D.",
      rating: 4,
      comment: "Great sauce but a bit too spicy.",
    },
    {
      user: "Kendra T.",
      rating: 5,
      comment: "Perfect balance of heat and tang.",
    },
  ]);

  // Simple star rendering
  const renderStars = (count: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= count ? "text-yellow-400" : "text-gray-600"}
        >
          ★
        </span>,
      );
    }
    return stars;
  };

  return (
    <section className="w-full bg-gray-900 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 uppercase tracking-wider">
          Ratings &amp; Reviews
        </h2>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          {/* Overall star rating */}
          <div>
            <div className="text-yellow-400 text-2xl mb-2">★★★★★</div>
            <p className="text-sm md:text-base">4.9 out of 5 (120 reviews)</p>
          </div>
          {/* Maybe a CTA button */}
          <button className="mt-3 md:mt-0 px-5 py-2 bg-orange-500 hover:bg-orange-400 rounded text-white font-semibold">
            Write a Review
          </button>
        </div>

        {/* List of reviews */}
        <div className="space-y-4">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="bg-black bg-opacity-40 p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-2 mb-2">
                <p className="font-bold">{r.user}</p>
                <div className="text-sm text-yellow-400 flex">
                  {renderStars(r.rating)}
                </div>
              </div>
              <p className="text-sm text-gray-200">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
