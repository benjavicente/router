import { createFileRoute } from '@benjavicente/react-router'
export const Route = createFileRoute('/blog/$slug')({
  component: () => <div>Hello /blog/$slug!</div>,
})
