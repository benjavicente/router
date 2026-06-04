import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/relative/link/nested/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div data-testid="relative-link-nested-header">
      Hello "/relative/link/nested/"!
    </div>
  )
}
