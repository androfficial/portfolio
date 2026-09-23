import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.SITE_URL ?? 'https://androfficial.github.io';
const base = process.env.BASE_PATH ?? '/portfolio';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
  integrations: [sitemap()],
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Unbounded',
      cssVariable: '--font-unbounded',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/unbounded-latin.woff2'],
            weight: '300 900',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Manrope',
      cssVariable: '--font-manrope',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/manrope-latin.woff2'],
            weight: '200 800',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
  ],
  vite: { plugins: [tailwindcss()] },
});
