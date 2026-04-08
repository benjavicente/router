import { createRouter } from '@benjavicente/angular-router-experimental'
import { QueryClient } from '@benjavicente/angular-query-experimental'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 30,
        gcTime: 1000 * 60 * 60 * 24,
        retry: false,
      },
    },
  })

  return createRouter({
    context: { queryClient },
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
    // Required in angular to be 0
    defaultPendingMinMs: 0,
  })
}

declare module '@benjavicente/angular-router-experimental' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
