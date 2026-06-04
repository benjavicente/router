import { createFileRoute } from '@benjavicente/solid-router'
export const Route = createFileRoute('/without-loader')({
  component: () => <div>Hello /without-loader!</div>,
})
