import { hydrateStart as coreHydrateStart } from '@tanstack/start-client-core/client'
import type { AnyRouter } from '@tanstack/router-core'

export async function hydrateStart(): Promise<AnyRouter> {
  return await coreHydrateStart()
}
