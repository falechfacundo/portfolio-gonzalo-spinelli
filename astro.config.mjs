// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // permite entrar por túneles (Cloudflare, etc.) además de localhost
  server: { allowedHosts: true },
  vite: {
    plugins: [tailwindcss()]
  }
});
