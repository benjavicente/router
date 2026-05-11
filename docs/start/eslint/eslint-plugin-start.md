---
id: eslint-plugin-start
title: ESLint Plugin Start
---

TanStack Start comes with its own ESLint plugin. This plugin is used to enforce best practices and help you avoid common mistakes when working with Server Components and server/client boundaries.

## Installation

The plugin is a separate package that you need to install:

```sh
npm install -D @benjavicente/eslint-plugin-start
```

or

```sh
pnpm add -D @benjavicente/eslint-plugin-start
```

or

```sh
yarn add -D @benjavicente/eslint-plugin-start
```

or

```sh
bun add -D @benjavicente/eslint-plugin-start
```

## Flat Config (`eslint.config.js`)

The release of ESLint 9.0 introduced a new way to configure ESLint using a flat config format. The TanStack Start ESLint Plugin supports this format and provides a recommended config you can use to enable all recommended rules.

### Recommended Flat Config setup

To enable all recommended rules:

```js
// eslint.config.js
import pluginStart from '@benjavicente/eslint-plugin-start'

export default [
  pluginStart.configs['flat/recommended'],
  // Any other config...
]
```

### Custom Flat Config setup

Alternatively, load the plugin and configure only the rules you want:

```js
// eslint.config.js
import pluginStart from '@benjavicente/eslint-plugin-start'

export default [
  {
    plugins: {
      '@benjavicente/start': pluginStart,
    },
    rules: {
      '@benjavicente/start/no-client-code-in-server-component': 'error',
      '@benjavicente/start/no-async-client-component': 'error',
    },
  },
  // Any other config...
]
```

## Legacy Config (`.eslintrc`)

Prior to ESLint 9.0, the most common way to configure ESLint was using a `.eslintrc` file. The TanStack Start ESLint plugin still supports this configuration method.

### Recommended Legacy Config setup

To enable all recommended rules, add `plugin:@benjavicente/eslint-plugin-start/recommended` in `extends`:

```json
{
  "extends": ["plugin:@benjavicente/eslint-plugin-start/recommended"]
}
```

### Custom Legacy Config setup

Alternatively, add `@benjavicente/eslint-plugin-start` to `plugins` and configure the rules you want:

```json
{
  "plugins": ["@benjavicente/eslint-plugin-start"],
  "rules": {
    "@benjavicente/start/no-client-code-in-server-component": "error",
    "@benjavicente/start/no-async-client-component": "error"
  }
}
```

## Rules

The following rules are available in the TanStack Start ESLint plugin:

- [@benjavicente/start/no-client-code-in-server-component](./no-client-code-in-server-component.md)
- [@benjavicente/start/no-async-client-component](./no-async-client-component.md)
