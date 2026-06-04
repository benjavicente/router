import { QueryClient } from '@tanstack/react-query'
import { createRouter } from '@benjavicente/react-router'
import { setupRouterSsrQueryIntegration } from '@benjavicente/react-router-ssr-query'
import { routeTree } from './routeTree.gen'
import { DefaultCatchBoundary } from './components/DefaultCatchBoundary'
import { NotFound } from './components/NotFound'

export function getRouter() {
  const queryClient = new QueryClient()

  const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: 'intent',
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
  })
  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  })

  return router
}

declare module '@benjavicente/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
