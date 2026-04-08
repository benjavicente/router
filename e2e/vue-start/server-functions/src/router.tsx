import { createRouter } from '@benjavicente/vue-router'
import { setupRouterSsrQueryIntegration } from '@benjavicente/vue-router-ssr-query'
import { QueryClient } from '@tanstack/vue-query'
import { routeTree } from './routeTree.gen'
import { DefaultCatchBoundary } from './components/DefaultCatchBoundary'
import { NotFound } from './components/NotFound'

export function getRouter() {
  const queryClient = new QueryClient()
  const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    scrollRestoration: true,
    context: {
      foo: {
        bar: 'baz',
      },
    },
  })

  setupRouterSsrQueryIntegration({ router, queryClient })

  return router
}

declare module '@benjavicente/vue-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
