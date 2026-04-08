import { Outlet, createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
