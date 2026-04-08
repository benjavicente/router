import {
  Component,
  DestroyRef,
  EnvironmentInjector,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  isDevMode,
} from '@angular/core'
import {
  AnyRoute,
  AnyRouter,
  getLocationChangeInfo,
  rootRouteId,
} from '@benjavicente/router-core'
import { injectRouter } from './injectRouter'
import { injectStore } from './injectStore'
import { DefaultNotFoundComponent } from './DefaultNotFound'
import { MATCH_CONTEXT_INJECTOR_TOKEN } from './matchInjectorToken'
import { injectRender } from './renderer/injectRender'
import { ERROR_STATE_INJECTOR_TOKEN } from './injectErrorState'
import { injectIsCatchingError } from './renderer/injectIsCatchingError'
import type { Signal } from '@angular/core'
import type { NearestMatchContextValue } from './matchInjectorToken'

function injectOnRendered({
  parentRouteIsRoot,
}: {
  parentRouteIsRoot: Signal<boolean>
}) {
  const router = injectRouter({ warn: false })
  const envInjector = inject(EnvironmentInjector)
  const destroyRef = inject(DestroyRef)
  const location = injectStore(
    router.stores.resolvedLocation,
    (resolvedLocation) => resolvedLocation?.state.__TSR_key,
  )
  const loadedAt = injectStore(router.stores.loadedAt, (value) => value)

  let prevHref: string | undefined
  let renderGeneration = 0

  destroyRef.onDestroy(() => {
    renderGeneration++
  })

  effect(() => {
    if (!parentRouteIsRoot()) return
    location()
    loadedAt()

    const gen = ++renderGeneration
    afterNextRender(
      {
        read: () => {
          if (gen !== renderGeneration) return
          if (!parentRouteIsRoot()) return
          if (router.isServer) return

          const currentHref = router.latestLocation.href
          if (prevHref !== undefined && prevHref === currentHref) {
            return
          }
          prevHref = currentHref

          router.emit({
            type: 'onRendered',
            ...getLocationChangeInfo(
              router.stores.location.state,
              router.stores.resolvedLocation.state,
            ),
          })
        },
      },
      { injector: envInjector },
    )
  })
}

@Component({
  selector: 'router-match,[router-match]',
  template: '',
  standalone: true,
  host: {
    '[attr.data-matchId]': 'matchId()',
  },
})
export class RouteMatch {
  matchId = input.required<string>()

  router = injectRouter()

  match = computed(() => {
    const matchId = this.matchId()
    return matchId
      ? this.router.stores.activeMatchStoresById.get(matchId)?.state
      : undefined
  })

  matchData = computed(() => {
    const match = this.match()
    if (!match) return null

    const routeId = match.routeId
    const route = this.router.routesById[routeId] as AnyRoute
    const parentRouteId = route.parentRoute?.id ?? null
    const remountFn =
      route.options.remountDeps ?? this.router.options.defaultRemountDeps

    const remountDeps = remountFn?.({
      routeId,
      loaderDeps: match.loaderDeps,
      params: match._strictParams,
      search: match._strictSearch,
    })
    const key = remountDeps ? JSON.stringify(remountDeps) : undefined

    return {
      key,
      route,
      match,
      parentRouteId,
    }
  })

  isFistRouteInRouteTree = computed(
    () => this.matchData()?.parentRouteId === rootRouteId,
  )

  resolvedNoSsr = computed(() => {
    const match = this.matchData()?.match
    if (!match) return true
    return match.ssr === false || match.ssr === 'data-only'
  })

  shouldClientOnly = computed(() => {
    const match = this.matchData()?.match
    if (!match) return true
    return this.resolvedNoSsr() || !!match._displayPending
  })

  parentRouteIdSignal = computed(
    () => this.matchData()?.parentRouteId ?? '',
  )
  rootRouteIdSignal = computed(() => rootRouteId)

  hasPendingMatch = computed(() => {
    const routeId = this.matchData()?.route.id
    return routeId ? Boolean(this.pendingRouteIds()[routeId]) : false
  })
  pendingRouteIds = injectStore(this.router.stores.pendingRouteIds, (ids) => ids)
  nearestMatchContext: NearestMatchContextValue = {
    matchId: this.matchId,
    routeId: computed(() => this.matchData()?.route.id),
    match: this.match,
    hasPending: this.hasPendingMatch,
  }

  isCatchingError = injectIsCatchingError({
    matchId: this.matchId,
  })

