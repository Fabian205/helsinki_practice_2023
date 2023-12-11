import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    // Habilitar el modo ESM
    format: 'esm',
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000', 
    },
  },
})
