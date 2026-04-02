declare module '#tanstack-router-entry' {
  import type { RouterEntry } from '@tanstack/start-client-core'

  export const getRouter: RouterEntry['getRouter']
}
