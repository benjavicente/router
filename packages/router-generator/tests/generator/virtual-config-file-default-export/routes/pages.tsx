import { createFileRoute } from '@benjavicente/react-router'
import * as React from 'react'

export const Route = createFileRoute('/$lang/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$lang/"!</div>
}
