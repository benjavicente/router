import { Await, RouterProvider } from '@benjavicente/react-router'

import { hydrateStart } from './hydrateStart'

import type { AnyRouter } from '@benjavicente/router-core'

let hydrationPromise: Promise<AnyRouter> | undefined
export function StartClient() {
  if (!hydrationPromise) {
    hydrationPromise = hydrateStart()
  }

  return (
    <Await
      promise={hydrationPromise}
      children={(router) => <RouterProvider router={router} />}
    />
  )
}
