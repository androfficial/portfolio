export default {
  printWidth: 120,
  singleQuote: true,
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/styles/global.css',
  tailwindAttributes: ['class:list'],
  overrides: [{ files: '*.astro', options: { parser: 'astro' } }],
};
