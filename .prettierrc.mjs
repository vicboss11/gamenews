// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  trailingComma: "es5",
  singleQuote: true,
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
