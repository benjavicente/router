import { createRouter as createReactRouter } from '@benjavicente/react-router'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  return createReactRouter({
    routeTree,
    context: {
      head: '',
    },
    defaultPreload: 'intent',
    scrollRestoration: true,
  })
}

declare module '@benjavicente/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
