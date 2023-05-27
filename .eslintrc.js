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
  settings: {
    "import/resolver": {
      typescript: {},
    },
    "import/order": [
      "warn",
      {
        alphabetize: { order: "asc" },
        "newlines-between": "always",
        groups: ["builtin", "external", "index", "sibling", "parent"],
      },
    ],
  },
};
