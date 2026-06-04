import { createRouter } from '@benjavicente/solid-router'
import { QueryClient } from '@tanstack/solid-query'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const queryClient = new QueryClient()
  const router = createRouter({
    routeTree,
    context: {
      queryClient: queryClient,
    },
  })

  return router
}
