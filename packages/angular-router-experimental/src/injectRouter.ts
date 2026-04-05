import * as Angular from '@angular/core'
import { getRouterInjectionKey } from './routerInjectionToken'
import type { AnyRouter, RegisteredRouter } from '@benjavicente/router-core'

export function injectRouter<
  TRouter extends AnyRouter = RegisteredRouter,
>(opts?: { warn?: boolean }): TRouter {
  const router = Angular.inject(getRouterInjectionKey(), { optional: true })
  if (process.env.NODE_ENV !== 'production') {
    if ((opts?.warn ?? true) && !router) {
      console.warn(
        'Warning: injectRouter must be used inside a <router-provider> component!',
      )
    }
  }
  return router as any
}
