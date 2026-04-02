import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/lazy')({
  component: LazyRouteComponent,
})

function LazyRouteComponent() {
  return (
    <div className="p-2">
      <h3>Lazy Route</h3>
      <p>This route component is loaded from a separate lazy route chunk.</p>
    </div>
  )
}
