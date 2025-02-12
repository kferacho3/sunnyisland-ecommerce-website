// eslint.config.mjs
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const prettierPlugin = require("eslint-plugin-prettier");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const reactPlugin = require("eslint-plugin-react");

export default [
  // Global ignores: these patterns are applied to every file.
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**"]
  },
  // Your main configuration for source files.
  {
    files: [
      "src/**/*.{js,jsx,ts,tsx}",
      "app/**/*.{js,jsx,ts,tsx}",
      "next.config.{js,ts}"
    ],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      prettier: prettierPlugin,
      "@typescript-eslint": tsPlugin,
      react: reactPlugin
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-namespace": ["error", { allowDeclarations: true }],
      "react/no-unknown-property": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^(?:__turbopack.*|global|__dirname)$"
        }
      ]
    }
  }
];
