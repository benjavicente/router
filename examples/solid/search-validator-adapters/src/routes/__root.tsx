import { Outlet, createRootRouteWithContext } from '@benjavicente/solid-router'
import { TanStackRouterDevtools } from '@benjavicente/solid-router-devtools'
import type { QueryClient } from '@tanstack/solid-query'

export interface Context {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<Context>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div class="m-4">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  )
}
