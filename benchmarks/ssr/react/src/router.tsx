import { createRouter } from '@benjavicente/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  return createRouter({
    routeTree,
    defaultPreload: false,
    scrollRestoration: false,
  })
}

declare module '@benjavicente/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
