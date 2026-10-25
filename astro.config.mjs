// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// allowedHosts en Astro y en Vite: hacen falta los dos para entrar por túneles (Cloudflare, etc.)
export default defineConfig({
  server: { allowedHosts: true },
  vite: {
    plugins: [tailwindcss()],
    server: { allowedHosts: true },
  }
});
