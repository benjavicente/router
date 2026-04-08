import { createFileRoute } from '@benjavicente/react-router'
export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/"!</div>
}
