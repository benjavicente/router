import { deepEqual } from '@benjavicente/router-core'
import { injectRouter } from './injectRouter'
import { injectStore } from './store/injectStore'
import type * as Angular from '@angular/core'
import type {
  AnyRouter,
  RegisteredRouter,
  RouterState,
} from '@benjavicente/router-core'

export interface InjectLocationOptions<TRouter extends AnyRouter, TSelected> {
  select?: (
    location: RouterState<TRouter['routeTree']>['location'],
  ) => TSelected
}

export type InjectLocationResult<
  TRouter extends AnyRouter,
  TSelected,
> = unknown extends TSelected
  ? RouterState<TRouter['routeTree']>['location']
  : TSelected

export function injectLocation<
  TRouter extends AnyRouter = RegisteredRouter,
  TSelected = unknown,
>(
  opts?: InjectLocationOptions<TRouter, TSelected>,
): Angular.Signal<InjectLocationResult<TRouter, TSelected>> {
  const router = injectRouter<TRouter>()

  if (!opts?.select) {
    return injectStore(router.stores.location) as Angular.Signal<
      InjectLocationResult<TRouter, TSelected>
    >
  }

  return injectStore(router.stores.location, opts.select, {
    equal: deepEqual,
  }) as Angular.Signal<InjectLocationResult<TRouter, TSelected>>
}
