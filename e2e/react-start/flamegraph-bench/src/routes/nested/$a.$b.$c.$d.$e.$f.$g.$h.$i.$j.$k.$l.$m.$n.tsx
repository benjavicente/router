import { Outlet, createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute(
  '/nested/$a/$b/$c/$d/$e/$f/$g/$h/$i/$j/$k/$l/$m/$n',
)({
  component: PageComponent,
})

function PageComponent() {
  const { n } = Route.useParams()

  return (
    <div>
      <p>{n}</p>
      <Outlet />
    </div>
  )
}
