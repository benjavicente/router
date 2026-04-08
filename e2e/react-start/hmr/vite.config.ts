import { defineConfig } from 'vite'
import { tanstackStart } from '@benjavicente/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  server: {
    port: 3000,
  },
  plugins: [tailwindcss(), tanstackStart(), viteReact()],
})
