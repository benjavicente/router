import { createRouter } from '@benjavicente/react-router'
import { routeTree } from './routeTree.gen'

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
  })

  return router
}

declare module '@benjavicente/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
