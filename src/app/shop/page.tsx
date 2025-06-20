import NutritionSection from "./sections/nutrition";
import RatingsReviewSection from "./sections/ratingsReview";
import ShopSection from "./sections/shop";
import UseCaseSection from "./sections/useCase";

export default function ShopPage() {
  return (
    <main className="bg-black mt:20 md:mt-24 min-h-screen">
      {/* Shop Section (purchase UI) */}
      <ShopSection />

      {/* Use Case Section (Hexagon carousel) */}
      <UseCaseSection />

      {/* Nutrition Facts Section */}
      <NutritionSection />

      {/* Ratings & Reviews */}
      <RatingsReviewSection />
    </main>
  );
}
