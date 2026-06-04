![TanStack Router Header](https://raw.githubusercontent.com/TanStack/router/main/media/header_router.png)

# @benjavicente/solid-router-ssr-query

SSR query integration for TanStack Solid Router and TanStack Solid Query.

This package provides seamless integration between TanStack Router and TanStack Query for server-side rendering in Solid applications.

## Installation

```bash
npm install @benjavicente/solid-router-ssr-query
# or
pnpm add @benjavicente/solid-router-ssr-query
# or
yarn add @benjavicente/solid-router-ssr-query
```

## Usage

```tsx
import { QueryClient } from '@tanstack/solid-query'
import { createRouter } from '@benjavicente/solid-router'
import { setupRouterSsrQueryIntegration } from '@benjavicente/solid-router-ssr-query'

const queryClient = new QueryClient()
const router = createRouter({
  routeTree,
  context: { queryClient },
})

setupRouterSsrQueryIntegration({
  router,
  queryClient,
})
```

## License

MIT
