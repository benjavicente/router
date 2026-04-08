import { defineConfig } from 'vite'
import { tanstackStart } from '@benjavicente/react-start/plugin/vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [tanstackStart()],
})
