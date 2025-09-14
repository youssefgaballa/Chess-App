

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(),
    tailwindcss(),
  ],
  preview: {
    port: 5173,
    strictPort: true,

  },
  server: {
    port: 5173,
    host: true,
    origin: 'http://127.0.0.1:5173',
    watch: { usePolling: true },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          ui: ['@mui/icons-material']
        }
      }
    }
  }
})
