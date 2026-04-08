import { Outlet, createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/nested/$a/$b/$c/$d/$e')({
  component: PageComponent,
})

function PageComponent() {
  const { e } = Route.useParams()

  return (
    <div>
      <p>{e}</p>
      <Outlet />
    </div>
  )
}
