import { createFileRoute } from '@benjavicente/react-router'
export const Route = createFileRoute('/blog')({
  component: () => <div>Hello /blog!</div>,
})
