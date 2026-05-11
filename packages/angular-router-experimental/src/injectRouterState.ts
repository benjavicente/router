import { isServer } from '@benjavicente/router-core/isServer'
import * as Angular from '@angular/core'
import { deepEqual } from '@benjavicente/router-core'
import { injectRouter } from './injectRouter'
import { injectStore } from './store/injectStore'
import type {
  AnyRouter,
  RegisteredRouter,
  RouterState,
} from '@benjavicente/router-core'

export type InjectRouterStateOptions<TRouter extends AnyRouter, TSelected> = {
  router?: TRouter
  select?: (state: RouterState<TRouter['routeTree']>) => TSelected
}

export type InjectRouterStateResult<
  TRouter extends AnyRouter,
  TSelected,
> = unknown extends TSelected ? RouterState<TRouter['routeTree']> : TSelected

export function injectRouterState<
  TRouter extends AnyRouter = RegisteredRouter,
  TSelected = unknown,
>(
  opts?: InjectRouterStateOptions<TRouter, TSelected>,
): Angular.Signal<InjectRouterStateResult<TRouter, TSelected>> {
  const contextRouter = injectRouter({
    warn: opts?.router === undefined,
  })
  const router = opts?.router ?? contextRouter

  // During SSR we render exactly once and do not need reactivity.
  // Avoid subscribing to the store on the server since the server store
  // implementation does not provide subscribe() semantics.
  const _isServer = isServer ?? router.isServer
  if (_isServer) {
    const state = router.stores.__store.get() as RouterState<
      TRouter['routeTree']
    >
    const selected = (
      opts?.select ? opts.select(state) : state
    ) as InjectRouterStateResult<TRouter, TSelected>
    return (() => selected) as Angular.Signal<
      InjectRouterStateResult<TRouter, TSelected>
    >
  }

  if (!opts?.select) {
    return injectStore(router.stores.__store) as Angular.Signal<
      InjectRouterStateResult<TRouter, TSelected>
    >
  }

  return injectStore(router.stores.__store, opts.select, {
    equal: deepEqual,
  }) as Angular.Signal<InjectRouterStateResult<TRouter, TSelected>>
}
