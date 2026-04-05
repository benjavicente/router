# @benjavicente/vue-router-ssr-query

SSR Query integration for TanStack Vue Router.

## Installation

```bash
npm install @benjavicente/vue-router-ssr-query
```

## Usage

```ts
import { setupRouterSsrQueryIntegration } from '@benjavicente/vue-router-ssr-query'
import { QueryClient } from '@tanstack/vue-query'

const queryClient = new QueryClient()

setupRouterSsrQueryIntegration({
  router,
  queryClient,
})
```
