import { createLazyFileRoute } from '@benjavicente/react-router'
export const Route = createLazyFileRoute('/sub')({
  component: () => 'Sub Layout',
})
