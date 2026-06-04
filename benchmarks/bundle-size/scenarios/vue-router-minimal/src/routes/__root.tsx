import { Outlet, createRootRoute } from '@benjavicente/vue-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return <Outlet />
}
