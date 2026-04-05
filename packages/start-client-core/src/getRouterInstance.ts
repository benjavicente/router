import { getStartContext } from '@benjavicente/start-storage-context'
import { createIsomorphicFn } from '@benjavicente/start-fn-stubs'
import type { Awaitable, RegisteredRouter } from '@benjavicente/router-core'

export const getRouterInstance: () => Awaitable<RegisteredRouter> =
  createIsomorphicFn()
    .client(() => window.__TSR_ROUTER__!)
    .server(() => getStartContext().getRouter())
