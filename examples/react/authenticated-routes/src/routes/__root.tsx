import { Outlet, createRootRouteWithContext } from '@benjavicente/react-router'
import { TanStackRouterDevtools } from '@benjavicente/react-router-devtools'

import type { AuthContext } from '../auth'

interface MyRouterContext {
  auth: AuthContext
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
    </>
  ),
})
