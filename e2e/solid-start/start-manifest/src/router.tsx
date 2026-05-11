import { createRouter } from '@benjavicente/solid-router'
import { routeTree } from './routeTree.gen'

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
  })

  return router
}

declare module '@benjavicente/solid-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
