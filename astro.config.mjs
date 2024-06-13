import cloudflare from '@astrojs/cloudflare';
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';

dotenv.config();

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  vite: {
    define: {
      'process.env': process.env,
    },
  },
});
