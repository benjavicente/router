import { Outlet, createRootRoute } from '@benjavicente/react-router'

export const Route = createRootRoute({
  component: () => <Outlet />,
})
