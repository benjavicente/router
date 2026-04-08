import { Outlet, createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/nested/$a/$b/$c/$d/$e/$f/$g/$h/$i')({
  component: PageComponent,
})

function PageComponent() {
  const { i } = Route.useParams()

  return (
    <div>
      <p>{i}</p>
      <Outlet />
    </div>
  )
}
