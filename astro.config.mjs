import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';
import { viteStaticCopy } from 'vite-plugin-static-copy';

dotenv.config();

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  vite: {
    define: {
      'process.env': process.env,
    },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: 'src/assets/web-brands/*',
            dest: 'assets/web-brands',
          },
        ],
      }),
    ],
  },
  integrations: [react()],
});
