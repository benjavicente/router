import { Outlet, createFileRoute } from '@benjavicente/solid-router'

export const Route = createFileRoute('/non-nested/path/baz')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div data-testid="non-nested-path-baz-route-heading">
        Hello non-nested path baz route layout
      </div>
      <Outlet />
    </div>
  )
}
