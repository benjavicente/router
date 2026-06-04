import { Outlet, createFileRoute } from '@benjavicente/vue-router'
import { RouteWorkload } from '../workload'

export const Route = createFileRoute('/$a')({
  component: LevelAComponent,
})

function LevelAComponent() {
  return (
    <>
      <RouteWorkload />
      <Outlet />
    </>
  )
}
