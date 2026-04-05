import { createLazyFileRoute } from '@benjavicente/react-router'

export const Route = createLazyFileRoute('/posts')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/posts"!</div>
}
