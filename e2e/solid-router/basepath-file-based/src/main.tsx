import { RouterProvider, createRouter } from '@benjavicente/solid-router'
import { render } from 'solid-js/web'
import { routeTree } from './routeTree.gen'

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultStaleTime: 5000,
  scrollRestoration: true,
  basepath: '/app',
})

// Register things for typesafety
declare module '@benjavicente/solid-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  render(() => <RouterProvider router={router} />, rootElement)
}
