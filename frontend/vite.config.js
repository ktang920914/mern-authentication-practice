import react from '@vitejs/plugin-react'
import tailwindcsss from '@tailwindcss/vite'
import flowbiteReact from  'flowbite-react/plugin/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:3000',
        secure:false
      },
    },
  },
  plugins: [react(),tailwindcsss(),flowbiteReact()],
})
