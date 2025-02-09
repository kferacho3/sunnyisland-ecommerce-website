"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

// React Icons for social bullet points
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function InquiriesPage() {
  const router = useRouter();

  // The UI can swap between two tabs: "Individual" or "Wholesale"
  const [activeTab, setActiveTab] = useState<"individual" | "wholesale">("individual");

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

  /**
   * Handle the "Individuals/Restaurants" form submission
   */
  const handleIndivSubmit = async (e: FormEvent) => {
    e.preventDefault();

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
        alert("Inquiry submitted successfully!");
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
    }
  };

  /**
   * Handle the "Wholesale" form submission
   */
  const handleWholesaleSubmit = async (e: FormEvent) => {
    e.preventDefault();

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
        alert("Wholesale inquiry submitted successfully!");
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
    }
  };

  return (
    <main className="pt-[100px] min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* ================== Hero Section + 5 Cards ================== */}
      <section className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-center mb-6 uppercase">
          Contact Us
        </h1>
        <p className="text-center text-sm md:text-base mb-8">
          Got a question, concern, or just want to chat with someone who loves
          ranch (and pepper sauce) as much as you do?
        </p>

        {/* =========== Card Grid =========== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. FAQ Card */}
          <div
            onClick={() => router.push("/contact/FAQs")}
            className="
              cursor-pointer bg-black bg-opacity-40 rounded-lg shadow-lg p-4 flex flex-col items-center
              border border-transparent transition-all 
              hover:scale-105 hover:border-2 hover:border-pink-500
            "
          >
            <Image
              src="/icons/faq.png" 
              // 30x30 placeholder image
              alt="FAQ Icon"
              width={30}
              height={30}
              className="mb-3"
            />
            <h2 className="font-bold text-xl mb-2">Frequently Asked Questions</h2>
            <p className="text-center text-sm flex-grow">
              Find answers to most of your questions here.
            </p>
            <button className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white">
              Go to FAQs
            </button>
          </div>

          {/* 2. Email & Phone Card */}
          <div
            className="
              bg-black bg-opacity-40 rounded-lg shadow-lg p-4 flex flex-col items-center
              border border-transparent transition-all 
              hover:scale-105 hover:border-2 hover:border-pink-500
            "
          >
            <Image
              src="/icons/contact.png"
              // 30x30 placeholder
              alt="Contact Icon"
              width={30}
              height={30}
              className="mb-3"
            />
            <h2 className="text-xl font-bold mb-2">Email &amp; Phone</h2>
            <p className="text-center text-sm flex-grow">
              Reach us directly via email or phone.
            </p>
            <div className="mt-2 flex flex-col gap-2">
              <button
                onClick={() => window.location.href = "mailto:sunnyislandpepper@gmail.com"}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white"
              >
                Send Email
              </button>
              <button
                onClick={() => window.location.href = "tel:877-853-7262"}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white"
              >
                (877) 853-7262
              </button>
            </div>
          </div>

          {/* 3. Social Media Card */}
          <div
            className="
              bg-black bg-opacity-40 rounded-lg shadow-lg p-4 flex flex-col items-center
              border border-transparent transition-all 
              hover:scale-105 hover:border-2 hover:border-pink-500
            "
          >
            <Image
              src="/icons/social.png"
              // 30x30 placeholder
              alt="Social Icon"
              width={30}
              height={30}
              className="mb-3"
            />
            <h2 className="text-xl font-bold mb-2">Social Media</h2>
            <p className="text-center text-sm mb-3">
              Follow <strong>@sunnypepperisland</strong> on:
            </p>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2">
                <FaFacebookF /> Facebook
              </li>
              <li className="flex items-center gap-2">
                <FaInstagram /> Instagram
              </li>
              <li className="flex items-center gap-2">
                <FaTiktok /> TikTok
              </li>
              <li className="flex items-center gap-2">
                <FaYoutube /> YouTube
              </li>
              <li className="flex items-center gap-2">
                <FaTwitter /> X
              </li>
            </ul>
          </div>

          {/* 4. Careers Card */}
          <div
            onClick={() => router.push("/contact/careers")}
            className="
              cursor-pointer bg-black bg-opacity-40 rounded-lg shadow-lg p-4 flex flex-col items-center
              border border-transparent transition-all 
              hover:scale-105 hover:border-2 hover:border-pink-500
            "
          >
            <Image
              src="/icons/careers.png"
              // 30x30 placeholder
              alt="Careers Icon"
              width={30}
              height={30}
              className="mb-3"
            />
            <h2 className="text-xl font-bold mb-2">Careers</h2>
            <p className="text-center text-sm flex-grow">
              Want to join our team? Explore the possibilities.
            </p>
            <button className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white">
              View Openings
            </button>
          </div>

          {/* 5. Support Us Card */}
          <div
            onClick={() => router.push("/contact/supportUs")}
            className="
              cursor-pointer bg-black bg-opacity-40 rounded-lg shadow-lg p-4 flex flex-col items-center
              border border-transparent transition-all 
              hover:scale-105 hover:border-2 hover:border-pink-500
            "
          >
            <Image
              src="/icons/heart.png"
              // 30x30 placeholder heart icon
              alt="Support Icon"
              width={30}
              height={30}
              className="mb-3"
            />
            <h2 className="text-xl font-bold mb-2">Support Us</h2>
            <p className="text-center text-sm flex-grow">
              Love our pepper sauce? See how you can support Sunny Island.
            </p>
            <button className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ================== Inquiry Forms ================== */}
      <section
        id="form-section"
        className="max-w-5xl mx-auto p-4 mt-10 bg-black bg-opacity-30 rounded-lg shadow-lg"
      >
        {/* Tab Switcher */}
        <div className="flex gap-4 mb-6 border-b border-gray-500">
          <button
            className={`pb-2 ${
              activeTab === "individual"
                ? "border-b-2 border-indigo-600 text-indigo-300"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("individual")}
          >
            Individuals / Restaurants
          </button>
          <button
            className={`pb-2 ${
              activeTab === "wholesale"
                ? "border-b-2 border-indigo-600 text-indigo-300"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("wholesale")}
          >
            Wholesalers
          </button>
        </div>

        {activeTab === "individual" ? (
          // =================== INDIVIDUAL FORM ===================
          <form onSubmit={handleIndivSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">Full Name</label>
              <input
                type="text"
                required
                className="w-full p-2 rounded bg-gray-800 text-white"
                value={indivName}
                onChange={(e) => setIndivName(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Contact (Email)</label>
              <input
                type="email"
                required
                className="w-full p-2 rounded bg-gray-800 text-white"
                value={indivEmail}
                onChange={(e) => setIndivEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Subject</label>
              <select
                required
                className="w-full p-2 rounded bg-gray-800 text-white"
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
              <label className="block mb-1 text-sm">Message</label>
              <textarea
                required
                rows={4}
                className="w-full p-2 rounded bg-gray-800 text-white"
                value={indivMessage}
                onChange={(e) => setIndivMessage(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white"
            >
              Submit
            </button>
          </form>
        ) : (
          // =================== WHOLESALE FORM ===================
          <form onSubmit={handleWholesaleSubmit} className="space-y-4">
            {/* Company & Website */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block mb-1 text-sm">Company*</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  value={wholesaleData.company}
                  onChange={(e) =>
                    setWholesaleData({ ...wholesaleData, company: e.target.value })
                  }
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 text-sm">Website</label>
                <input
                  type="url"
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  value={wholesaleData.website}
                  onChange={(e) =>
                    setWholesaleData({ ...wholesaleData, website: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Business Type */}
            <div>
              <label className="block mb-1 text-sm">Type of Business*</label>
              <select
                required
                className="w-full p-2 rounded bg-gray-800 text-white"
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

            {/* First & Last Name */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block mb-1 text-sm">First Name*</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  value={wholesaleData.firstName}
                  onChange={(e) =>
                    setWholesaleData({
                      ...wholesaleData,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 text-sm">Last Name*</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 rounded bg-gray-800 text-white"
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

            {/* Email Address */}
            <div>
              <label className="block mb-1 text-sm">Email Address*</label>
              <input
                type="email"
                required
                className="w-full p-2 rounded bg-gray-800 text-white"
                value={wholesaleData.emailAddress}
                onChange={(e) =>
                  setWholesaleData({
                    ...wholesaleData,
                    emailAddress: e.target.value,
                  })
                }
              />
            </div>

            {/* Address Fields */}
            <div>
              <label className="block mb-1 text-sm">Address 1*</label>
              <input
                type="text"
                required
                className="w-full p-2 rounded bg-gray-800 text-white"
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
              <label className="block mb-1 text-sm">Address 2</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-800 text-white"
                value={wholesaleData.address2}
                onChange={(e) =>
                  setWholesaleData({
                    ...wholesaleData,
                    address2: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block mb-1 text-sm">City*</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  value={wholesaleData.city}
                  onChange={(e) =>
                    setWholesaleData({
                      ...wholesaleData,
                      city: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 text-sm">State*</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  value={wholesaleData.state}
                  onChange={(e) =>
                    setWholesaleData({
                      ...wholesaleData,
                      state: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 text-sm">Zip Code*</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 rounded bg-gray-800 text-white"
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

            {/* Message */}
            <div>
              <label className="block mb-1 text-sm">Message*</label>
              <textarea
                required
                rows={4}
                className="w-full p-2 rounded bg-gray-800 text-white"
                value={wholesaleData.message}
                onChange={(e) =>
                  setWholesaleData({ ...wholesaleData, message: e.target.value })
                }
              />
            </div>

            {/* Agreement */}
            <div className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                id="agreeToSubscribe"
                checked={wholesaleData.agreeToSubscribe}
                onChange={(e) =>
                  setWholesaleData({
                    ...wholesaleData,
                    agreeToSubscribe: e.target.checked,
                  })
                }
              />
              <label htmlFor="agreeToSubscribe">
                By submitting this wholesale request form, you agree to receive
                marketing emails if approved.
              </label>
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white"
            >
              Submit Wholesale Request
            </button>
          </form>
        )}
      </section>

      {/* ================== Footer ================== */}
      <footer className="text-center text-sm text-gray-400 py-8">
        <p>© 2025 Sunny Island Pepper Sauce. All rights reserved.</p>
      </footer>
    </main>
  );
}
