import { defineConfig } from 'vite'
import { tanstackStart } from '@benjavicente/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [tanstackStart(), viteReact(), nitro()],
})
