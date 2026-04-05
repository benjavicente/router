import { createFileRoute } from '@benjavicente/solid-router'

export const Route = createFileRoute('/relative/link/nested/deep/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div data-testid="relative-link-nested-deep-header">
      Hello "/relative/link/nested/deep/"!
    </div>
  )
}
