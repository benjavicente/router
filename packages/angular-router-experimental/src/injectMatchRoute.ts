import * as Angular from '@angular/core'
import { injectRouter } from './injectRouter'
import { injectStore } from './injectStore'
import type {
  AnyRouter,
  DeepPartial,
  Expand,
  MakeOptionalPathParams,
  MakeOptionalSearchParams,
  MaskOptions,
  MatchRouteOptions,
  NoInfer,
  RegisteredRouter,
  ResolveRoute,
  ToSubOptionsProps,
} from '@benjavicente/router-core'

export type InjectMatchRouteOptions<
  TRouter extends AnyRouter = RegisteredRouter,
  TFrom extends string = string,
  TTo extends string | undefined = undefined,
  TMaskFrom extends string = TFrom,
  TMaskTo extends string = '',
> = ToSubOptionsProps<TRouter, TFrom, TTo> &
  DeepPartial<MakeOptionalSearchParams<TRouter, TFrom, TTo>> &
  DeepPartial<MakeOptionalPathParams<TRouter, TFrom, TTo>> &
  MaskOptions<TRouter, TMaskFrom, TMaskTo> &
  MatchRouteOptions

export function injectMatchRoute<
  TRouter extends AnyRouter = RegisteredRouter,
>() {
  const router = injectRouter<TRouter>()
  const reactivity = injectStore(router.stores.matchRouteReactivity, (d) => d)

  return <
    const TFrom extends string = string,
    const TTo extends string | undefined = undefined,
    const TMaskFrom extends string = TFrom,
    const TMaskTo extends string = '',
  >(
    opts: InjectMatchRouteOptions<TRouter, TFrom, TTo, TMaskFrom, TMaskTo>,
  ): Angular.Signal<
    false | Expand<ResolveRoute<TRouter, TFrom, NoInfer<TTo>>['types']['allParams']>
  > => {
    return Angular.computed(() => {
      reactivity()
      const { pending, caseSensitive, fuzzy, includeSearch, ...rest } = opts

      return router.matchRoute(rest as any, {
        pending,
        caseSensitive,
        fuzzy,
        includeSearch,
      })
    })
  }
}
