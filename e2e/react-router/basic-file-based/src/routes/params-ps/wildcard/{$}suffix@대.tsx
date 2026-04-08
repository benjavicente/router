import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/params-ps/wildcard/{$}suffix@대')({
  component: RouteComponent,
})

function RouteComponent() {
  const p = Route.useParams()
  return (
    <div>
      <h3>ParamsWildcardSplatSuffix</h3>
      <div data-testid="params-output">{JSON.stringify(p)}</div>
    </div>
  )
}
