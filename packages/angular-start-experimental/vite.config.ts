import { defineConfig, mergeConfig } from 'vitest/config'
import { tanstackViteConfig } from '@tanstack/vite-config'
import { copyFilesPlugin } from '@tanstack/router-utils'
import packageJson from './package.json'

const config = defineConfig({
  test: {
    name: packageJson.name,
    watch: false,
    environment: 'jsdom',
  },
  plugins: [
    copyFilesPlugin({
      pattern: ['*.ts', '!*.d.ts'],
      fromDir: 'src/default-entry',
      toDir: 'dist/plugin/default-entry',
    }),
  ],
})

export default mergeConfig(
  config,
  tanstackViteConfig({
    srcDir: './src',
    exclude: ['./src/default-entry'],
    entry: [
      './src/index.ts',
      './src/client.ts',
      './src/client-rpc.ts',
      './src/ssr-rpc.ts',
      './src/server-rpc.ts',
      './src/server.ts',
      './src/plugin/vite.ts',
    ],
    externalDeps: [
      '@tanstack/angular-start-experimental-client',
      '@tanstack/angular-start-experimental-server',
    ],
    cjs: false,
  }),
)
