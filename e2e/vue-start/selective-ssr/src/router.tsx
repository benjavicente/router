import { createRouter } from '@benjavicente/vue-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
  })

  return router
}

declare module '@benjavicente/vue-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
