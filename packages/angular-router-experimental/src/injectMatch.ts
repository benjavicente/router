import * as Angular from '@angular/core'
import { deepEqual, invariant } from '@tanstack/router-core'
import { MATCH_CONTEXT_INJECTOR_TOKEN } from './matchInjectorToken'
import { injectRouter } from './injectRouter'
import { injectStore } from './injectStore'
import type {
  AnyRouter,
  MakeRouteMatch,
  MakeRouteMatchUnion,
  RegisteredRouter,
  StrictOrFrom,
  ThrowConstraint,
  ThrowOrOptional,
} from '@tanstack/router-core'

export interface InjectMatchBaseOptions<
  TRouter extends AnyRouter,
  TFrom,
  TStrict extends boolean,
  TThrow extends boolean,
  TSelected,
> {
  select?: (
    match: MakeRouteMatch<TRouter['routeTree'], TFrom, TStrict>,
  ) => TSelected
  shouldThrow?: TThrow
}

export type InjectMatchRoute<out TFrom> = <
  TRouter extends AnyRouter = RegisteredRouter,
  TSelected = unknown,
>(
  opts?: InjectMatchBaseOptions<TRouter, TFrom, true, true, TSelected>,
) => Angular.Signal<InjectMatchResult<TRouter, TFrom, true, TSelected>>

export type InjectMatchOptions<
  TRouter extends AnyRouter,
  TFrom,
  TStrict extends boolean,
  TThrow extends boolean,
  TSelected,
> = StrictOrFrom<TRouter, TFrom, TStrict> &
  InjectMatchBaseOptions<TRouter, TFrom, TStrict, TThrow, TSelected>

export type InjectMatchResult<
  TRouter extends AnyRouter,
  TFrom,
  TStrict extends boolean,
  TSelected,
> = unknown extends TSelected
  ? TStrict extends true
  ? MakeRouteMatch<TRouter['routeTree'], TFrom, TStrict>
  : MakeRouteMatchUnion<TRouter>
  : TSelected

export function injectMatch<
  TRouter extends AnyRouter = RegisteredRouter,
  const TFrom extends string | undefined = undefined,
  TStrict extends boolean = true,
  TThrow extends boolean = true,
  TSelected = unknown,
>(
  opts: InjectMatchOptions<
    TRouter,
    TFrom,
    TStrict,
    ThrowConstraint<TStrict, TThrow>,
    TSelected
  >,
): Angular.Signal<
  ThrowOrOptional<InjectMatchResult<TRouter, TFrom, TStrict, TSelected>, TThrow>
> {
  const router = injectRouter<TRouter>()
  const nearestMatch = opts.from
    ? undefined
    : Angular.inject(MATCH_CONTEXT_INJECTOR_TOKEN)

  const pendingRouteIds = injectStore(
    router.stores.pendingRouteIds,
    (s) => s,
  )
  const isTransitioning = injectStore(
    router.stores.isTransitioning,
    (s) => s,
  )

  const match = () => {
    if (opts.from) {
      return router.stores.getMatchStoreByRouteId(opts.from).state
    }

    return nearestMatch?.match()
  }

  return Angular.computed(() => {
    const selectedMatch = match()

    if (selectedMatch !== undefined) {
      return opts.select ? opts.select(selectedMatch as any) : selectedMatch
    }

    const hasPendingMatch = opts.from
      ? Boolean(pendingRouteIds()[opts.from])
      : nearestMatch?.hasPending() ?? false

    if (
      !hasPendingMatch &&
      !isTransitioning() &&
      (opts.shouldThrow ?? true)
    ) {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error(
          `Invariant failed: Could not find ${opts.from ? `an active match from "${opts.from}"` : 'a nearest match!'}`,
        )
      }

      invariant()
    }

    return undefined
  }, { equal: deepEqual }) as any
}
