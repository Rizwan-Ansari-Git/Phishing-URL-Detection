// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Phishing-URL-Detection/',  // Set this to your GitHub repository name
  build: {
    outDir: 'dist',  // This specifies the output directory for the build
  },
  plugins: [react()],  // Enable React support
});
