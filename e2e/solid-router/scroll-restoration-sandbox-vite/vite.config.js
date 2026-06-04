import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { tanstackRouter } from '@benjavicente/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), tanstackRouter({ target: 'solid' }), solid()],
})
