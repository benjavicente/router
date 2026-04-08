import { createFileRoute } from '@benjavicente/solid-router'
export const Route = createFileRoute('/classic/hello/world')({
  component: () => <div>Hello /classic/hello/world!</div>,
})
