import * as tsParser from '@typescript-eslint/parser'
import startPlugin from '@benjavicente/eslint-plugin-start'

// Perf config: only no-async-client-component rule
export default [
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@benjavicente/start': startPlugin,
    },
    rules: {
      '@benjavicente/start/no-async-client-component': 'error',
    },
  },
]
