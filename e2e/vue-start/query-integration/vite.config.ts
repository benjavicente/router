import { defineConfig } from 'vite'
import { tanstackStart } from '@benjavicente/vue-start/plugin/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [tailwindcss(), tanstackStart(), vueJsx()],
})
