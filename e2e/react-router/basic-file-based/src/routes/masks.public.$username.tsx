import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/masks/public/$username')({
  component: PublicUserRoute,
})

function PublicUserRoute() {
  const params = Route.useParams()

  return (
    <div data-testid="public-user-component">
      <div data-testid="public-username">{params.username}</div>
    </div>
  )
}
