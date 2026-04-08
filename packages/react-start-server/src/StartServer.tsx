import * as React from 'react'
import { RouterProvider } from '@benjavicente/react-router'
import type { AnyRouter } from '@benjavicente/router-core'

export function StartServer<TRouter extends AnyRouter>(props: {
  router: TRouter
}) {
  return <RouterProvider router={props.router} />
}
