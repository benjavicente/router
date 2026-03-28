import { defineConfig } from 'vite'
import angular from '@analogjs/vite-plugin-angular'
import { tanstackStart } from '@tanstack/angular-start-experimental/plugin/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      router: {
        routesDirectory: './src/routes',
        generatedRouteTree: './src/routeTree.gen.ts',
      },
    }),
    angular({
      tsconfig: './tsconfig.json',
    }),
  ],
})
