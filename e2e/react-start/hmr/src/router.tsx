import { createRouter } from '@benjavicente/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  return createRouter({
    routeTree,
    defaultPreload: false,
    scrollRestoration: true,
  })
}
