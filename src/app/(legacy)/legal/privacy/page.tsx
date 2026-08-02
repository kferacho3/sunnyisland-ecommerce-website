"use client";

import Head from "next/head";
import { useEffect, useState } from "react";

const tocItems = [
  { id: "introduction", title: "Introduction" },
  { id: "information", title: "Information We Collect" },
  { id: "usage", title: "How We Use Your Information" },
  { id: "ecommerce", title: "Data Collection for E-Commerce" },
  { id: "cookies", title: "Cookies and Tracking Technologies" },
  { id: "security", title: "Data Security" },
  { id: "retention", title: "Data Retention" },
  { id: "rights", title: "Your Rights" },
  { id: "sharing", title: "Sharing of Your Information" },
  { id: "thirdparty", title: "Third-Party Links and Services" },
  { id: "children", title: "Children’s Privacy" },
  { id: "changes", title: "Changes to This Privacy Policy" },
  { id: "international", title: "International Data Transfers" },
  { id: "contact", title: "Contact Information" },
  { id: "sponsorship", title: "Recipe Sponsorship & User-Submitted Content" },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      tocItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(item.id);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Privacy Policy - Sunny Island Pepper Sauce</title>
        <meta
          name="description"
          content="Read the Sunny Island Pepper Sauce Privacy Policy to learn how we collect, use, and protect your data."
        />
      </Head>
      {/* Outer container with increased top padding */}
      <div className="ml-7 relative pt-20 pb-80 md:pb-40">
        <div className="flex flex-col md:flex-row">
          {/* Desktop TOC – sticky within the parent container */}
          <nav
            className="hidden md:block sticky top-32 w-64 pr-6 border-r border-gray-300 max-h-[calc(100vh-120px)] overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="bg-white dark:bg-gray-900 p-4 shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-primary uppercase">
                Contents
              </h2>
              <ul className="space-y-1">
                {tocItems.map((item, idx) => (
                  <li
                    key={item.id}
                    className="py-1 border-b border-gray-200 last:border-0"
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const target = document.getElementById(item.id);
                        if (target) {
                          target.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }
                      }}
                      className={`block text-[10px] uppercase font-bold transition-colors duration-200 hover:text-secondary ${
                        activeSection === item.id
                          ? "text-secondary"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {idx + 1}. {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          {/* Mobile TOC – fixed at bottom, 15% of viewport height with horizontal scrolling */}
          <nav className="md:hidden">
            <div
              className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 p-4 rounded-t-lg shadow-xl z-50 overflow-x-auto"
              style={{ height: "15vh" }}
            >
              <h2 className="text-xl font-bold mb-2 text-primary uppercase text-center">
                Contents
              </h2>
              <ul className="flex gap-2 whitespace-nowrap">
                {tocItems.map((item, idx) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const target = document.getElementById(item.id);
                        if (target) {
                          target.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }
                      }}
                      className={`text-[10px] uppercase font-bold transition-colors duration-200 hover:text-secondary ${
                        activeSection === item.id
                          ? "text-secondary"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {idx + 1}. {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          {/* Privacy Policy Content – shifted to the right */}
          <article className="mt-8 md:ml-6 md:w-3/4 pl-4 space-y-4 p-10 md:p-20">
            <header className="mb-8 md:ml-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Sunny Island Pepper Sauce Privacy Policy
              </h1>
              <p className="text-sm md:text-base">
                Spice up any recipe below with Sunny Island Pepper Sauce.
              </p>
            </header>
            <section id="introduction">
              <h2 className="text-2xl font-bold mb-2">1. Introduction</h2>
              <p className="text-xs md:text-base">
                Sunny Island Pepper Sauce (“we”, “us”, “our”) is committed to
                protecting your privacy. This Privacy Policy explains how we
                collect, use, store, and share your personal information when
                you visit our website, create an account, or purchase our
                products online. By using our website, you consent to the
                practices described in this policy.
              </p>
            </section>
            <section id="information">
              <h2 className="text-2xl font-bold mb-2">
                2. Information We Collect
              </h2>
              <p className="text-xs md:text-base">
                We collect only the personal data necessary to operate our
                e‑commerce platform and enhance your experience. This includes:
              </p>
              <ul className="list-disc list-inside text-xs md:text-base">
                <li>
                  <strong>Account Information:</strong> Your name, email,
                  password, and phone number (provided during registration).
                </li>
                <li>
                  <strong>Shipping and Billing Information:</strong> Postal
                  address, city, state, zip code, and payment details.
                </li>
                <li>
                  <strong>Usage Data:</strong> Automatically collected data such
                  as your IP address, browser type, device information, and your
                  website interactions.
                </li>
                <li>
                  <strong>Cookie Data:</strong> Data collected via cookies and
                  similar technologies to enhance your browsing experience.
                </li>
              </ul>
            </section>
            <section id="usage">
              <h2 className="text-2xl font-bold mb-2">
                3. How We Use Your Information
              </h2>
              <p className="text-xs md:text-base">
                We use your information to:
              </p>
              <ul className="list-disc list-inside text-xs md:text-base">
                <li>Create and manage your account.</li>
                <li>Process and fulfill orders.</li>
                <li>
                  Communicate with you regarding orders, promotions, and
                  updates.
                </li>
                <li>
                  Personalize your shopping experience and improve website
                  functionality.
                </li>
                <li>
                  Conduct internal analytics and marketing to showcase our
                  products (including our signature Sunny Island Pepper Sauce)
                  at their best.
                </li>
              </ul>
            </section>
            <section id="ecommerce">
              <h2 className="text-2xl font-bold mb-2">
                4. Data Collection for E-Commerce
              </h2>
              <p className="text-xs md:text-base">
                We use industry‑standard practices to collect, process, and
                store transaction information solely for order processing,
                shipping, and customer support. Payment data is handled securely
                by our third‑party partners.
              </p>
            </section>
            <section id="cookies">
              <h2 className="text-2xl font-bold mb-2">
                5. Cookies and Tracking Technologies
              </h2>
              <p className="text-xs md:text-base">
                Our website uses cookies and similar technologies to personalize
                your experience, save your login information, and track your
                browsing activity. You may disable cookies via your browser
                settings; however, this may affect certain features.
              </p>
            </section>
            <section id="security">
              <h2 className="text-2xl font-bold mb-2">6. Data Security</h2>
              <p className="text-xs md:text-base">
                We implement reasonable technical, administrative, and physical
                safeguards to protect your personal information. While no method
                is 100% secure, we take steps to minimize unauthorized access.
              </p>
            </section>
            <section id="retention">
              <h2 className="text-2xl font-bold mb-2">7. Data Retention</h2>
              <p className="text-xs md:text-base">
                Your personal information is retained only as long as necessary
                to fulfill its collection purpose, comply with legal
                obligations, and resolve disputes. Account deletion removes your
                account details from our active database, although some
                historical data may be archived.
              </p>
            </section>
            <section id="rights">
              <h2 className="text-2xl font-bold mb-2">8. Your Rights</h2>
              <p className="text-xs md:text-base">
                Depending on your jurisdiction, you may have the right to
                access, update, correct, or request deletion of your personal
                data, as well as opt out of marketing communications. For any
                such requests, please contact us using the information provided
                in the Contact Information section.
              </p>
            </section>
            <section id="sharing">
              <h2 className="text-2xl font-bold mb-2">
                9. Sharing of Your Information
              </h2>
              <p className="text-xs md:text-base">
                We do not sell your personal information. We may share your data
                only with trusted third‑party service providers (such as payment
                processors and shipping companies) who are contractually
                obligated to protect your data.
              </p>
            </section>
            <section id="thirdparty">
              <h2 className="text-2xl font-bold mb-2">
                10. Third-Party Links and Services
              </h2>
              <p className="text-xs md:text-base">
                Our website may include links to third‑party websites and
                services. We are not responsible for their privacy practices;
                please review their policies before providing any personal
                information.
              </p>
            </section>
            <section id="children">
              <h2 className="text-2xl font-bold mb-2">
                11. Children’s Privacy
              </h2>
              <p className="text-xs md:text-base">
                Our website is not intended for children under the age of 13. We
                do not knowingly collect personal information from children
                under 13 without parental consent. If you believe we have
                inadvertently collected such data, please contact us
                immediately.
              </p>
            </section>
            <section id="changes">
              <h2 className="text-2xl font-bold mb-2">
                12. Changes to This Privacy Policy
              </h2>
              <p className="text-xs md:text-base">
                We may update this Privacy Policy from time to time. The updated
                version will be posted on our site with a new effective date. We
                encourage you to review this policy periodically.
              </p>
            </section>
            <section id="international">
              <h2 className="text-2xl font-bold mb-2">
                13. International Data Transfers
              </h2>
              <p className="text-xs md:text-base">
                If you access our website from outside the United States, your
                data may be transferred to, stored, and processed in the United
                States where data protection laws may differ from those in your
                country.
              </p>
            </section>
            <section id="contact">
              <h2 className="text-2xl font-bold mb-2">
                14. Contact Information
              </h2>
              <p className="text-xs md:text-base">
                For any questions or requests regarding this Privacy Policy or
                your personal data, please contact us at:
              </p>
              <ul className="list-disc list-inside text-xs md:text-base">
                <li>
                  <strong>Email:</strong> support@sunnyislandpeppersauce.com
                </li>
                <li>
                  <strong>Address:</strong> Sunny Island Pepper Sauce, 4072 NE
                  5th Terrace, Oakland Park, Florida, 33319
                </li>
                <li>
                  <strong>Phone:</strong> [Insert Phone Number]
                </li>
              </ul>
            </section>
            <section id="sponsorship">
              <h2 className="text-2xl font-bold mb-2">
                15. Recipe Sponsorship & User-Submitted Content
              </h2>
              <p className="text-xs md:text-base">
                We love to see how you spice up your recipes with Sunny Island
                Pepper Sauce! Our site features “Established Recipes” from our
                partners, and our “Sunny Island Original Recipes” tab (coming
                soon) will showcase user‑submitted recipes. If you have a
                culturally inspiring dish featuring our pepper sauce, please
                consider submitting your recipe.
              </p>
              <ul className="list-disc list-inside text-xs md:text-base">
                <li>
                  Ensure your dish prominently features Sunny Island Pepper
                  Sauce.
                </li>
                <li>Use a non‑black table for your photo background.</li>
                <li>Photos must be clear and pass our quality check.</li>
                <li>Keep your dish culturally authentic and creative!</li>
              </ul>
              <p className="text-xs md:text-base mt-4">
                To submit your recipe, please use the “Submit Your Recipe”
                button on our website. Once approved, we’ll feature your recipe
                and credit you accordingly.
              </p>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