  render = injectRender(() => {
    const matchData = this.matchData()
    if (!matchData) return null

    if (this.shouldClientOnly() && this.router.isServer) {
      return null
    }

    const { match, route } = matchData

    if (match.status === 'notFound') {
      const NotFoundComponent = getNotFoundComponent(this.router, route)

      return {
        component: NotFoundComponent,
      }
    } else if (match.status === 'error' || this.isCatchingError()) {
      const RouteErrorComponent =
        getComponent(route.options.errorComponent) ??
        getComponent(this.router.options.defaultErrorComponent)

      return {
        component: RouteErrorComponent || null,
        providers: [
          {
            provide: ERROR_STATE_INJECTOR_TOKEN,
            useValue: {
              error: match.error,
              reset: () => {
                this.router.invalidate()
              },
              info: { componentStack: '' },
            },
          },
        ],
      }
    } else if (match.status === 'redirected' || match.status === 'pending') {
      const rootShellComponent =
        route.isRoot &&
        (getComponent(route.options.component) ??
          getComponent(this.router.options.defaultComponent))

      if (rootShellComponent && rootShellComponent !== Outlet) {
        const key = matchData.key

        return {
          key,
          component: rootShellComponent,
          providers: [
            {
              provide: MATCH_CONTEXT_INJECTOR_TOKEN,
              useValue: this.nearestMatchContext,
            },
          ],
        }
      }

      const PendingComponent =
        getComponent(route.options.pendingComponent) ??
        getComponent(this.router.options.defaultPendingComponent)

      return {
        component: PendingComponent,
      }
    } else {
      const routeViewComponent =
        getComponent(route.options.component) ??
        getComponent(this.router.options.defaultComponent) ??
        Outlet

      const key = matchData.key

      return {
        key,
        component: routeViewComponent,
        providers: [
          {
            provide: MATCH_CONTEXT_INJECTOR_TOKEN,
            useValue: this.nearestMatchContext,
          },
        ],
      }
    }
  })

  onRendered = injectOnRendered({
    parentRouteIsRoot: computed(
      () => this.parentRouteIdSignal() === rootRouteId,
    ),
  })
}

@Component({
  selector: 'outlet,[outlet]',
  template: '',
  standalone: true,
})
export class Outlet {
  router = injectRouter()
  nearestMatch = inject(MATCH_CONTEXT_INJECTOR_TOKEN)

  currentMatch = computed(() => {
    const matchId = this.nearestMatch.matchId()
    return matchId
      ? this.router.stores.activeMatchStoresById.get(matchId)?.state
      : undefined
  })

  routeId = computed(() => this.currentMatch()?.routeId as string)

  route = computed(
    () => this.router.routesById[this.routeId()] as AnyRoute,
  )

  parentGlobalNotFound = computed(
    () => this.currentMatch()?.globalNotFound ?? false,
  )
  childMatchIdByRouteId = injectStore(
    this.router.stores.childMatchIdByRouteId,
    (value) => value,
  )

  childMatchId = computed(() => {
    const routeId = this.routeId()
    if (!routeId) return null
    return this.childMatchIdByRouteId()[routeId] ?? null
  })

  render = injectRender(() => {
    if (this.parentGlobalNotFound()) {
      const NotFoundComponent = getNotFoundComponent(this.router, this.route())
      return { component: NotFoundComponent }
    }
    const childMatchId = this.childMatchId()

    if (!childMatchId) {
      return null
    }

    return {
      component: RouteMatch,
      inputs: {
        matchId: () => this.childMatchId(),
      },
    }
  })
}

type CalledIfFunction<T> = T extends (...args: Array<any>) => any ? ReturnType<T> : T

function getComponent<T>(routeComponent: T): CalledIfFunction<T> {
  if (typeof routeComponent === 'function') {
    return routeComponent()
  }
  return routeComponent as any
}

function getNotFoundComponent(router: AnyRouter, route: AnyRoute) {
  const NotFoundComponent =
    getComponent(route.options.notFoundComponent) ??
    getComponent(router.options.defaultNotFoundComponent)

  if (NotFoundComponent) {
    return NotFoundComponent
  }

  if (isDevMode() && !route.options.notFoundComponent) {
    console.warn(
      `A notFoundError was encountered on the route with ID "${route.id}", but a notFoundComponent option was not configured, nor was a router level defaultNotFoundComponent configured. Consider configuring at least one of these to avoid TanStack Router's overly generic defaultNotFoundComponent (<p>Page not found</p>)`,
    )
  }

  return DefaultNotFoundComponent
}
