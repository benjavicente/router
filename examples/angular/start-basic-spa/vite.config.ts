import { defineConfig } from 'vite'
import { angular } from '@oxc-angular/vite'
import { tanstackStart } from '@benjavicente/angular-start-experimental/plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import "@angular/compiler"

export default defineConfig({
  ssr: {
    noExternal: ['@angular/compiler'],
  },
  server: {
    port: 4203,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      srcDirectory: 'src',
      spa: {
        enabled: true,
      },
      prerender: {
        failOnError: true,
      },
    }),
    angular()
  ],
})
