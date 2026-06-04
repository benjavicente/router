import { QueryClient } from '@tanstack/vue-query'
import { createRouter } from '@benjavicente/vue-router'
import { setupRouterSsrQueryIntegration } from '@benjavicente/vue-router-ssr-query'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const queryClient = new QueryClient()
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreload: 'intent',
  })
  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  })
  return router
}
