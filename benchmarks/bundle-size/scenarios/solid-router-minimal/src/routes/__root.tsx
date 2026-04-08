import { Outlet, createRootRoute } from '@benjavicente/solid-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return <Outlet />
}
