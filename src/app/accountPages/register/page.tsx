// In src/app/(accountPages)/register/page.tsx
"use client";

import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import Link from "next/link";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function RegisterPage() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      captchaToken,
    };

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log(result);
    // Handle success, errors, and then prompt user for the 6-digit code (you could show a modal or redirect to a verification page)
  };

  // Social sign-up handlers can now trigger NextAuth signIn calls (e.g., signIn("google"))
  const handleGoogleSignup = () => {
    console.log("Sign up with Google");
    // e.g., signIn("google")
  };

  // ... similar for Facebook, Apple, and phone

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 bg-white dark:bg-black dark:text-white">
      <div className="max-w-md w-full">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-4">
          Welcome to Sunny Island!
        </h1>
        <p className="text-center mb-8 text-sm sm:text-base">
          Create An Account
        </p>

        {/* Social / External Sign-up Options */}
        <div className="flex flex-col gap-2 mb-6">
          <button
            onClick={handleGoogleSignup}
            className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
          >
            Sign up with Google
          </button>
          {/* Additional social buttons... */}
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <FormInput label="First Name" type="text" name="firstName" required />
          <FormInput label="Last Name" type="text" name="lastName" required />
          <FormInput label="Email Address" type="email" name="email" required />
          <FormInput
            label="Password"
            type="password"
            name="password"
            required
          />
          <FormInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            required
          />

          {/* reCAPTCHA widget */}
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={(token) => setCaptchaToken(token)}
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="offers"
              id="offers"
              className="h-4 w-4 accent-secondary"
            />
            <label htmlFor="offers" className="text-sm">
              Keep me up to date with special offers and promotions
            </label>
          </div>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          <Link
            href="/accountPages/login"
            className="underline hover:text-secondary"
          >
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </section>
  );
}
