

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
//import mkcert from 'vite-plugin-mkcert'


// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(),
    tailwindcss(),
   // mkcert()
  ],
  preview: {
    port: 5173,
    strictPort: true,

  },
  server: {
    port: 5173,
    host: true,
    //https: true,
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
  },
  envDir: '../',
  
})
