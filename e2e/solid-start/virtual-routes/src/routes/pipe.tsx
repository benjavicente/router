import { createFileRoute } from '@benjavicente/solid-router'

export const Route = createFileRoute('/special|pipe')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div data-testid="special-pipe-route-heading">Hello "/special|pipe"!</div>
  )
}
