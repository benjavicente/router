import { createRouter } from '@benjavicente/vue-router'
import { routeTree } from './routeTree.gen'

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
  })

  return router
}

declare module '@benjavicente/vue-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
