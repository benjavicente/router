import { createRouter } from '@benjavicente/solid-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  return createRouter({
    routeTree,
    defaultPreload: false,
    scrollRestoration: false,
  })
}

declare module '@benjavicente/solid-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
