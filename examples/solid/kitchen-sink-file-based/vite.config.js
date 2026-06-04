import { defineConfig } from 'vite'
import { tanstackRouter } from '@benjavicente/router-plugin/vite'
import solidPlugin from 'vite-plugin-solid'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackRouter({ target: 'solid', autoCodeSplitting: true }),
    solidPlugin(),
  ],
})
