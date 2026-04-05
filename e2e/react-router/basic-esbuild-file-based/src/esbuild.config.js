import { tanstackRouter } from '@benjavicente/router-plugin/esbuild'

export default {
  // ...
  plugins: [
    tanstackRouter({
      autoCodeSplitting: true,
    }),
  ],
}
