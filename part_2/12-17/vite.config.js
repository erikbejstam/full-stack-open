import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  server: {
    proxy: {
      '/api/persons': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    }
  },
})
