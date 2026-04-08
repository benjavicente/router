import { Outlet, createFileRoute } from '@benjavicente/solid-router'
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
