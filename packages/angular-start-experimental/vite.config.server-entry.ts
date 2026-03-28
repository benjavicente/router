import { tanstackViteConfig } from '@tanstack/config/vite'

export default tanstackViteConfig({
  srcDir: './src/default-entry',
  exclude: ['./src/default-entry/client.ts'],
  entry: ['./src/default-entry/server.ts'],
  externalDeps: ['@tanstack/angular-start-experimental/server'],
  outDir: './dist/default-entry',
  cjs: false,
})
