import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
<<<<<<< HEAD
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/_tests_/setup.ts'
  },
=======
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()],
>>>>>>> 3723c12c2766272d1f047bdf6612f2e8f7d81fc9
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      'bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  build: {
    // Enable CSS extraction
    cssCodeSplit: true,
    // More explicit rollup options for external CSS
    rollupOptions: {
      // Explicitly include bootstrap in the build
      external: [],
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/bootstrap')) {
            return 'bootstrap';
          }
        },
      },
    },
  }
})
