

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
//import mkcert from 'vite-plugin-mkcert'


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../', '');

  //console.log("VITE_FRONTEND_PORT from vite.config.ts: ", env.VITE_FRONTEND_PORT);
  return {
    base: './',
    plugins: [react(),
    tailwindcss(),
      // mkcert()
    ],
    preview: {
      port: Number(env.VITE_FRONTEND_PORT),
      strictPort: true,

    },
    server: {
      port: Number(env.VITE_FRONTEND_PORT),
      host: true,
      //https: true,
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
  }
})
