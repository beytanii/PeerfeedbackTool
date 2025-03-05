import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // Allows external access
    // allowedHosts: ['peerfeedback.betbet.website'],
    port: 5173,
    hmr: false,
  },
  preview: {
    hmr: false, // Prevents WebSockets from running in preview mode
  },
  plugins: [react()],
})
