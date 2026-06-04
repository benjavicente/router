import { tanstackRouter } from '@benjavicente/router-plugin/esbuild'
import { solidPlugin } from 'esbuild-plugin-solid'

export default {
  // ...
  plugins: [
    tanstackRouter({
      target: 'solid',
      autoCodeSplitting: true,
    }),
    solidPlugin(),
  ],
}
