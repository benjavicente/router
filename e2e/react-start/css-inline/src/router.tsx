import { createRouter } from '@benjavicente/react-router'
import { routeTree } from './routeTree.gen'

export const getRouter = () => {
  return createRouter({
    routeTree,
    defaultPreload: 'intent',
  })
}

declare module '@benjavicente/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
