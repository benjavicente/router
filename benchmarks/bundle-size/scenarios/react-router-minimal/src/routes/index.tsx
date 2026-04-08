import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  return <div>hello world</div>
}
