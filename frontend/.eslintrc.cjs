/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")
module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
    "plugin:storybook/recommended"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/no-multiple-template-root": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off"
  }
}
