"use client";

import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import {
  FiBook,
  FiBriefcase,
  FiCalendar,
  FiEdit,
  FiFacebook,
  FiHeart,
  FiHelpCircle,
  FiInfo,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPackage,
  FiShoppingBag,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";
import { GiChiliPepper } from "react-icons/gi";

interface SidebarProps {
  closeSidebar: () => void;
}

export default function Sidebar({ closeSidebar }: SidebarProps) {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed top-0 left-0 w-full md:w-64 h-full bg-white dark:bg-black dark:text-white z-50 shadow-lg"
    >
      <div className="p-4 flex flex-col h-full text-sm">
        {/* Top Section: Centered Symbol & Close Button */}
        <div className="relative mb-4">
          <div className="flex justify-center">
            <Link href="/">
              <Image
                src="/SunnyIslandSymbol.png"
                alt="Logo"
                width={100}
                height={50}
              />
            </Link>
          </div>
          <button
            onClick={closeSidebar}
            className="absolute right-0 top-0 text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        <hr className="border-gray-300 dark:border-gray-700 mb-4" />

        {/* Navigation Routes */}
        <nav className="flex-1">
          {/* Shop */}
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop"
                  onClick={closeSidebar}
                  className="flex items-center hover:text-secondary transition"
                >
                  <GiChiliPepper className="mr-2" />
                  Pepper Sauce
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  onClick={closeSidebar}
                  className="flex items-center hover:text-secondary transition"
                >
                  <AiOutlineQuestionCircle className="mr-2" />
                  More coming soon!
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/explore/about"
                  onClick={closeSidebar}
                  className="flex items-center hover:text-secondary transition"
                >
                  <FiInfo className="mr-2" />
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/blog"
                  onClick={closeSidebar}
                  className="flex items-center hover:text-secondary transition"
                >
                  <FiEdit className="mr-2" />
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/events"
                  onClick={closeSidebar}
                  className="flex items-center hover:text-secondary transition"
                >
                  <FiCalendar className="mr-2" />
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/locations"
                  onClick={closeSidebar}
                  className="flex items-center hover:text-secondary transition"
                >
                  <FiMapPin className="mr-2" />
                  Locations
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/products"
                  onClick={closeSidebar}
                  className="flex items-center hover:text-secondary transition"
                >
                  <FiPackage className="mr-2" />
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/recipes"
                  onClick={closeSidebar}
                  className="flex items-center hover:text-secondary transition"
                >
                  <FiBook className="mr-2" />
                  Recipes
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  onClick={closeSidebar}
                  className="flex items-center hover:text-secondary transition"
                >
                  <FiShoppingBag className="mr-2" />
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact/inquiries"
                  onClick={closeSidebar}
                  className="flex items-center hover:text-secondary transition"
                >
                  <FiMail className="mr-2" />
                  Inquiries
                </Link>
              </li>
              <li>
                <Link
                  href="/contact/FAQs"
                  onClick={closeSidebar}
                  className="flex items-center hover:text-secondary transition"
                >
                  <FiHelpCircle className="mr-2" />
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact/careers"
                  onClick={closeSidebar}
                  className="flex items-center hover:text-secondary transition"
                >
                  <FiBriefcase className="mr-2" />
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact/supportUs"
                  onClick={closeSidebar}
                  className="flex items-center hover:text-secondary transition"
                >
                  <FiHeart className="mr-2" />
                  Support Us
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <hr className="border-gray-300 dark:border-gray-700 my-4" />

        {/* Bottom Section: Socials & Legal */}
        <div>
          <div className="flex justify-center space-x-4 mb-4">
            <Link
              href="#"
              onClick={closeSidebar}
              className="hover:text-secondary"
            >
              <FiInstagram size={20} />
            </Link>
            <Link
              href="#"
              onClick={closeSidebar}
              className="hover:text-secondary"
            >
              <FiFacebook size={20} />
            </Link>
            <Link
              href="#"
              onClick={closeSidebar}
              className="hover:text-secondary"
            >
              <FiYoutube size={20} />
            </Link>
            <Link
              href="#"
              onClick={closeSidebar}
              className="hover:text-secondary"
            >
              <FiTwitter size={20} />
            </Link>
          </div>
          <div className="text-center text-xs">
            <Link
              href="/legal/privacy"
              onClick={closeSidebar}
              className="hover:text-secondary"
            >
              Privacy Policy
            </Link>
            <span className="mx-2">|</span>
            <Link
              href="/legal/terms"
              onClick={closeSidebar}
              className="hover:text-secondary"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
