import { createFileRoute } from '@benjavicente/vue-router'
import { createServerFn } from '@benjavicente/vue-start'
import { env } from 'cloudflare:workers'

export const Route = createFileRoute('/static')({
  loader: () => getData(),
  component: StaticPage,
})

const getData = createServerFn().handler(() => {
  return {
    myVar: env.MY_VAR,
  }
})

function StaticPage() {
  const data = Route.useLoaderData()

  return (
    <div>
      <h1 data-testid="static-heading">Static Page</h1>
      <p data-testid="static-content">The value is {data.value.myVar}</p>
    </div>
  )
}
