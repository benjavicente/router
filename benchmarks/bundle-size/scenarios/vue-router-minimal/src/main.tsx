import { createApp } from 'vue'
import { RouterProvider, createRouter } from '@benjavicente/vue-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

declare module '@benjavicente/vue-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')
if (!rootElement) {
  throw new Error('Root element `#app` not found')
}
if (!rootElement.innerHTML) {
  createApp({
    setup() {
      return () => <RouterProvider router={router} />
    },
  }).mount('#app')
}
