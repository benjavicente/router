import { createFileRoute } from '@benjavicente/solid-router'
export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <h1>About</h1>
    </main>
  )
}
