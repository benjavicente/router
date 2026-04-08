import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/device/$id')({
  component: () => 'Device Detail',
})
