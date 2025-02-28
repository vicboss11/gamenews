import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';
import vercel from '@astrojs/vercel/serverless';
dotenv.config();

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  vite: {
    define: {
      'process.env': process.env,
    },
  },
  site: 'https://gamenewshub.es',
  integrations: [
    react(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    sitemap(),
  ],
});
