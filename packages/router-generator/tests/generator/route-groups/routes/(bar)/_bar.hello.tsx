import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/(bar)/_bar/hello')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(foo)/_bar/hello"!</div>
}
