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
  resolve: {
    tsconfigPaths: true,
    // Resolve @benjavicente/router-core/isServer for tests (development export)
    ...(process.env.VITEST && { conditions: ['development'] }),
  },
  test: {
    name: packageJson.name,
    dir: './tests',
    watch: false,
    environment: 'jsdom',
    typecheck: { enabled: true },
    setupFiles: ['./tests/setupTests.ts'],
  },
})

export default mergeConfig(
  config,
  tanstackViteConfig({
    tsconfigPath: './tsconfig.build.json',
    entry: './src/index.ts',
    srcDir: './src',
    cjs: false,
  }),
)
