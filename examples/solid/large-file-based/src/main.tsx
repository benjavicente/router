import { render } from 'solid-js/web'
import { RouterProvider, createRouter } from '@benjavicente/solid-router'
import { QueryClient } from '@tanstack/solid-query'
import { routeTree } from './routeTree.gen'
import './styles.css'

export const queryClient = new QueryClient()

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    queryClient,
  },
  scrollRestoration: true,
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
