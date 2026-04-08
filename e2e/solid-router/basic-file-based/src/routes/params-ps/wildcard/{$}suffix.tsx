import { createFileRoute } from '@benjavicente/solid-router'
export const Route = createFileRoute('/params-ps/wildcard/{$}suffix')({
  component: RouteComponent,
})

function RouteComponent() {
  const p = Route.useParams()
  return (
    <div>
      <h3>ParamsWildcardSplatSuffix</h3>
      <div data-testid="params-output">{JSON.stringify(p())}</div>
    </div>
  )
}
