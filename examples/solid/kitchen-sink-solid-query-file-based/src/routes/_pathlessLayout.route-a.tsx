import { createFileRoute } from '@benjavicente/solid-router'

export const Route = createFileRoute('/_pathlessLayout/route-a')({
  component: LayoutAComponent,
})

function LayoutAComponent() {
  return <div>I'm A!</div>
}
