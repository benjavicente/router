import { type QueryClient } from '@tanstack/react-query'
import { Outlet, createRootRouteWithContext } from '@benjavicente/react-router'
import { TanStackRouterDevtools } from '@benjavicente/react-router-devtools'

export interface Context {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<Context>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="m-4">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  )
}
