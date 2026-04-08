import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { tanstackStart } from '@benjavicente/react-start/plugin/vite'

export default defineConfig({
  plugins: [tanstackStart(), viteReact()],
})
