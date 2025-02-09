"use client";

import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import Link from "next/link";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Footer newsletter signup");
  };

  return (
    <footer className="w-full bg-primary text-white dark:bg-black dark:text-white py-8 mt-8">
      <div className="container mx-auto px-4">
        {/* Top section */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-8">
          <div className="sm:w-1/5 flex flex-col items-start justify-start">
            <div className="mb-2">
              <img
                src="/SunnyIslandLogo.png"
                alt="Sunny Island Logo"
                className="w-40 h-auto"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center sm:items-start">
            <h3 className="text-sm font-bold mb-2">SOCIALS</h3>
            <div className="flex gap-4 mb-4">
              <Link href="#" className="hover:text-secondary">
                <FiInstagram size={20} />
              </Link>
              <Link href="#" className="hover:text-secondary">
                <FiFacebook size={20} />
              </Link>
              <Link href="#" className="hover:text-secondary">
                <FiYoutube size={20} />
              </Link>
              <Link href="#" className="hover:text-secondary">
                <FiTwitter size={20} />
              </Link>
            </div>

            <hr className="w-full border-gray-600 mb-4" />

            <div className="grid grid-cols-3 gap-4 w-full text-xs sm:text-sm">
              {/* SHOP */}
              <div>
                <h4 className="font-semibold mb-2">Shop</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>
                    <Link href="/shop" className="hover:text-secondary">
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop/sections/shop"
                      className="hover:text-secondary"
                    >
                      Shop Items
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop/sections/nutrition"
                      className="hover:text-secondary"
                    >
                      Nutrition
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop/sections/ratingsReview"
                      className="hover:text-secondary"
                    >
                      Ratings & Reviews
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop/sections/useCase"
                      className="hover:text-secondary"
                    >
                      Use Case
                    </Link>
                  </li>
                </ul>
              </div>

              {/* EXPLORE */}
              <div>
                <h4 className="font-semibold mb-2">Explore</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>
                    <Link href="/explore/about" className="hover:text-secondary">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/explore/blog" className="hover:text-secondary">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/explore/events" className="hover:text-secondary">
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/explore/locations"
                      className="hover:text-secondary"
                    >
                      Locations
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/explore/products"
                      className="hover:text-secondary"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/explore/recipes"
                      className="hover:text-secondary"
                    >
                      Recipes
                    </Link>
                  </li>
                </ul>
              </div>

              {/* CONTACT */}
              <div>
                <h4 className="font-semibold mb-2">Contact</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>
                    <Link
                      href="/contact/inquiries"
                      className="hover:text-secondary"
                    >
                      Inquiries
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact/FAQs" className="hover:text-secondary">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact/careers"
                      className="hover:text-secondary"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact/supportUs"
                      className="hover:text-secondary"
                    >
                      Support Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="sm:w-1/5 flex flex-col items-start justify-start">
            <h4 className="font-semibold text-sm mb-2">Stay in the Loop</h4>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col space-y-2 mb-4 w-full"
            >
              <FormInput
                label="Email"
                name="footerEmail"
                type="email"
                required
                placeholder="Enter your email"
              />
              <Button type="submit" className="w-full sm:w-auto">
                Subscribe
              </Button>
            </form>

            <div className="flex gap-2">
              <Link
                href="/accountPages/login"
                className="underline hover:text-secondary text-xs sm:text-sm"
              >
                Login
              </Link>
              <span>|</span>
              <Link
                href="/accountPages/register"
                className="underline hover:text-secondary text-xs sm:text-sm"
              >
                Register
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs sm:text-sm">
          &copy; 2025 Sunny Island&reg;. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
