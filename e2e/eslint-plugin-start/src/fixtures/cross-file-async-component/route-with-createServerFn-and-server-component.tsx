// Route file that defines a server function which returns a server component.
// This should NOT affect no-async-client-component reporting for the route.

import { createFileRoute } from '@benjavicente/react-router'
import { createServerFn } from '@benjavicente/react-start'
import { createCompositeComponent } from '@benjavicente/react-start/rsc'
import React from 'react'

export const myFn = createServerFn().handler(() => {
  return createCompositeComponent(async () => {
    return <div>Server-only async is ok</div>
  })
})

export const Route = createFileRoute(undefined)({
  component: () => {
    return <div>Route</div>
  },
})
