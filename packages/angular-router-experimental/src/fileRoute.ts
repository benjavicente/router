import { createRoute } from './route'

import { injectMatch } from './injectMatch'
import { injectLoaderDeps } from './injectLoaderDeps'
import { injectLoaderData } from './injectLoaderData'
import { injectSearch } from './injectSearch'
import { injectParams } from './injectParams'
import { injectNavigate } from './injectNavigate'
import { injectRouter } from './injectRouter'
import { injectRouteContext } from './injectRouteContext'
import type { InjectParamsRoute } from './injectParams'
import type { InjectMatchRoute } from './injectMatch'
import type { InjectSearchRoute } from './injectSearch'
import type {
  AnyContext,
  AnyRoute,
  AnyRouter,
  ConstrainLiteral,
  FileBaseRouteOptions,
  FileRoutesByPath,
  LazyRouteOptions,
  Register,
  RegisteredRouter,
  ResolveParams,
  Route,
  RouteById,
  RouteConstraints,
  RouteIds,
  UpdatableRouteOptions,
  UseNavigateResult,
} from '@benjavicente/router-core'
import type { InjectLoaderDepsRoute } from './injectLoaderDeps'
import type { InjectLoaderDataRoute } from './injectLoaderData'
import type { InjectRouteContextRoute } from './injectRouteContext'

export function createFileRoute<
  TFilePath extends keyof FileRoutesByPath,
  TParentRoute extends AnyRoute = FileRoutesByPath[TFilePath]['parentRoute'],
  TId extends RouteConstraints['TId'] = FileRoutesByPath[TFilePath]['id'],
  TPath extends RouteConstraints['TPath'] = FileRoutesByPath[TFilePath]['path'],
  TFullPath extends
  RouteConstraints['TFullPath'] = FileRoutesByPath[TFilePath]['fullPath'],
>(
  path?: TFilePath,
): InternalFileRouteFactory<
  TFilePath,
  TParentRoute,
  TId,
  TPath,
  TFullPath
>['createRoute'] {
  if (typeof path === 'object') {
    return new InternalFileRouteFactory<
      TFilePath,
      TParentRoute,
      TId,
      TPath,
      TFullPath
    >().createRoute(path) as any
  }
  return new InternalFileRouteFactory<
    TFilePath,
    TParentRoute,
    TId,
    TPath,
    TFullPath
  >().createRoute
}

class InternalFileRouteFactory<
  TFilePath extends keyof FileRoutesByPath,
  TParentRoute extends AnyRoute = FileRoutesByPath[TFilePath]['parentRoute'],
  TId extends RouteConstraints['TId'] = FileRoutesByPath[TFilePath]['id'],
  TPath extends RouteConstraints['TPath'] = FileRoutesByPath[TFilePath]['path'],
  TFullPath extends
  RouteConstraints['TFullPath'] = FileRoutesByPath[TFilePath]['fullPath'],
> {
  createRoute = <
    TRegister = Register,
    TSearchValidator = undefined,
    TParams = ResolveParams<TPath>,
    TRouteContextFn = AnyContext,
    TBeforeLoadFn = AnyContext,
    TLoaderDeps extends Record<string, any> = {},
    TLoaderFn = undefined,
    TChildren = unknown,
    TSSR = unknown,
    TMiddlewares = unknown,
    THandlers = undefined,
  >(
    options?: FileBaseRouteOptions<
      TRegister,
      TParentRoute,
      TId,
      TPath,
      TSearchValidator,
      TParams,
      TLoaderDeps,
      TLoaderFn,
      AnyContext,
      TRouteContextFn,
      TBeforeLoadFn,
      AnyContext,
      TSSR,
      TMiddlewares,
      THandlers
    > &
      UpdatableRouteOptions<
        TParentRoute,
        TId,
        TFullPath,
        TParams,
        TSearchValidator,
        TLoaderFn,
        TLoaderDeps,
        AnyContext,
        TRouteContextFn,
        TBeforeLoadFn
      >,
  ): Route<
    TRegister,
    TParentRoute,
    TPath,
    TFullPath,
    TFilePath,
    TId,
    TSearchValidator,
    TParams,
    AnyContext,
    TRouteContextFn,
    TBeforeLoadFn,
    TLoaderDeps,
    TLoaderFn,
    TChildren,
    unknown,
    TSSR,
    TMiddlewares,
    THandlers
  > => {
    const route = createRoute(options as any)
      ; (route as any).isRoot = false
    return route as any
  }
}

declare module '@benjavicente/router-core' {
  export interface LazyRoute<in out TRoute extends AnyRoute> {
    injectMatch: InjectMatchRoute<TRoute['id']>
    injectRouteContext: InjectRouteContextRoute<TRoute['id']>
    injectSearch: InjectSearchRoute<TRoute['id']>
    injectParams: InjectParamsRoute<TRoute['id']>
    injectLoaderDeps: InjectLoaderDepsRoute<TRoute['id']>
    injectLoaderData: InjectLoaderDataRoute<TRoute['id']>
    injectNavigate: () => UseNavigateResult<TRoute['fullPath']>
  }
}

export class LazyRoute<TRoute extends AnyRoute> {
  options: {
    id: string
  } & LazyRouteOptions

  constructor(
    opts: {
      id: string
    } & LazyRouteOptions,
  ) {
    this.options = opts
  }

  injectMatch: InjectMatchRoute<TRoute['id']> = (opts) => {
    return injectMatch({
      select: opts?.select,
      from: this.options.id,
    } as any) as any
  }

  injectRouteContext: InjectRouteContextRoute<TRoute['id']> = (opts) => {
    return injectRouteContext({ ...(opts as any), from: this.options.id }) as any
  }

  injectSearch: InjectSearchRoute<TRoute['id']> = (opts) => {
    return injectSearch({
      select: opts?.select,
      from: this.options.id,
    } as any) as any
  }

  injectParams: InjectParamsRoute<TRoute['id']> = (opts) => {
    return injectParams({
      select: opts?.select,
      from: this.options.id,
    } as any) as any
  }

  injectLoaderDeps: InjectLoaderDepsRoute<TRoute['id']> = (opts) => {
    return injectLoaderDeps({ ...opts, from: this.options.id } as any)
  }

  injectLoaderData: InjectLoaderDataRoute<TRoute['id']> = (opts) => {
    return injectLoaderData({ ...opts, from: this.options.id } as any)
  }

  injectNavigate = (): UseNavigateResult<TRoute['fullPath']> => {
    const router = injectRouter()
    return injectNavigate({ from: router.routesById[this.options.id].fullPath })
  }
}

export function createLazyRoute<
  TRouter extends AnyRouter = RegisteredRouter,
  TId extends string = string,
  TRoute extends AnyRoute = RouteById<TRouter['routeTree'], TId>,
>(id: ConstrainLiteral<TId, RouteIds<TRouter['routeTree']>>) {
  return (opts: LazyRouteOptions) => {
    return new LazyRoute<TRoute>({
      id: id,
      ...opts,
    })
  }
}

export function createLazyFileRoute<
  TFilePath extends keyof FileRoutesByPath,
  TRoute extends FileRoutesByPath[TFilePath]['preLoaderRoute'],
>(id: TFilePath): (opts: LazyRouteOptions) => LazyRoute<TRoute> {
  if (typeof id === 'object') {
    return new LazyRoute<TRoute>(id) as any
  }

  return (opts: LazyRouteOptions) => new LazyRoute<TRoute>({ id, ...opts })
}
