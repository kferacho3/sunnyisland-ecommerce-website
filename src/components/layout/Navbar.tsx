"use client";

import { useTheme } from "@/context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import {
  FiBook,
  FiBriefcase,
  FiCalendar,
  FiChevronDown,
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
import Sidebar from "./Sidebar";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Toggle mobile sidebar menu
  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Generic open/close dropdown logic (for desktop)
  const openDropdown = (menu: string) => setActiveDropdown(menu);
  const closeDropdown = () => setActiveDropdown(null);

  return (
    <>
      <nav
        className="fixed top-0 w-full h-[64px] md:h-[80px] bg-primary text-white dark:bg-black dark:text-white z-50 shadow-md"
        onMouseLeave={closeDropdown}
      >
        <div className="flex items-center justify-between px-6 py-2 md:py-3 relative">
          {/* Left Section: Mobile Hamburger on mobile; Desktop nav on md */}
          <div className="w-1/3 flex items-center">
            <div className="md:hidden">
              <button
                onClick={handleToggleSidebar}
                className="p-2 hover:text-secondary transition-colors"
              >
                <FiMenu className="w-6 h-6" />
              </button>
            </div>
            <div className="hidden md:flex gap-4 items-center">
              {/* SHOP DROPDOWN */}
              <div className="relative">
                <button
                  className="hover:text-secondary flex items-center"
                  onMouseEnter={() => openDropdown("shop")}
                  onFocus={() => openDropdown("shop")}
                >
                  Shop
                  <motion.span
                    animate={{ rotate: activeDropdown === "shop" ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block ml-1"
                  >
                    <FiChevronDown className="w-4 h-4" />
                  </motion.span>
                </button>
                {activeDropdown === "shop" && (
                  <div
                    className="absolute left-0 top-full mt-2 w-48 bg-black text-white rounded shadow-lg py-2 z-50"
                    onMouseEnter={() => openDropdown("shop")}
                  >
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
                  className="hover:text-secondary flex items-center"
                  onMouseEnter={() => openDropdown("explore")}
                  onFocus={() => openDropdown("explore")}
                >
                  Explore
                  <motion.span
                    animate={{ rotate: activeDropdown === "explore" ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block ml-1"
                  >
                    <FiChevronDown className="w-4 h-4" />
                  </motion.span>
                </button>
                {activeDropdown === "explore" && (
                  <div
                    className="absolute left-0 top-full mt-2 w-48 bg-black text-white rounded shadow-lg py-2 z-50"
                    onMouseEnter={() => openDropdown("explore")}
                  >
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
              <div className="relative" onMouseLeave={closeDropdown}>
                <button
                  className="hover:text-secondary flex items-center"
                  onMouseEnter={() => openDropdown("contact")}
                  onFocus={() => openDropdown("contact")}
                >
                  Contact
                  <motion.span
                    animate={{ rotate: activeDropdown === "contact" ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block ml-1"
                  >
                    <FiChevronDown className="w-4 h-4" />
                  </motion.span>
                </button>
                {activeDropdown === "contact" && (
                  <div
                    className="absolute left-0 top-full mt-2 w-48 bg-black text-white rounded shadow-lg py-2 z-50"
                    onMouseEnter={() => openDropdown("contact")}
                  >
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
          </div>

          {/* Center Section: Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">
              <div className="block md:hidden">
                <Image
                  src="/SunnyIslandLogoName.png"
                  alt="Sunny Island Logo"
                  width={160}
                  height={40}
                  priority
                />
              </div>
              <div className="hidden md:block">
                <Image
                  src="/SunnyIslandLogoName.png"
                  alt="Sunny Island Logo"
                  width={200}
                  height={50}
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Right Section */}
          <div className="w-1/3 flex items-center justify-end gap-2 md:gap-4">
            <button
              onClick={toggleTheme}
              className="hover:text-secondary transition duration-200"
            >
              {isDark ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </button>
            <Link
              href="/accountPages/login"
              className="hover:text-secondary transition duration-200"
            >
              <FiUser className="w-5 h-5" />
            </Link>
            <button className="relative hover:text-secondary transition duration-200">
              <FiShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-2 bg-secondary text-black text-xs rounded-full px-1">
                0
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
