import { createRouter } from '@benjavicente/angular-router-experimental'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  return createRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
    // Required in angular to be 0
    defaultPendingMinMs: 0,
  })
}

declare module '@benjavicente/angular-router-experimental' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
