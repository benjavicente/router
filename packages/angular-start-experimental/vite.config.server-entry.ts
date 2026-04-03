import { angular } from '@oxc-angular/vite'
import { tanstackViteConfig } from '@tanstack/vite-config'
import { defineConfig, mergeConfig } from 'vite'

export default mergeConfig(
  tanstackViteConfig({
    tsconfigPath: './tsconfig.server-entry.json',
    srcDir: './src/default-entry',
    exclude: ['./src/default-entry/client.ts'],
    entry: ['./src/default-entry/server.ts'],
    externalDeps: [
      '@tanstack/angular-start-experimental/server',
      '@tanstack/angular-start-experimental-client',
      '@tanstack/angular-router-experimental',
      '@angular/compiler',
      '@angular/core',
      '@angular/common',
      '@angular/platform-browser',
      '@angular/platform-server',
    ],
    outDir: './dist/default-entry',
    cjs: false,
  }),
  defineConfig({
    plugins: [angular()],
    ssr: {
      noExternal: ['@angular/compiler'],
    },
  }),
)
