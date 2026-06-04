import { createLazyFileRoute } from '@benjavicente/react-router'
export const Route = createLazyFileRoute('/path')({
  component: () => 'Path Layout',
})
