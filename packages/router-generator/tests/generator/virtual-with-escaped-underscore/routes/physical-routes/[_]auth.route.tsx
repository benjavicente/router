import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/api/_auth')({
  component: () => 'Auth Route',
})
