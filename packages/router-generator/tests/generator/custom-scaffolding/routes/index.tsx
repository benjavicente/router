import * as React from 'react'
import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /!'
}
