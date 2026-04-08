import { Outlet, createFileRoute } from '@benjavicente/react-router'
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
