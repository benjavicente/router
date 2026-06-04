// @ts-check

import tsParser from '@typescript-eslint/parser'
import startPlugin from '@benjavicente/eslint-plugin-start'

export default [
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@benjavicente/start': startPlugin,
    },
    rules: {
      '@benjavicente/start/no-client-code-in-server-component': 'error',
      '@benjavicente/start/no-async-client-component': 'error',
    },
  },
]
