import { deepEqual } from '@tanstack/router-core'
import { injectRouter } from './injectRouter'
import { injectStore } from './injectStore'
import type * as Angular from '@angular/core'
import { type AnyRouter, type RegisteredRouter, type RouterState } from '@tanstack/router-core'

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
