// src/components/home/SectionNewsletter.tsx
import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import React from "react";

export default function SectionNewsletter() {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Connect to a backend or email marketing service
    console.log("Subscribing to newsletter...");
  };

  return (
    <section
      id="section-newsletter"
      className="p-4 sm:p-8 bg-white dark:bg-black dark:text-white"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-center">
          STAY IN THE LOOP!
        </h2>
        <p className="text-sm sm:text-base mb-6 text-center">
          Sign up for our newsletter to be the first to know about everything
          hot, spicy, and delicious from Sunny Island Pepper Sauce.
        </p>

        <form onSubmit={handleSubscribe} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput label="First Name" name="firstName" required />
            <FormInput label="Last Name" name="lastName" required />
          </div>
          <FormInput label="Email Address" type="email" name="email" required />

          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
            By entering your name and email address and submitting this form,
            you consent to receive marketing communications from Sunny Island
            Pepper Sauce at the email provided. You can unsubscribe at any time
            using the “unsubscribe” link in our emails. View our
            <a
              href="#"
              className="underline ml-1 hover:text-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            .
          </p>

          <Button className="mt-4 w-full sm:w-auto">Subscribe</Button>
        </form>
      </div>
    </section>
  );
}
