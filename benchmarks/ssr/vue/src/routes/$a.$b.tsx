import { Outlet, createFileRoute } from '@benjavicente/vue-router'
import { RouteWorkload } from '../workload'

export const Route = createFileRoute('/$a/$b')({
  component: LevelBComponent,
})

function LevelBComponent() {
  return (
    <>
      <RouteWorkload />
      <Outlet />
    </>
  )
}
