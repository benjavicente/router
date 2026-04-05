import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/posts/$postId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/posts/$postId"!</div>
}
