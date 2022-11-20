module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb/base",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
