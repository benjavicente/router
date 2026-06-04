import { createFileRoute } from '@benjavicente/vue-router'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  return <div>hello world</div>
}
