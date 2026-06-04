import { angular } from '@oxc-angular/vite'
import { defineConfig } from 'vite'
import { tanstackRouter } from '@benjavicente/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackRouter({
      target: 'angular',
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
    }),
    angular(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    noExternal: ['@angular/compiler'],
  },
})
