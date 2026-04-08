import { angular } from '@oxc-angular/vite'
import { defineConfig, mergeConfig } from 'vitest/config'
import { tanstackViteConfig } from '@tanstack/vite-config'
import packageJson from './package.json'

const config = defineConfig({
  plugins: [
    angular({
      tsconfig: 'tsconfig.json',
      liveReload: false,
    }),
  ],
  test: {
    typecheck: { enabled: true },
    name: packageJson.name,
    watch: false,
    environment: 'jsdom',
  },
})

export default mergeConfig(
  config,
  tanstackViteConfig({
    srcDir: './src',
    entry: './src/index.ts',
    cjs: false,
  }),
)
