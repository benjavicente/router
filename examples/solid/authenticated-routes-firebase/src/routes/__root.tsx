import { Outlet, createRootRouteWithContext } from '@benjavicente/solid-router'
import { TanStackRouterDevtools } from '@benjavicente/solid-router-devtools'
import type { AuthContextType } from '../auth'

export type MyRouterContext = {
  auth: AuthContextType
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
    </>
  ),
})
