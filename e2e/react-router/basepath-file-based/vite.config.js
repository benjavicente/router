import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@benjavicente/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/app/',
  plugins: [tanstackRouter({ target: 'react' }), react()],
})
