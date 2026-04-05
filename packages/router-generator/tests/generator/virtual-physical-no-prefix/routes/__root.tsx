import { createRootRoute, Outlet } from '@benjavicente/react-router'

export const Route = createRootRoute({
  component: () => <Outlet />,
})
