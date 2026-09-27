import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Multi-page build: each marketing page is its own HTML entry so the old URLs
// (/, /organizations.html, /brands.html) keep working on GitHub Pages.
// Everything in public/ (privacy, join, open, bank walkthroughs, .well-known, CNAME)
// is copied to dist untouched.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        organizations: resolve(import.meta.dirname, 'organizations.html'),
        brands: resolve(import.meta.dirname, 'brands.html'),
      },
    },
  },
});
