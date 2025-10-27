import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import prettierConfig from "eslint-config-prettier"; // 1. Import Prettier config

export default defineConfig([
  // Existing JavaScript configuration
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  // 2. Add Prettier config LAST to turn off conflicting formatting rules
  prettierConfig,
]);