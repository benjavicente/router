import { Outlet, createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/_first/_second-layout')({
  component: () => (
    <div>
      <div>Second Layout (nested)</div>
      <Outlet />
    </div>
  ),
})
