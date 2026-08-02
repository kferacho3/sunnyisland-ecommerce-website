"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiCheck, FiStar, FiThumbsUp, FiX } from "react-icons/fi";

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
}

export default function RatingsReviewSection() {
  const [reviews] = useState<Review[]>([
    {
      id: 1,
      user: "Alicia M.",
      rating: 5,
      comment:
        "Absolutely love the flavor! Perfect balance of heat and taste. This has become a staple in our kitchen.",
      date: "2 weeks ago",
      verified: true,
      helpful: 24,
    },
    {
      id: 2,
      user: "James D.",
      rating: 4,
      comment:
        "Great sauce with authentic Caribbean flavor. The heat level is perfect for me, though my wife finds it a bit spicy.",
      date: "1 month ago",
      verified: true,
      helpful: 18,
    },
    {
      id: 3,
      user: "Kendra T.",
      rating: 5,
      comment:
        "Perfect balance of heat and tang. I've tried many hot sauces and this is by far my favorite!",
      date: "1 month ago",
      verified: true,
      helpful: 32,
    },
    {
      id: 4,
      user: "Michael R.",
      rating: 5,
      comment:
        "The flavor profile is incredible. You can taste the quality of the ingredients. Highly recommend!",
      date: "2 months ago",
      verified: false,
      helpful: 15,
    },
  ]);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

  const totalReviews = 120;
  const averageRating = 4.9;
  const ratingDistribution = [
    { stars: 5, count: 98 },
    { stars: 4, count: 18 },
    { stars: 3, count: 3 },
    { stars: 2, count: 1 },
    { stars: 1, count: 0 },
  ];

  const renderStars = (
    rating: number,
    interactive = false,
    size = "text-base",
  ) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            whileHover={interactive ? { scale: 1.1 } : {}}
            whileTap={interactive ? { scale: 0.9 } : {}}
            onMouseEnter={() => interactive && setHoveredStar(star)}
            onMouseLeave={() => interactive && setHoveredStar(0)}
            onClick={() => interactive && setUserRating(star)}
            disabled={!interactive}
            className={`${size} ${interactive ? "cursor-pointer" : "cursor-default"}`}
          >
            <FiStar
              className={`
                ${
                  star <= (interactive ? hoveredStar || userRating : rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }
              `}
            />
          </motion.button>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Customer Reviews
            </motion.h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              See what our customers are saying about Sunny Island Pepper Sauce
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Rating Summary - Mobile First */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white dark:bg-gray-800 shadow-xl p-8">
                {/* Overall Rating */}
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
                    {averageRating}
                  </div>
                  <div className="flex justify-center mb-2">
                    {renderStars(averageRating, false, "text-2xl")}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Based on {totalReviews} reviews
                  </p>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-3 mb-8">
                  {ratingDistribution.map((dist) => (
                    <motion.div
                      key={dist.stars}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * (6 - dist.stars) }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-4">
                        {dist.stars}
                      </span>
                      <FiStar
                        className="text-yellow-400 fill-current"
                        size={16}
                      />
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(dist.count / totalReviews) * 100}%`,
                          }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-yellow-400 to-orange-400"
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                        {dist.count}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Write Review Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowReviewModal(true)}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Write a Review
                </motion.button>
              </div>
            </motion.div>

            {/* Reviews List - Mobile First */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 space-y-4"
            >
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white dark:bg-gray-800 shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      {/* User Avatar */}
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white font-bold">
                        {review.user.charAt(0)}
                      </div>

                      {/* User Info */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {review.user}
                          </h4>
                          {review.verified && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs"
                            >
                              <FiCheck className="w-3 h-3" />
                              <span>Verified</span>
                            </motion.div>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                          {renderStars(review.rating)}
                          <span>{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {review.comment}
                  </p>

                  {/* Helpful Button */}
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                    >
                      <FiThumbsUp />
                      <span>Helpful ({review.helpful})</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}

              {/* Load More Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              >
                Load More Reviews
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowReviewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 shadow-2xl max-w-lg w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Write a Review
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowReviewModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiX className="text-gray-600 dark:text-gray-400" />
                </motion.button>
              </div>

              {/* Rating Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Your Rating
                </label>
                <div className="flex items-center gap-2">
                  {renderStars(userRating, true, "text-3xl")}
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    {userRating > 0
                      ? `${userRating} out of 5`
                      : "Click to rate"}
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Your Review
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  placeholder="Tell us about your experience with Sunny Island Pepper Sauce..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Submit Review
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
