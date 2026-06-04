import { createFileRoute } from '@benjavicente/solid-router'

export const Route = createFileRoute('/classic/hello/')({
  component: () => <div>This is the index</div>,
})
