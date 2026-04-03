import * as Angular from '@angular/core'
import { replaceEqualDeep } from '@tanstack/router-core'
import { injectRouter } from './injectRouter'
import { injectStore } from './injectStore'
import { MATCH_CONTEXT_INJECTOR_TOKEN } from './matchInjectorToken'
import type {
  AnyRouter,
  MakeRouteMatchUnion,
  RegisteredRouter,
} from '@tanstack/router-core'

export interface InjectMatchesBaseOptions<
  TRouter extends AnyRouter,
  TSelected,
> {
  select?: (matches: Array<MakeRouteMatchUnion<TRouter>>) => TSelected
}

export type InjectMatchesResult<
  TRouter extends AnyRouter,
  TSelected,
> = unknown extends TSelected ? Array<MakeRouteMatchUnion<TRouter>> : TSelected

export function injectMatches<
  TRouter extends AnyRouter = RegisteredRouter,
  TSelected = unknown,
>(
  opts?: InjectMatchesBaseOptions<TRouter, TSelected>,
): Angular.Signal<InjectMatchesResult<TRouter, TSelected>> {
  const router = injectRouter<TRouter>()
  const matches = injectStore(router.stores.activeMatchesSnapshot, (value) => {
    return value as Array<MakeRouteMatchUnion<TRouter>>
  })
  let previousResult: TSelected | undefined

  return Angular.computed(() => {
    const currentMatches = matches()
    const result = opts?.select ? opts.select(currentMatches) : currentMatches

    if (previousResult === undefined) {
      previousResult = result as TSelected
      return result as InjectMatchesResult<TRouter, TSelected>
    }

    previousResult = replaceEqualDeep(previousResult, result) as TSelected
    return previousResult as InjectMatchesResult<TRouter, TSelected>
  })
}

export function injectParentMatches<
  TRouter extends AnyRouter = RegisteredRouter,
  TSelected = unknown,
>(
  opts?: InjectMatchesBaseOptions<TRouter, TSelected>,
): Angular.Signal<InjectMatchesResult<TRouter, TSelected>> {
  const nearestMatch = Angular.inject(MATCH_CONTEXT_INJECTOR_TOKEN)

  return injectMatches({
    select: (matches: Array<MakeRouteMatchUnion<TRouter>>) => {
      const sliced = matches.slice(
        0,
        matches.findIndex((d) => d.id === nearestMatch.matchId()),
      )

      return opts?.select ? opts.select(sliced) : sliced
    },
  } as any)
}

export function injectChildMatches<
  TRouter extends AnyRouter = RegisteredRouter,
  TSelected = unknown,
>(
  opts?: InjectMatchesBaseOptions<TRouter, TSelected>,
): Angular.Signal<InjectMatchesResult<TRouter, TSelected>> {
  const nearestMatch = Angular.inject(MATCH_CONTEXT_INJECTOR_TOKEN)

  return injectMatches({
    select: (matches: Array<MakeRouteMatchUnion<TRouter>>) => {
      const sliced = matches.slice(
        matches.findIndex((d) => d.id === nearestMatch.matchId()) + 1,
      )

      return opts?.select ? opts.select(sliced) : sliced
    },
  } as any)
}
