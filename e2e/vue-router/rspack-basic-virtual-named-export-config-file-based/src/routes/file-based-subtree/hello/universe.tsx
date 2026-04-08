import { createFileRoute } from '@benjavicente/vue-router'

export const Route = createFileRoute('/classic/hello/universe')({
  component: () => <div>Hello /classic/hello/universe!</div>,
})
