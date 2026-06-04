import { QueryClient } from '@tanstack/react-query'
import { createRouter } from '@benjavicente/react-router'
import { setupRouterSsrQueryIntegration } from '@benjavicente/react-router-ssr-query'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const queryClient = new QueryClient()
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
  })
  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  })
  return router
}
