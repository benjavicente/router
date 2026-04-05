import { createRouter } from '@benjavicente/solid-router'
// Import the generated route tree
import { routeTree } from './routeTree.gen'
import type { RouteIds } from '@benjavicente/solid-router'

// Set up a Router instance
export const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div>Loading form global pending component...</div>
  ),
  scrollRestoration: true,
})

export type RouterType = typeof router
export type RouterIds = RouteIds<RouterType['routeTree']>
