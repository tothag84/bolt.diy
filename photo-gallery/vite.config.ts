import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  // When building for GitHub Pages the app is served from /bolt.diy/.
  // Locally (dev / preview) it stays at the root.
  base: process.env.GH_PAGES === 'true' ? '/bolt.diy/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5180,
    host: true,
  },
});
