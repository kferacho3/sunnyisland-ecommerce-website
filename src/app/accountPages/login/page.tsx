// src/app/(accountPages)/login/page.tsx
"use client";

import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: integrate real backend or NextAuth here
    console.log("Logging in...");
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 bg-white dark:bg-black dark:text-white">
      <div className="max-w-md w-full">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-4">
          Welcome to Sunny Island!
        </h1>
        <p className="text-center mb-8 text-sm sm:text-base">
          Login below
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <FormInput
            label="Email Address"
            type="email"
            name="email"
            required
            placeholder="Enter your email"
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            required
            placeholder="Enter your password"
          />

          <Button type="submit" className="w-full">
            Log In
          </Button>
        </form>

        <div className="mt-4 flex justify-between text-xs sm:text-sm">
          <Link href="#" className="underline hover:text-secondary">
            Forgot Your Password?
          </Link>
          <Link
            href="/accountPages/register"
            className="underline hover:text-secondary"
          >
            Don&apos;t have an account? Create Account
          </Link>
        </div>
      </div>
    </section>
  );
}
