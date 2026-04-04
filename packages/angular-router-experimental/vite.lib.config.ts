import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { angular } from '@oxc-angular/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    angular({ tsconfig: 'tsconfig.lib.json' }),
    dts({
      tsconfigPath: 'tsconfig.lib.json',
      outDir: 'dist/types',
      rollupTypes: true,
    }),
  ],
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    lib: {
      entry: {
        'tanstack-angular-router-experimental': resolve(root, 'src/index.ts'),
        'tanstack-angular-router-experimental-experimental': resolve(
          root,
          'experimental/public_api.ts',
        ),
      },
      formats: ['es'],
      fileName: (_format, name) => `fesm2022/${name}.mjs`,
    },
    rollupOptions: {
      external: [
        /^@angular\//,
        /^@tanstack\//,
        'rxjs',
        'tslib',
        'isbot',
      ],
    },
  },
})
