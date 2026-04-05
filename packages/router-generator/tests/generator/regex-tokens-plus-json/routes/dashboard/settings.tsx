import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/dashboard/settings')({
  component: () => <div>Dashboard Settings</div>,
})
