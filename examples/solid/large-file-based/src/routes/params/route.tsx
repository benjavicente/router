import { createFileRoute } from '@benjavicente/solid-router'

export const Route = createFileRoute('/params')({
  component: () => <div>Hello /params!</div>,
})
