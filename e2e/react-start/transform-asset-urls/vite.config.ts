import { defineConfig } from 'vite'
import { tanstackStart } from '@benjavicente/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  base: '',
  server: {
    port: 3000,
  },
  plugins: [tanstackStart(), viteReact()],
})
