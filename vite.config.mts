import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    // Piso do Vite <= 6 (ESM nativo). O padrão do Vite 8 exigiria Safari 16.4+/Chrome 111+.
    target: ['es2020', 'chrome87', 'edge88', 'firefox78', 'safari14'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/setupTests.js'],
  },
});
