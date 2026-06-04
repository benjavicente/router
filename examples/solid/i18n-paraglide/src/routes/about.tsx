import { createFileRoute } from '@benjavicente/solid-router'
import { m } from '@/paraglide/messages'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>{m.hello_about()}</div>
}
