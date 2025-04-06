"use client";

import { useEffect } from "react";

const SHOPIFY_REGISTER_URL =
  "https://sunnyislandpepper.myshopify.com/account/register";

export default function RegisterPage() {
  useEffect(() => {
    window.location.href = SHOPIFY_REGISTER_URL;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black dark:text-white">
      <p>Redirecting to Shopify register...</p>
    </div>
  );
}
