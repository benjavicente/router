import { defineConfig } from 'vite'
import { tanstackStart } from '@benjavicente/solid-start/plugin/vite'
import viteSolid from 'vite-plugin-solid'

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [tanstackStart(), viteSolid({ ssr: true })],
})
