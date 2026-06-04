import { Outlet, createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/nested/$a')({
  component: PageComponent,
})

function PageComponent() {
  const { a } = Route.useParams()

  return (
    <div>
      <p>{a}</p>
      <Outlet />
    </div>
  )
}
