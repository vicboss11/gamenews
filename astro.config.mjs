import cloudflare from '@astrojs/cloudflare';
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
});
