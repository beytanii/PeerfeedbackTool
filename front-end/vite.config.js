import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // Allows external access
    allowedHosts: ['peerfeedback.betbet.website'],
    port: 5173,
    hmr: process.env.NODE_ENV !== 'production' ? true : false, // Disable HMR in production
  },
  preview: {
    hmr: false, // Disable WebSockets when using 'npm run preview'
  },
  plugins: [react()],
})
