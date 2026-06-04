import { Outlet, createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/nested/$a/$b')({
  component: PageComponent,
})

function PageComponent() {
  const { b } = Route.useParams()

  return (
    <div>
      <p>{b}</p>
      <Outlet />
    </div>
  )
}
