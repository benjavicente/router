import { createRouter } from '@tanstack/angular-router-experimental'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  return createRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
  })
}

declare module '@tanstack/angular-router-experimental' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
