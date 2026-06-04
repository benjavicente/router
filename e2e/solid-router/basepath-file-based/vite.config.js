import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { tanstackRouter } from '@benjavicente/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/app/',
  plugins: [tanstackRouter({ target: 'solid' }), solid()],
})
