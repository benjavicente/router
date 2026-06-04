import { Outlet, createFileRoute } from '@benjavicente/solid-router'

export const Route = createFileRoute('/_pathlessLayout')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div>
      <div>Layout</div>
      <hr />
      <Outlet />
    </div>
  )
}
