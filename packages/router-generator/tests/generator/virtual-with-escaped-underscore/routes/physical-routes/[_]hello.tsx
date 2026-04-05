import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/api/_hello')({
  component: () => 'Hello API',
})
