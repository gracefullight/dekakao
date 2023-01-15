module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
