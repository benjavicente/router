import { createFileRoute } from '@benjavicente/react-router'
import { Outlet } from '@benjavicente/react-router'

export const Route = createFileRoute('/(group)/_layout')({
  component: () => (
    <>
      <div>/(group)/_layout!</div>
      <Outlet />
    </>
  ),
})
