import { hydrateStart as coreHydrateStart } from '@benjavicente/start-client-core/client'
import type { AnyRouter } from '@benjavicente/angular-router-experimental'

/**
 * Angular-specific wrapper for hydrateStart that signals hydration completion
 */
export async function hydrateStart(): Promise<AnyRouter> {
  const router = await coreHydrateStart()
  window.$_TSR?.h()
  return router
}
