import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/_tests_/setup.ts'
  },
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