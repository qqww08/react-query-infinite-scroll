module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "eslint-plugin-prettier"],
  extends: [
    "turbo",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier",
    "prettier",
  ],
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    "prettier/prettier": ["error", { tabWidth: 2 }],
  },
};
