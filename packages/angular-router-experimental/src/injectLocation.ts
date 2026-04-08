import { deepEqual } from '@benjavicente/router-core'
import { injectRouter } from './injectRouter'
import { injectStore } from './injectStore'
import type {
  AnyRouter,
  RegisteredRouter,
  RouterState,
} from '@benjavicente/router-core'
import type * as Angular from '@angular/core'

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

  return injectStore(
    router.stores.location,
    (location) =>
      (opts?.select ? opts.select(location as any) : location) as any,
    { equal: deepEqual }
  ) as Angular.Signal<InjectLocationResult<TRouter, TSelected>>
}
