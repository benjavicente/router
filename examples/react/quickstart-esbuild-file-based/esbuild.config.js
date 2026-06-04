import { tanstackRouter } from '@benjavicente/router-plugin/esbuild'

export default {
  jsx: 'transform',
  minify: true,
  sourcemap: true,
  bundle: true,
  format: 'esm',
  target: ['esnext'],
  plugins: [tanstackRouter({ target: 'react', autoCodeSplitting: true })],
}
