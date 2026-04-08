import { createRouter as createSolidRouter } from '@benjavicente/solid-router'

import { routeTree } from './routeTree.gen'

export function createRouter() {
  return createSolidRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
  })
}

declare module '@benjavicente/solid-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
