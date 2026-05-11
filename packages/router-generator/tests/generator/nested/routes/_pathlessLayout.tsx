import { createFileRoute, Outlet } from '@benjavicente/react-router'
export const Route = createFileRoute('/_pathlessLayout')({
  component: () => <Outlet />,
})
