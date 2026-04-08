import * as React from 'react'
import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/api/bar')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /api/bar!'
}
