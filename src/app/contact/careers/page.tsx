"use client";

import Image from "next/image";

export default function CareersPage() {
  return (
    <main className="pt-[100px] min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* ============== Hero Section ============== */}
      <section className="max-w-7xl mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold uppercase mb-6 tracking-wide">
          Join Our Team
        </h1>
        <p className="text-sm md:text-base max-w-3xl mx-auto">
          Sunny Island Pepper Sauce is always on the lookout for passionate
          foodies, hardworking kitchen staff, and creative minds. Whether you’re
          a local restaurant, wholesaler, or an ambitious chef, there’s a place
          for you in our growing family!
        </p>
      </section>

      {/* ============== Opportunities Grid ============== */}
      <section className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kitchen Workers Card */}
        <div className="bg-black bg-opacity-30 p-6 rounded-xl shadow-lg flex flex-col">
          <Image
            src="https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/contact/careers/SunnyIslandCareers.webp"
            alt="Kitchen Worker"
            width={400}
            height={525}
            className="w-full h-[350px] object-cover rounded-md mb-4"
          />
          <h2 className="text-xl md:text-2xl font-bold mb-2 uppercase">
            Kitchen Workers
          </h2>
          <p className="text-sm md:text-base flex-grow">
            Help us produce our signature pepper sauce in a vibrant, fully
            licensed commercial kitchen. We’re always seeking dedicated folks
            ready to prep, cook, and package with precision. If you’re
            passionate about quality and love working with fresh ingredients,
            this is for you!
          </p>
          <button
            className="mt-4 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white font-semibold"
            onClick={() => alert("Interested in Kitchen Roles")}
          >
            Apply Now
          </button>
        </div>

        {/* Brand Ambassadors Card */}
        <div className="bg-black bg-opacity-30 p-6 rounded-xl shadow-lg flex flex-col">
          <Image
            src="https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/contact/careers/SunnyIslandCareers2.webp"
            alt="Brand Ambassador"
            width={400}
            height={525}
            className="w-full h-[350px] object-cover rounded-md mb-4"
          />
          <h2 className="text-xl md:text-2xl font-bold mb-2 uppercase">
            Brand Ambassadors
          </h2>
          <p className="text-sm md:text-base flex-grow">
            If you have a knack for social media and want to share your love for
            Sunny Island Pepper Sauce, join us as a Brand Ambassador! From live
            demos to Instagram reels, show the world how our sauce can elevate
            any meal.
          </p>
          <button
            className="mt-4 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white font-semibold"
            onClick={() => alert("Become a Brand Ambassador")}
          >
            Learn More
          </button>
        </div>

        {/* Chef Collaborations Card */}
        <div className="bg-black bg-opacity-30 p-6 rounded-xl shadow-lg flex flex-col">
          <Image
            src="https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/contact/careers/SunnyIslandCareers3.webp"
            alt="Chef Collaboration"
            width={400}
            height={525}
            className="w-full h-[350px] object-cover rounded-md mb-4"
          />
          <h2 className="text-xl md:text-2xl font-bold mb-2 uppercase">
            Chef Collaborations
          </h2>
          <p className="text-sm md:text-base flex-grow">
            Have a unique recipe that showcases our pepper sauce? We’ll partner
            with you to feature it on our site and tag you for recognition.
            Let’s bring bold, culturally inspiring dishes to life together—your
            creativity, our flavor!
          </p>
          <button
            className="mt-4 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white font-semibold"
            onClick={() => alert("Chef Collaborations")}
          >
            Submit Your Recipe
          </button>
        </div>

        {/* Wholesale & Restaurants Card */}
        <div className="bg-black bg-opacity-30 p-6 rounded-xl shadow-lg flex flex-col">
          <Image
            src="https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/contact/careers/SunnyIslandCareers4.webp"
            alt="Wholesale & Local Restaurants"
            width={400}
            height={525}
            className="w-full h-[350px] object-cover rounded-md mb-4"
          />
          <h2 className="text-xl md:text-2xl font-bold mb-2 uppercase">
            Wholesale &amp; Restaurants
          </h2>
          <p className="text-sm md:text-base flex-grow">
            Stock our sauce in your store or use it in your eatery—whatever you
            need, we’ve got flexible wholesale options. Let’s work together so
            your customers can enjoy the island flair wherever they dine.
          </p>
          <button
            className="mt-4 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white font-semibold"
            onClick={() => alert("Wholesale & Local Restaurant Partnerships")}
          >
            Partner With Us
          </button>
        </div>
      </section>

      {/* Extra CTA / Info */}
      <section className="max-w-5xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 uppercase">
          Ready to Spice Up Your Career?
        </h2>
        <p className="text-sm md:text-base max-w-3xl mx-auto">
          We believe in uplifting every member of our team, from the kitchen to
          the storefront. If you’re passionate about good food, community, and
          growth, we want to hear from you. Send us a note or apply to one of
          our positions today!
        </p>
        <button
          className="mt-6 px-6 py-3 bg-pink-600 hover:bg-pink-500 rounded text-white font-semibold uppercase"
          onClick={() => alert("Apply or Email Us for Career Inquiries")}
        >
          Contact Us
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 py-8">
        <p>
          © {new Date().getFullYear()} Sunny Island Pepper Sauce. All rights
          reserved.
        </p>
      </footer>
    </main>
  );
}
