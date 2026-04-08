import { createFileRoute } from '@benjavicente/vue-router'

export const Route = createFileRoute('/classic/hello/world')({
  component: () => <div>Hello /classic/hello/world!</div>,
})
