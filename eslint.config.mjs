import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Import Next.js + TypeScript recommended configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // JavaScript-only overrides
  {
    files: ["**/*.js", "**/*.jsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // Disable TS rules for JS
      "@typescript-eslint/no-empty-interface": "off", // Not needed for JS
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },

  // TypeScript-only overrides
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Allow an interface that only extends another interface (no new properties)
      "@typescript-eslint/no-empty-interface": [
        "error",
        { allowSingleExtends: true },
      ],
      // Add other TS-specific rules here if desired
    },
  },
];

export default eslintConfig;
