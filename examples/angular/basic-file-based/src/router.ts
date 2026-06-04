import { createRouter } from '@benjavicente/angular-router-experimental'
import { routeTree } from './routeTree.gen'

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

declare module '@benjavicente/angular-router-experimental' {
  interface Register {
    router: typeof router
  }
}
