import type { router } from './main'

declare module '@benjavicente/angular-router-experimental' {
  interface Register {
    router: typeof router
  }
}

export {}
