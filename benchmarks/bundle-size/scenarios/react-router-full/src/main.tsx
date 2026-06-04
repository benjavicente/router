import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@benjavicente/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
  scrollRestoration: true,
})

declare module '@benjavicente/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')
if (!rootElement) {
  throw new Error('Root element `#app` not found')
}
if (!rootElement.innerHTML) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />)
}
