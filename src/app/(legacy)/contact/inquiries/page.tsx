"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  FaBriefcase,
  FaBuilding,
  FaEnvelope,
  FaFacebookF,
  FaGlobe,
  FaHeart,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaQuestionCircle,
  FaShareAlt,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import {
  FiCheckCircle,
  FiMail,
  FiMessageSquare,
  FiSend,
  FiUser,
} from "react-icons/fi";
import { GiChiliPepper } from "react-icons/gi";

export default function InquiriesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"individual" | "wholesale">(
    "individual",
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // States for "Individual/Restaurants" form
  const [indivName, setIndivName] = useState("");
  const [indivEmail, setIndivEmail] = useState("");
  const [indivSubject, setIndivSubject] = useState("General Questions");
  const [indivMessage, setIndivMessage] = useState("");

  // States for "Wholesale" form
  const [wholesaleData, setWholesaleData] = useState({
    company: "",
    website: "",
    businessType: "Ecommerce/Online Business",
    firstName: "",
    lastName: "",
    emailAddress: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    message: "",
    agreeToSubscribe: false,
  });

  // Social media links
  const socialLinks = [
    {
      icon: FaFacebookF,
      name: "Facebook",
      url: "https://facebook.com/sunnyislandpepper",
      color: "hover:text-blue-500",
    },
    {
      icon: FaInstagram,
      name: "Instagram",
      url: "https://instagram.com/sunnyislandpepper",
      color: "hover:text-pink-500",
    },
    {
      icon: FaTiktok,
      name: "TikTok",
      url: "https://tiktok.com/@sunnyislandpepper",
      color: "hover:text-gray-900",
    },
    {
      icon: FaYoutube,
      name: "YouTube",
      url: "https://youtube.com/sunnyislandpepper",
      color: "hover:text-red-600",
    },
    {
      icon: FaTwitter,
      name: "X",
      url: "https://x.com/sunnyislandpepper",
      color: "hover:text-sky-400",
    },
  ];

  const handleIndivSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const inquiryBody = {
        email: indivEmail,
        subject: indivSubject,
        message: `
Name: ${indivName}
Contact Info: ${indivEmail}
-------------------------------
${indivMessage}
        `,
      };

      const resp = await fetch("/contact/inquiries/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiryBody),
      });
      const data = await resp.json();
      if (data.success) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
        // Clear fields
        setIndivName("");
        setIndivEmail("");
        setIndivSubject("General Questions");
        setIndivMessage("");
      } else {
        alert(data.error || "Failed to submit inquiry.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message || "Something went wrong.");
      } else {
        alert("Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWholesaleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const {
      company,
      website,
      businessType,
      firstName,
      lastName,
      emailAddress,
      address1,
      address2,
      city,
      state,
      zipCode,
      message,
      agreeToSubscribe,
    } = wholesaleData;

    const finalMsg = `
Wholesale Inquiry
------------------------------
Company: ${company}
Website: ${website}
Type of Business: ${businessType}

Name: ${firstName} ${lastName}
Email: ${emailAddress}
Address 1: ${address1}
Address 2: ${address2}
City: ${city}
State: ${state}
Zip Code: ${zipCode}

Opt-In Marketing: ${agreeToSubscribe ? "Yes" : "No"}

Message:
${message}
    `;

    try {
      const resp = await fetch("/contact/inquiries/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailAddress,
          subject: "Wholesale Request",
          message: finalMsg,
        }),
      });
      const data = await resp.json();
      if (data.success) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
        // Reset the form fields
        setWholesaleData({
          company: "",
          website: "",
          businessType: "Ecommerce/Online Business",
          firstName: "",
          lastName: "",
          emailAddress: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          zipCode: "",
          message: "",
          agreeToSubscribe: false,
        });
      } else {
        alert(data.error || "Failed to submit wholesale inquiry.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message || "Something went wrong.");
      } else {
        alert("Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const cardData = [
    {
      icon: FaQuestionCircle,
      title: "FAQs",
      description: "Find instant answers to common questions",
      action: () => router.push("/contact/FAQs"),
      gradient: "from-purple-600 to-indigo-600",
      hoverGradient: "hover:from-purple-700 hover:to-indigo-700",
    },
    {
      icon: FaEnvelope,
      title: "Direct Contact",
      description: "Email or call us directly",
      gradient: "from-blue-600 to-cyan-600",
      hoverGradient: "hover:from-blue-700 hover:to-cyan-700",
      customAction: true,
    },
    {
      icon: FaShareAlt,
      title: "Social Media",
      description: "Connect with us online",
      gradient: "from-pink-600 to-rose-600",
      hoverGradient: "hover:from-pink-700 hover:to-rose-700",
      customAction: true,
    },
    {
      icon: FaBriefcase,
      title: "Careers",
      description: "Join our growing team",
      action: () => router.push("/contact/careers"),
      gradient: "from-amber-600 to-orange-600",
      hoverGradient: "hover:from-amber-700 hover:to-orange-700",
    },
    {
      icon: FaHeart,
      title: "Support Us",
      description: "Show your love for Sunny Island",
      action: () => router.push("/contact/supportUs"),
      gradient: "from-red-600 to-pink-600",
      hoverGradient: "hover:from-red-700 hover:to-pink-700",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-10 text-orange-400/5"
        >
          <GiChiliPepper className="text-[300px]" />
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Whether you have questions, feedback, or partnership opportunities,
            we're here to help
          </p>
        </motion.div>
      </section>

      {/* Contact Cards Section */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div
                className={`
                absolute inset-0 bg-gradient-to-r ${card.gradient} 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-300 blur-xl
              `}
              />

              <div
                className={`
                relative bg-white dark:bg-gray-800 p-8 
                shadow-lg hover:shadow-2xl transition-all duration-300 
                border border-gray-100 dark:border-gray-700
              `}
              >
                {/* Render custom content for specific cards */}
                {card.title === "Direct Contact" ? (
                  <>
                    <div
                      className={`
                      w-16 h-16 bg-gradient-to-r ${card.gradient} 
                      flex items-center justify-center mb-6
                    `}
                    >
                      <card.icon className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {card.description}
                    </p>
                    <div className="space-y-3">
                      <motion.a
                        href="mailto:info@sunnyislandpepper.com"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          flex items-center justify-center gap-2 px-4 py-3 
                          bg-gradient-to-r ${card.gradient} ${card.hoverGradient}
                          text-white font-semibold transition-all
                        `}
                      >
                        <FiMail />
                        Email Us
                      </motion.a>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 font-semibold text-gray-700 dark:text-gray-300"
                        disabled
                      >
                        <FaPhone className="inline mr-2" />
                        Phone Coming Soon
                      </motion.button>
                    </div>
                  </>
                ) : card.title === "Social Media" ? (
                  <>
                    <div
                      className={`
                      w-16 h-16 bg-gradient-to-r ${card.gradient} 
                      flex items-center justify-center mb-6
                    `}
                    >
                      <card.icon className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Follow @sunnyislandpepper
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {socialLinks.map((social) => (
                        <motion.a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`
                            w-12 h-12 bg-gray-100 dark:bg-gray-700 
                            flex items-center justify-center text-gray-600 dark:text-gray-400
                            hover:bg-gray-200 dark:hover:bg-gray-600 ${social.color}
                            transition-all duration-300
                          `}
                        >
                          <social.icon className="text-lg" />
                        </motion.a>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={`
                      w-16 h-16 bg-gradient-to-r ${card.gradient} 
                      flex items-center justify-center mb-6
                    `}
                    >
                      <card.icon className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {card.description}
                    </p>
                    <motion.button
                      onClick={card.action}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        w-full px-4 py-3 bg-gradient-to-r ${card.gradient} ${card.hoverGradient}
                        text-white font-semibold shadow-lg hover:shadow-xl
                        transition-all duration-300
                      `}
                    >
                      Learn More
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Inquiry Forms Section */}
      <section className="relative py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Premium Tab Navigation */}
            <div className="bg-gray-50 dark:bg-gray-900 p-1">
              <div className="flex relative">
                {["individual", "wholesale"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`
                      flex-1 py-4 px-8 font-semibold text-lg capitalize
                      transition-all duration-300 relative z-10
                      ${
                        activeTab === tab
                          ? "text-white"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                      }
                    `}
                  >
                    {tab === "individual"
                      ? "Individuals & Restaurants"
                      : "Wholesale Partners"}
                  </button>
                ))}

                {/* Sliding Background */}
                <motion.div
                  className="absolute top-1 bottom-1 bg-gradient-to-r from-orange-500 to-red-500"
                  initial={false}
                  animate={{
                    x: activeTab === "individual" ? "0%" : "100%",
                    width: "calc(50% - 4px)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
            </div>

            <div className="p-8 md:p-12">
              {activeTab === "individual" ? (
                // Individual Form
                <motion.form
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleIndivSubmit}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          required
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          value={indivName}
                          onChange={(e) => setIndivName(e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          required
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          value={indivEmail}
                          onChange={(e) => setIndivEmail(e.target.value)}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                      value={indivSubject}
                      onChange={(e) => setIndivSubject(e.target.value)}
                    >
                      <option>General Questions</option>
                      <option>Support Request</option>
                      <option>Events</option>
                      <option>Jobs</option>
                      <option>Partnership</option>
                      <option>Product Idea</option>
                      <option>Support Sunny Island</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <div className="relative">
                      <FiMessageSquare className="absolute left-4 top-4 text-gray-400" />
                      <textarea
                        required
                        rows={5}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                        value={indivMessage}
                        onChange={(e) => setIndivMessage(e.target.value)}
                        placeholder="Tell us how we can help..."
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      w-full md:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 
                      text-white font-semibold shadow-lg hover:shadow-xl 
                      transition-all duration-300 flex items-center justify-center gap-3
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                // Wholesale Form
                <motion.form
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleWholesaleSubmit}
                  className="space-y-6"
                >
                  {/* Company Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <FaBuilding className="text-orange-500" />
                      Company Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          value={wholesaleData.company}
                          onChange={(e) =>
                            setWholesaleData({
                              ...wholesaleData,
                              company: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Website
                        </label>
                        <div className="relative">
                          <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="url"
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            value={wholesaleData.website}
                            onChange={(e) =>
                              setWholesaleData({
                                ...wholesaleData,
                                website: e.target.value,
                              })
                            }
                            placeholder="https://example.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Type of Business *
                      </label>
                      <select
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                        value={wholesaleData.businessType}
                        onChange={(e) =>
                          setWholesaleData({
                            ...wholesaleData,
                            businessType: e.target.value,
                          })
                        }
                      >
                        <option>Ecommerce/Online Business</option>
                        <option>Grocery Store</option>
                        <option>Gift Shop</option>
                        <option>Specialty Shop</option>
                        <option>Distributor</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <FiUser className="text-orange-500" />
                      Contact Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          value={wholesaleData.firstName}
                          onChange={(e) =>
                            setWholesaleData({
                              ...wholesaleData,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          value={wholesaleData.lastName}
                          onChange={(e) =>
                            setWholesaleData({
                              ...wholesaleData,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          required
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          value={wholesaleData.emailAddress}
                          onChange={(e) =>
                            setWholesaleData({
                              ...wholesaleData,
                              emailAddress: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <FaMapMarkerAlt className="text-orange-500" />
                      Address Information
                    </h3>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Address Line 1 *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        value={wholesaleData.address1}
                        onChange={(e) =>
                          setWholesaleData({
                            ...wholesaleData,
                            address1: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        value={wholesaleData.address2}
                        onChange={(e) =>
                          setWholesaleData({
                            ...wholesaleData,
                            address2: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          value={wholesaleData.city}
                          onChange={(e) =>
                            setWholesaleData({
                              ...wholesaleData,
                              city: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          value={wholesaleData.state}
                          onChange={(e) =>
                            setWholesaleData({
                              ...wholesaleData,
                              state: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Zip Code *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          value={wholesaleData.zipCode}
                          onChange={(e) =>
                            setWholesaleData({
                              ...wholesaleData,
                              zipCode: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                      value={wholesaleData.message}
                      onChange={(e) =>
                        setWholesaleData({
                          ...wholesaleData,
                          message: e.target.value,
                        })
                      }
                      placeholder="Tell us about your business and wholesale needs..."
                    />
                  </div>

                  {/* Agreement Checkbox */}
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-1 w-5 h-5 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 focus:ring-2"
                        checked={wholesaleData.agreeToSubscribe}
                        onChange={(e) =>
                          setWholesaleData({
                            ...wholesaleData,
                            agreeToSubscribe: e.target.checked,
                          })
                        }
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        By submitting this wholesale request form, you agree to
                        receive marketing emails from Sunny Island Pepper Sauce
                        if your application is approved. You can unsubscribe at
                        any time.
                      </span>
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      w-full md:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 
                      text-white font-semibold shadow-lg hover:shadow-xl 
                      transition-all duration-300 flex items-center justify-center gap-3
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FiSend />
                        Submit Wholesale Request
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <div className="bg-green-500 text-white px-6 py-4 shadow-2xl flex items-center gap-3">
              <FiCheckCircle className="text-2xl" />
              <div>
                <p className="font-semibold">Success!</p>
                <p className="text-sm">
                  Your message has been sent successfully.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Footer */}
      <footer className="relative bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Spice Things Up?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We typically respond to all inquiries within 24-48 hours. For
              urgent matters, please email us directly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FaMapMarkerAlt className="text-orange-500" />
              <span>Trinidad & Tobago</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FaEnvelope className="text-orange-500" />
              <span>info@sunnyislandpepper.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FaPhone className="text-orange-500" />
              <span>Coming Soon</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Sunny Island Pepper Sauce. All rights
              reserved.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx global>{`
        /* Custom select arrow */
        select {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23f97316' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 1rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
          padding-right: 3rem;
        }

        /* Custom checkbox */
        input[type="checkbox"]:checked {
          background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Premium focus styles */
        input:focus,
        textarea:focus,
        select:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(251, 146, 60, 0.1);
        }

        /* Dark mode adjustments */
        @media (prefers-color-scheme: dark) {
          select {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fb923c' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          }
        }
      `}</style>
    </main>
  );
}
