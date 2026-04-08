import { render } from 'solid-js/web'
import {
  RouterProvider,
  createHashHistory,
  createRouter,
} from '@benjavicente/solid-router'
import { routeTree } from './routeTree.gen'
import type { RouterHistory } from '@benjavicente/solid-router'
import './styles.css'

let history: RouterHistory | undefined

if (import.meta.env.VITE_APP_HISTORY === 'hash') {
  history = createHashHistory()
}

// Set up a Router instance
const router = createRouter({
  routeTree,
  history,
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
