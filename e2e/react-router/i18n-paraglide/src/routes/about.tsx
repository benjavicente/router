import { m } from '@/paraglide/messages'
import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div data-testid="about-content">{m.hello_about()}</div>
}
