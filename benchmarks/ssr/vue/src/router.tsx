import { createRouter } from '@benjavicente/vue-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  return createRouter({
    routeTree,
    defaultPreload: false,
    scrollRestoration: false,
  })
}

declare module '@benjavicente/vue-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
