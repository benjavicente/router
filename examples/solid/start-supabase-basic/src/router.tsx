import { createRouter } from '@benjavicente/solid-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
  })

  return router
}

declare module '@benjavicente/solid-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
