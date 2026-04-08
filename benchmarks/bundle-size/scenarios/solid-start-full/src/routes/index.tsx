import { createFileRoute } from '@benjavicente/solid-router'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  return <div>hello world</div>
}
