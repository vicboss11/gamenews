// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  trailingComma: 'all',
  singleQuote: true,
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
