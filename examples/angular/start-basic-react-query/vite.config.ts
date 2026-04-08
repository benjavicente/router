import { defineConfig } from 'vite'
import { angular } from '@oxc-angular/vite'
import { tanstackStart } from '@benjavicente/angular-start-experimental/plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

export default defineConfig({
  ssr: {
    noExternal: ['@angular/compiler'],
  },
  server: {
    port: 4201,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      srcDirectory: 'src',
    }),
    angular(),
    nitro(),
  ],
})
