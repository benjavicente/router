import { RouterProvider } from '@benjavicente/solid-router'
import type { AnyRouter } from '@benjavicente/router-core'

export function StartServer<TRouter extends AnyRouter>(props: {
  router: TRouter
}) {
  return <RouterProvider router={props.router} />
}
