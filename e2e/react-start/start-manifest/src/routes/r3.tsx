import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/r3')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section>
      <h1>Route /r3</h1>
      <p>Auxiliary route.</p>
    </section>
  )
}
