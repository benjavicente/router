import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { tanstackRouter } from '@benjavicente/router-plugin/rspack'

export default defineConfig({
  plugins: [pluginReact()],
  tools: {
    rspack: {
      plugins: [tanstackRouter({ target: 'react', autoCodeSplitting: true })],
    },
  },
})
