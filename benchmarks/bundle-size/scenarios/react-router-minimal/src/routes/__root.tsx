import { Outlet, createRootRoute } from '@benjavicente/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return <Outlet />
}
