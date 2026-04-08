import { RouterProvider } from '@benjavicente/solid-router'
import type { AnyRouter } from '@benjavicente/router-core'

export function StartClient(props: { router: AnyRouter }) {
  return <RouterProvider router={props.router} />
}
