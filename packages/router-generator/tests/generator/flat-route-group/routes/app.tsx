import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/app')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app"!</div>
}
