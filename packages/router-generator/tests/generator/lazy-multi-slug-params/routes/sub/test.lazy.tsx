import { createLazyFileRoute } from '@benjavicente/react-router'
export const Route = createLazyFileRoute('/sub/test')({
  component: () => 'Test Route',
})
