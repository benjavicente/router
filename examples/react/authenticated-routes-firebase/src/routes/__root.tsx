import { Outlet, createRootRouteWithContext } from '@benjavicente/react-router'
import { TanStackRouterDevtools } from '@benjavicente/react-router-devtools'
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
