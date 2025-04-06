"use client";

import { useEffect } from "react";

const SHOPIFY_LOGIN_URL =
  "https://sunnyislandpepper.myshopify.com/account/login";

export default function LoginPage() {
  useEffect(() => {
    window.location.href = SHOPIFY_LOGIN_URL;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black dark:text-white">
      <p>Redirecting to Shopify login...</p>
    </div>
  );
}
