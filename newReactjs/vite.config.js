import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      "/api": "http://localhost:8000"
    },
    host:true,
    port:5173,
    allowedHosts: ['chubby-tigers-divide.loca.lt']
  },
  plugins: [react()],
})
