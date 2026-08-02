"use client";

import Head from "next/head";
import { useEffect, useState } from "react";

const tocItems = [
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "use", title: "Use of the Site" },
  { id: "account", title: "Account Registration & Security" },
  { id: "userContent", title: "User-Submitted Content & Recipe Submissions" },
  { id: "ip", title: "Intellectual Property Rights" },
  { id: "sponsorship", title: "Recipe Sponsorship & Promotion" },
  { id: "conduct", title: "User Conduct & Prohibited Activities" },
  { id: "thirdparty", title: "Third-Party Links & Content" },
  { id: "disclaimers", title: "Disclaimers" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "indemnification", title: "Indemnification" },
  { id: "governing", title: "Governing Law & Jurisdiction" },
  { id: "termination", title: "Termination" },
  { id: "modifications", title: "Modifications" },
  { id: "contact", title: "Contact Information" },
];

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState("acceptance");

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
        <title>Terms of Service - Sunny Island Pepper Sauce</title>
        <meta
          name="description"
          content="Read the Sunny Island Pepper Sauce Terms of Service to learn the rules governing your use of our website."
        />
      </Head>
      {/* Outer container with increased top padding */}
      <div className="ml-7 relative pt-20 pb-20 md:pb-40">
        <div className="flex flex-col md:flex-row">
          {/* Desktop TOC – sticky within the container */}
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
          {/* Terms Content – shifted to the right */}
          <article className="mt-8 md:ml-10 md:w-3/4 pl-4 space-y-4 p-10 md:p-20">
            <header className="mb-4 md:ml-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-1">
                Sunny Island Pepper Sauce Terms of Service
              </h1>
              <p className="text-sm md:text-base">
                Spice up your culinary journey with Sunny Island Pepper Sauce –
                please read these Terms carefully.
              </p>
            </header>
            <section id="acceptance">
              <h2 className="text-2xl font-bold mb-2">
                1. Acceptance of Terms
              </h2>
              <p className="text-xs md:text-base">
                By accessing or using the Sunny Island Pepper Sauce website (the
                “Site”), you agree to be bound by these Terms of Service
                (“Terms”). If you do not agree to these Terms, please refrain
                from using the Site.
              </p>
            </section>
            <section id="use">
              <h2 className="text-2xl font-bold mb-2">2. Use of the Site</h2>
              <p className="text-xs md:text-base">
                You agree to use our Site only for lawful purposes and in a
                manner that does not infringe on the rights of others.
                Unauthorized activities such as hacking, reverse-engineering, or
                modifying any content are strictly prohibited.
              </p>
            </section>
            <section id="account">
              <h2 className="text-2xl font-bold mb-2">
                3. Account Registration & Security
              </h2>
              <p className="text-xs md:text-base">
                To access certain features—including rating recipes, favoriting
                items, submitting recipes, and making purchases—you must create
                an account. You agree to provide accurate and complete
                information during registration, maintain the confidentiality of
                your account credentials, and accept responsibility for all
                activities under your account.
              </p>
            </section>
            <section id="userContent">
              <h2 className="text-2xl font-bold mb-2">
                4. User-Submitted Content & Recipe Submissions
              </h2>
              <p className="text-xs md:text-base">
                When you submit content (including recipes, reviews, photos,
                etc.) to our Site, you grant Sunny Island Pepper Sauce a
                perpetual, royalty‑free license to use, reproduce, modify,
                display, and distribute that content. You represent that you own
                the submitted content and that its use will not infringe on any
                third‑party rights.
              </p>
            </section>
            <section id="ip">
              <h2 className="text-2xl font-bold mb-2">
                5. Intellectual Property Rights
              </h2>
              <p className="text-xs md:text-base">
                All content on the Site—including text, images, graphics, logos,
                and software—is the property of Sunny Island Pepper Sauce or its
                licensors and is protected by applicable intellectual property
                laws. You are granted a limited license to use the Site for
                personal, non‑commercial purposes only.
              </p>
            </section>
            <section id="sponsorship">
              <h2 className="text-2xl font-bold mb-2">
                6. Recipe Sponsorship & Promotion
              </h2>
              <p className="text-xs md:text-base">
                Our Site features “Established Recipes” provided by our
                partners. We also offer a “Sunny Island Original Recipes” tab
                (coming soon) for user‑submitted recipes. By submitting a
                recipe, you agree to our Recipe Sponsorship Guidelines and grant
                us permission to use your submission. If your recipe is used,
                you will be credited accordingly.
              </p>
            </section>
            <section id="conduct">
              <h2 className="text-2xl font-bold mb-2">
                7. User Conduct & Prohibited Activities
              </h2>
              <p className="text-xs md:text-base">
                You agree not to engage in any behavior that could harm the Site
                or interfere with its use by others. Prohibited activities
                include spamming, posting offensive content, and infringing
                intellectual property rights.
              </p>
            </section>
            <section id="thirdparty">
              <h2 className="text-2xl font-bold mb-2">
                8. Third-Party Links & Content
              </h2>
              <p className="text-xs md:text-base">
                Our Site may contain links to third‑party websites or resources.
                These links are provided solely for your convenience; Sunny
                Island Pepper Sauce does not endorse and is not responsible for
                their content or privacy practices.
              </p>
            </section>
            <section id="disclaimers">
              <h2 className="text-2xl font-bold mb-2">9. Disclaimers</h2>
              <p className="text-xs md:text-base">
                The Site is provided “as is” and “as available,” without any
                warranties, express or implied. Sunny Island Pepper Sauce does
                not guarantee that the Site will be uninterrupted, error‑free,
                or secure. You assume all risks associated with your use of the
                Site.
              </p>
            </section>
            <section id="liability">
              <h2 className="text-2xl font-bold mb-2">
                10. Limitation of Liability
              </h2>
              <p className="text-xs md:text-base">
                In no event shall Sunny Island Pepper Sauce, its affiliates,
                officers, directors, employees, or agents be liable for any
                indirect, incidental, consequential, or special damages arising
                out of or in connection with your use of the Site. Our total
                liability shall not exceed any fees paid by you to access the
                Site.
              </p>
            </section>
            <section id="indemnification">
              <h2 className="text-2xl font-bold mb-2">11. Indemnification</h2>
              <p className="text-xs md:text-base">
                You agree to indemnify and hold harmless Sunny Island Pepper
                Sauce, its affiliates, and its representatives from any claims,
                damages, or expenses (including reasonable attorneys’ fees)
                arising from your use of the Site or your violation of these
                Terms.
              </p>
            </section>
            <section id="governing">
              <h2 className="text-2xl font-bold mb-2">
                12. Governing Law & Jurisdiction
              </h2>
              <p className="text-xs md:text-base">
                These Terms shall be governed by and construed in accordance
                with the laws of the State of Florida, without regard to its
                conflict-of-law provisions. Any disputes arising under these
                Terms shall be resolved exclusively in the state or federal
                courts located in Florida.
              </p>
            </section>
            <section id="termination">
              <h2 className="text-2xl font-bold mb-2">13. Termination</h2>
              <p className="text-xs md:text-base">
                Sunny Island Pepper Sauce reserves the right to suspend or
                terminate your access to the Site at any time if you violate
                these Terms. Upon termination, you must immediately cease using
                the Site and destroy any materials obtained from it.
              </p>
            </section>
            <section id="modifications">
              <h2 className="text-2xl font-bold mb-2">
                14. Modifications to These Terms
              </h2>
              <p className="text-xs md:text-base">
                We reserve the right to modify these Terms at any time. Changes
                will be posted on this page with an updated effective date. Your
                continued use of the Site constitutes acceptance of the revised
                Terms.
              </p>
            </section>
            <section id="contact">
              <h2 className="text-2xl font-bold mb-2">
                15. Contact Information
              </h2>
              <p className="text-xs md:text-base">
                If you have any questions or concerns regarding these Terms,
                please contact us at:
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
          </article>
        </div>
      </div>
    </>
  );
}
