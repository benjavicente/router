import { createFileRoute } from '@benjavicente/solid-router'
export const Route = createFileRoute('/_pathlessLayout/_nested-layout/route-b')(
  {
    component: LayoutBComponent,
  },
)

function LayoutBComponent() {
  return <div>I'm B!</div>
}
