import { defineConfig } from 'vite'
import { tanstackStart } from '@benjavicente/solid-start/plugin/vite'
import viteSolid from 'vite-plugin-solid'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  server: {
    port: 3000,
  },
  plugins: [tanstackStart(), viteSolid({ ssr: true })],
})
