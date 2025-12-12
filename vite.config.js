import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

console.log('--- VERCEL ENV CHECK START ---');
console.log('VITE_WEATHER_API_KEY is available:', process.env.VITE_WEATHER_API_KEY ? 'YES' : 'NO');
console.log('--- VERCEL ENV CHECK END ---');

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: "/"
})
