declare module '#tanstack-start-entry' {
  import type { StartEntry } from '@benjavicente/start-client-core'

  export const startInstance: StartEntry['startInstance']
}

declare module '#tanstack-router-entry' {
  import type { RouterEntry } from '@benjavicente/start-client-core'

  export const getRouter: RouterEntry['getRouter']
}
