import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/relative/useNavigate/nested/deep/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div data-testid="relative-useNavigate-nested-deep-header">
      Hello "/relative/useNavigate/nested/deep/"!
    </div>
  )
}
