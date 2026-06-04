import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { createRouter } from '@benjavicente/solid-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const queryClient = new QueryClient()
  return createRouter({
    routeTree,
    Wrap: (props) => (
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    ),
  })
}

declare module '@benjavicente/solid-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
