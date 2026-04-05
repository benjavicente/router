import { Outlet, createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute(
  '/nested/$a/$b/$c/$d/$e/$f/$g/$h/$i/$j/$k/$l/$m',
)({
  component: PageComponent,
})

function PageComponent() {
  const { m } = Route.useParams()

  return (
    <div>
      <p>{m}</p>
      <Outlet />
    </div>
  )
}
