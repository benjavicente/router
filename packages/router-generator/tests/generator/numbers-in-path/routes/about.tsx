import { createFileRoute } from '@benjavicente/react-router'
export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/about"!</div>
}
