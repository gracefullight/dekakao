module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:import/recommended",
    "plugin:prettier/recommended",
  ],
  settings: {
    "import/resolver": {
      typescript: {},
    },
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
  },
};
