---
id: no-async-client-component
title: Disallow async components in client context
---

Async React components are only valid within React Server Components.

In TanStack Start, that means async components must only be used in server-component context, for example:

- rendered by `renderServerComponent(<AsyncComp />)`
- rendered inside a `createCompositeComponent((props) => <AsyncComp />)` callback

This rule helps you catch async components that have become "client" (directly or transitively), which would otherwise crash at runtime.

## Rule Details

Examples of **incorrect** code for this rule:

```tsx
/* eslint "@benjavicente/start/no-async-client-component": "error" */

import { createFileRoute } from '@benjavicente/react-router'

export async function Page() {
  return <div />
}

export const Route = createFileRoute(undefined)({
  component: Page,
})
```

Examples of **correct** code for this rule:

```tsx
/* eslint "@benjavicente/start/no-async-client-component": "error" */

import { createFileRoute } from '@benjavicente/react-router'

export function Page() {
  return <div />
}

export const Route = createFileRoute(undefined)({
  component: Page,
})
```

```tsx
/* eslint "@benjavicente/start/no-async-client-component": "error" */

import { createCompositeComponent } from '@benjavicente/react-start/rsc'

export const ServerPage = createCompositeComponent(async () => {
  const message = await Promise.resolve('hello')
  return <div>{message}</div>
})
```

## Reporting location

This rule can report in two ways:

- **Usage-site**: if a component becomes client due to being referenced by route options, the error should be reported at the route option usage.
- **Definition-site**: if a component is client due to `'use client'` or being rendered by a client component, the error is reported at the component definition.

## Attributes

- [x] ✅ Recommended
