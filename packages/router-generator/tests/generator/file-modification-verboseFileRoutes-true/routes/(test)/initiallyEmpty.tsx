import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/(test)/initiallyEmpty')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(test)/initiallyEmpty"!</div>
}
