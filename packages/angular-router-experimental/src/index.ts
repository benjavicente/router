// Router
export {
  createRouter,
  Router,
  type AngularInjectFn,
  type AngularRouterContext,
} from './router'

// Route creation
export {
  createRoute,
  createRootRoute,
  createRootRouteWithContext,
  createRouteMask,
  getRouteApi,
  Route,
  RootRoute,
  NotFoundRoute,
  RouteApi,
  type AnyRootRoute,
  type RouteComponent,
  type ErrorRouteComponent,
  type NotFoundRouteComponent,
} from './route'

export {
  createFileRoute,
  LazyRoute,
  createLazyRoute,
  createLazyFileRoute,
} from './fileRoute'

// Router Provider
export { RouterProvider, provideTanstackRouter } from './RouterProvider'
export {
  provideHeadContent,
  provideTanstackDocument,
  provideTanstackDocumentTitle,
  provideTanstackHeadManagedTags,
  provideTanstackBodyManagedTags,
  type TanstackDocumentFeatures,
  buildMatchManagedDocumentContent,
  buildManagedDocumentContent,
} from './document'

// Components
export { Outlet, RouteMatch } from './Match'
export { Matches } from './Matches'
export { injectSsrScrollRestorationScript } from './ssr-scroll-restoration'
export {
  injectMatches,
  injectParentMatches,
  injectChildMatches,
  type InjectMatchesBaseOptions,
  type InjectMatchesResult,
} from './injectMatches'
export { injectMatchRoute, type InjectMatchRouteOptions } from './injectMatchRoute'

// Injection functions
export { injectRouter } from './injectRouter'

export {
  injectRouterState,
  type InjectRouterStateOptions,
  type InjectRouterStateResult,
} from './injectRouterState'

export { injectNavigate } from './injectNavigate'

export {
  injectMatch,
  type InjectMatchOptions,
  type InjectMatchResult,
  type InjectMatchRoute,
  type InjectMatchBaseOptions,
} from './injectMatch'

export {
  injectParams,
  type InjectParamsOptions,
  type InjectParamsRoute,
  type InjectParamsBaseOptions,
} from './injectParams'

export {
  injectSearch,
  type InjectSearchOptions,
  type InjectSearchRoute,
  type InjectSearchBaseOptions,
} from './injectSearch'

export {
  injectLoaderData,
  type InjectLoaderDataOptions,
  type InjectLoaderDataRoute,
  type InjectLoaderDataBaseOptions,
} from './injectLoaderData'

export {
  injectLoaderDeps,
  type InjectLoaderDepsOptions,
  type InjectLoaderDepsRoute,
  type InjectLoaderDepsBaseOptions,
} from './injectLoaderDeps'

export {
  injectRouteContext,
  type InjectRouteContextRoute,
} from './injectRouteContext'

export {
  injectLocation,
  type InjectLocationOptions,
  type InjectLocationResult,
} from './injectLocation'

export {
  injectBlocker,
  type InjectBlockerOpts,
  type UseBlockerOpts,
  type ShouldBlockFn,
} from './injectBlocker'

export { injectCanGoBack } from './injectCanGoBack'

export { injectErrorState } from './injectErrorState'

export { injectStore } from './injectStore'

// Link
export { type LinkOptions as LinkInputOptions, Link } from './Link'

// Core re-exports
export {
  lazyFn,
  notFound,
  redirect,
  isRedirect,
  retainSearchParams,
  createRouterConfig,
} from '@benjavicente/router-core'

// History utilities
export {
  createHistory,
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory,
} from '@benjavicente/history'

export type {
  BlockerFn,
  HistoryLocation,
  RouterHistory,
  ParsedPath,
  HistoryState,
} from '@benjavicente/history'

// Re-export types from router-core that are commonly used (FileRoutesByPath augmented by routeTree.gen.ts via declare module '@benjavicente/router-core')
export type {
  AnyRouter,
  RegisteredRouter,
  RouterState,
  LinkOptions,
  NavigateOptions,
  RouteOptions,
  RootRouteOptions,
  Register,
  RouterContextOptions,
  FileRoutesByPath,
  CreateFileRoute,
  CreateLazyFileRoute,
} from '@benjavicente/router-core'
