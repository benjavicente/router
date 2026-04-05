import { createFileRoute } from '@benjavicente/solid-router'
import { Link } from '@benjavicente/solid-router'

export const Route = createFileRoute('/redirect/preload/first')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div data-testid="first">
      <Link
        from={Route.fullPath}
        to="../second"
        activeProps={{
          class: 'font-bold',
        }}
        preload="intent"
        data-testid={'link'}
      >
        go to second
      </Link>
    </div>
  )
}
