"use client";

import { useTheme } from "@/context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// React Icons (base icons + others for dropdown items)
import { AiOutlineQuestionCircle } from "react-icons/ai";
import {
  FiBook,
  FiBriefcase,
  FiCalendar,
  FiEdit,
  FiHeart,
  FiHelpCircle,
  FiInfo,
  FiMail,
  FiMapPin,
  FiMenu,
  FiMoon,
  FiPackage,
  FiShoppingBag,
  FiShoppingCart,
  FiSun,
  FiUser,
} from "react-icons/fi";
import { GiChiliPepper } from "react-icons/gi";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle mobile sidebar menu
  const handleToggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // Generic open/close dropdown logic
  const openDropdown = (menu: string) => {
    setActiveDropdown(menu);
  };
  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 w-full h-20 bg-primary text-white dark:bg-black dark:text-white z-50 shadow-md">
        <div className="flex items-center justify-between px-[2.5%] py-3">
          {/* Left Section (Desktop) */}
          <div className="hidden md:flex gap-4 items-center">
            {/* SHOP DROPDOWN (Only 2 Items) */}
            <div className="relative">
              <button
                className="hover:text-secondary"
                onMouseEnter={() => openDropdown("shop")}
                onFocus={() => openDropdown("shop")} // for keyboard focus
              >
                Shop
              </button>
              {activeDropdown === "shop" && (
                <div
                  className="absolute left-0 top-full mt-2 w-48 bg-black text-white rounded shadow-lg py-2 z-50"
                  onMouseEnter={() => openDropdown("shop")}
                  onMouseLeave={closeDropdown}
                >
                  {/* 1. Pepper Sauce */}
                  <div className="group">
                    <Link
                      href="/shop"
                      className="transition duration-150 group-hover:text-red-500"
                    >
                      <div className="flex justify-between items-center px-4 py-2">
                        <span>Pepper Sauce</span>
                        <GiChiliPepper className="group-hover:text-red-500" />
                      </div>
                    </Link>
                    <hr className="mx-2 my-1 border-white transition-colors duration-150 group-hover:border-red-500" />
                  </div>
                  {/* 2. More coming soon! (No hr after) */}
                  <div className="group">
                    <Link
                      href="#"
                      className="transition duration-150 group-hover:text-red-500"
                    >
                      <div className="flex justify-between items-center px-4 py-2">
                        <span>More coming soon!</span>
                        <AiOutlineQuestionCircle className="group-hover:text-red-500" />
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* EXPLORE DROPDOWN */}
            <div className="relative">
              <button
                className="hover:text-secondary"
                onMouseEnter={() => openDropdown("explore")}
                onFocus={() => openDropdown("explore")}
              >
                Explore
              </button>
              {activeDropdown === "explore" && (
                <div
                  className="absolute left-0 top-full mt-2 w-48 bg-black text-white rounded shadow-lg py-2 z-50"
                  onMouseEnter={() => openDropdown("explore")}
                  onMouseLeave={closeDropdown}
                >
                  {/* 1. About */}
                  <div className="group">
                    <Link
                      href="/explore/about"
                      className="transition duration-150 group-hover:text-red-500"
                    >
                      <div className="flex justify-between items-center px-4 py-2">
                        <span>About</span>
                        <FiInfo className="group-hover:text-red-500" />
                      </div>
                    </Link>
                    <hr className="mx-2 my-1 border-white transition-colors duration-150 group-hover:border-red-500" />
                  </div>
                  {/* 2. Blog */}
                  <div className="group">
                    <Link
                      href="/explore/blog"
                      className="transition duration-150 group-hover:text-red-500"
                    >
                      <div className="flex justify-between items-center px-4 py-2">
                        <span>Blog</span>
                        <FiEdit className="group-hover:text-red-500" />
                      </div>
                    </Link>
                    <hr className="mx-2 my-1 border-white transition-colors duration-150 group-hover:border-red-500" />
                  </div>
                  {/* 3. Events */}
                  <div className="group">
                    <Link
                      href="/explore/events"
                      className="transition duration-150 group-hover:text-red-500"
                    >
                      <div className="flex justify-between items-center px-4 py-2">
                        <span>Events</span>
                        <FiCalendar className="group-hover:text-red-500" />
                      </div>
                    </Link>
                    <hr className="mx-2 my-1 border-white transition-colors duration-150 group-hover:border-red-500" />
                  </div>
                  {/* 4. Locations */}
                  <div className="group">
                    <Link
                      href="/explore/locations"
                      className="transition duration-150 group-hover:text-red-500"
                    >
                      <div className="flex justify-between items-center px-4 py-2">
                        <span>Locations</span>
                        <FiMapPin className="group-hover:text-red-500" />
                      </div>
                    </Link>
                    <hr className="mx-2 my-1 border-white transition-colors duration-150 group-hover:border-red-500" />
                  </div>
                  {/* 5. Products */}
                  <div className="group">
                    <Link
                      href="/explore/products"
                      className="transition duration-150 group-hover:text-red-500"
                    >
                      <div className="flex justify-between items-center px-4 py-2">
                        <span>Products</span>
                        <FiPackage className="group-hover:text-red-500" />
                      </div>
                    </Link>
                    <hr className="mx-2 my-1 border-white transition-colors duration-150 group-hover:border-red-500" />
                  </div>
                  {/* 6. Recipes */}
                  <div className="group">
                    <Link
                      href="/explore/recipes"
                      className="transition duration-150 group-hover:text-red-500"
                    >
                      <div className="flex justify-between items-center px-4 py-2">
                        <span>Recipes</span>
                        <FiBook className="group-hover:text-red-500" />
                      </div>
                    </Link>
                    <hr className="mx-2 my-1 border-white transition-colors duration-150 group-hover:border-red-500" />
                  </div>
                  {/* 7. Shop (Last Item, no hr) */}
                  <div className="group">
                    <Link
                      href="/shop"
                      className="transition duration-150 group-hover:text-red-500"
                    >
                      <div className="flex justify-between items-center px-4 py-2">
                        <span>Shop</span>
                        <FiShoppingBag className="group-hover:text-red-500" />
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* CONTACT DROPDOWN */}
            <div className="relative">
              <button
                className="hover:text-secondary"
                onMouseEnter={() => openDropdown("contact")}
                onFocus={() => openDropdown("contact")}
              >
                Contact
              </button>
              {activeDropdown === "contact" && (
                <div
                  className="absolute left-0 top-full mt-2 w-48 bg-black text-white rounded shadow-lg py-2 z-50"
                  onMouseEnter={() => openDropdown("contact")}
                  onMouseLeave={closeDropdown}
                >
                  {/* 1. Inquiries */}
                  <div className="group">
                    <Link
                      href="/contact/inquiries"
                      className="transition duration-150 group-hover:text-red-500"
                    >
                      <div className="flex justify-between items-center px-4 py-2">
                        <span>Inquiries</span>
                        <FiMail className="group-hover:text-red-500" />
                      </div>
                    </Link>
                    <hr className="mx-2 my-1 border-white transition-colors duration-150 group-hover:border-red-500" />
                  </div>
                  {/* 2. FAQs */}
                  <div className="group">
                    <Link
                      href="/contact/FAQs"
                      className="transition duration-150 group-hover:text-red-500"
                    >
                      <div className="flex justify-between items-center px-4 py-2">
                        <span>FAQs</span>
                        <FiHelpCircle className="group-hover:text-red-500" />
                      </div>
                    </Link>
                    <hr className="mx-2 my-1 border-white transition-colors duration-150 group-hover:border-red-500" />
                  </div>
                  {/* 3. Careers */}
                  <div className="group">
                    <Link
                      href="/contact/careers"
                      className="transition duration-150 group-hover:text-red-500"
                    >
                      <div className="flex justify-between items-center px-4 py-2">
                        <span>Careers</span>
                        <FiBriefcase className="group-hover:text-red-500" />
                      </div>
                    </Link>
                    <hr className="mx-2 my-1 border-white transition-colors duration-150 group-hover:border-red-500" />
                  </div>
                  {/* 4. Support Us (No hr) */}
                  <div className="group">
                    <Link
                      href="/contact/supportUs"
                      className="transition duration-150 group-hover:text-red-500"
                    >
                      <div className="flex justify-between items-center px-4 py-2">
                        <span>Support Us</span>
                        <FiHeart className="group-hover:text-red-500" />
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center Section: Logo */}
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 ${
              windowWidth <= 768 ? "left-[20%] -translate-x-0" : ""
            }`}
          >
            <Link href="/">
              <Image
                src="/SunnyIslandLogoName.png"
                alt="Sunny Island Logo"
                width={200}
                height={50}
              />
            </Link>
          </div>

          {/* Right Section: Theme, Account, Cart, Mobile Menu */}
          <div className="flex gap-4 items-center">
            {windowWidth <= 768 ? (
              <button
                onClick={handleToggleMobileMenu}
                className="hover:text-secondary"
              >
                <FiMenu size={22} />
              </button>
            ) : (
              <>
                <button
                  onClick={toggleTheme}
                  className="hover:text-secondary transition duration-200"
                >
                  {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
                </button>
                <Link
                  href="/accountPages/login"
                  className="hover:text-secondary transition duration-200"
                >
                  <FiUser size={20} />
                </Link>
                <button className="relative hover:text-secondary transition duration-200">
                  <FiShoppingCart size={20} />
                  <span className="absolute -top-1 -right-2 bg-secondary text-black text-xs rounded-full px-1">
                    0
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && windowWidth <= 768 && (
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            exit={{ x: "-100vw" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-64 h-full bg-white text-black dark:bg-black dark:text-white p-4 z-50 shadow-lg"
          >
            <button onClick={handleToggleMobileMenu} className="mb-4">
              Close
            </button>
            {/* Quick Links (Mobile) */}
            <Link href="/shop" className="block mb-2">
              Shop
            </Link>
            <Link href="#" className="block mb-2">
              Pepper Sauce
            </Link>
            <Link href="#" className="block mb-2">
              More coming soon!
            </Link>
            <hr className="my-2" />
            <Link href="/explore/about" className="block mb-2">
              About
            </Link>
            <Link href="/explore/blog" className="block mb-2">
              Blog
            </Link>
            <Link href="/explore/events" className="block mb-2">
              Events
            </Link>
            <Link href="/explore/locations" className="block mb-2">
              Locations
            </Link>
            <Link href="/explore/products" className="block mb-2">
              Products
            </Link>
            <Link href="/explore/recipes" className="block mb-2">
              Recipes
            </Link>
            <Link href="/shop" className="block mb-2">
              Shop
            </Link>
            <hr className="my-2" />
            <Link href="/contact/inquiries" className="block mb-2">
              Inquiries
            </Link>
            <Link href="/contact/FAQs" className="block mb-2">
              FAQs
            </Link>
            <Link href="/contact/careers" className="block mb-2">
              Careers
            </Link>
            <Link href="/contact/supportUs" className="block mb-2">
              Support Us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
