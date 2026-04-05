import { createFileRoute } from '@benjavicente/solid-router'
import { Outlet } from '@benjavicente/solid-router'

export const Route = createFileRoute('/(group)/_layout')({
  component: () => (
    <>
      <div>/(group)/_layout!</div>
      <Outlet />
    </>
  ),
})
