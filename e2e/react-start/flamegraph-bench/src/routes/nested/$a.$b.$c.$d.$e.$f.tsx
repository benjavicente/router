import { Outlet, createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/nested/$a/$b/$c/$d/$e/$f')({
  component: PageComponent,
})

function PageComponent() {
  const { f } = Route.useParams()

  return (
    <div>
      <p>{f}</p>
      <Outlet />
    </div>
  )
}
