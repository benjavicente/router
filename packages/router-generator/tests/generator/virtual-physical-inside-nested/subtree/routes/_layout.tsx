import { Outlet, createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/s1/_layout')({
  component: () => <Outlet />,
})
