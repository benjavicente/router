import * as Angular from '@angular/core'
import {
  AnyRoute,
  AnyRouter,
  getLocationChangeInfo,
  rootRouteId,
} from '@tanstack/router-core'
import { injectRouter } from './injectRouter'
import { injectStore } from './injectStore'
import { DefaultNotFoundComponent } from './DefaultNotFound'
import {
  MATCH_CONTEXT_INJECTOR_TOKEN,
  type NearestMatchContextValue,
} from './matchInjectorToken'
import { injectRender } from './renderer/injectRender'
import { ERROR_STATE_INJECTOR_TOKEN } from './injectErrorState'
import { injectIsCatchingError } from './renderer/injectIsCatchingError'

// In Angular, there is not concept of suspense or error boundaries,
// so we dont' need to wrap the inner content of the match.
// So in this adapter, we use derived state instead of state boundaries.

// Equivalent to the OnRendered component.
function injectOnRendered({
  parentRouteIsRoot,
}: {
  parentRouteIsRoot: Angular.Signal<boolean>
}) {
  const router = injectRouter({ warn: false })
  const location = injectStore(
    router.stores.resolvedLocation,
    (resolvedLocation) => resolvedLocation?.state.__TSR_key,
  )
  const currentLocation = injectStore(router.stores.location, (value) => value)
  const resolvedLocation = injectStore(
    router.stores.resolvedLocation,
    (value) => value,
  )

  Angular.effect(() => {
    if (!parentRouteIsRoot()) return
    location() // Track location

    router.emit({
      type: 'onRendered',
      ...getLocationChangeInfo(
        currentLocation(),
        resolvedLocation(),
      ),
    })
  })
}

@Angular.Component({
  selector: 'router-match,[router-match]',
  template: '',
  standalone: true,
  host: {
    '[attr.data-matchId]': 'matchId()',
  },
})
export class RouteMatch {
  matchId = Angular.input.required<string>()

  router = injectRouter()

  match = Angular.computed(() => {
    const matchId = this.matchId()
    return matchId
      ? this.router.stores.activeMatchStoresById.get(matchId)?.state
      : undefined
  })

  matchData = Angular.computed(() => {
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

  isFistRouteInRouteTree = Angular.computed(
    () => this.matchData()?.parentRouteId === rootRouteId,
  )

  resolvedNoSsr = Angular.computed(() => {
    const match = this.matchData()?.match
    if (!match) return true
    return match.ssr === false || match.ssr === 'data-only'
  })

  shouldClientOnly = Angular.computed(() => {
    const match = this.matchData()?.match
    if (!match) return true
    return this.resolvedNoSsr() || !!match._displayPending
  })


  parentRouteIdSignal = Angular.computed(
    () => this.matchData()?.parentRouteId ?? '',
  )
  rootRouteIdSignal = Angular.computed(() => rootRouteId)

  onRendered = injectOnRendered({
    parentRouteIsRoot: Angular.computed(
      () => this.parentRouteIdSignal() === rootRouteId,
    ),
  })

  hasPendingMatch = Angular.computed(() => {
    const routeId = this.matchData()?.route.id
    return routeId ? Boolean(this.pendingRouteIds()[routeId]) : false
  })
  pendingRouteIds = injectStore(this.router.stores.pendingRouteIds, (ids) => ids)
  nearestMatchContext: NearestMatchContextValue = {
    matchId: this.matchId,
    routeId: Angular.computed(() => this.matchData()?.route.id),
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
    } else if (
      match.status === 'redirected' ||
      match.status === 'pending' ||
      this.hasPendingMatch()
    ) {
      const PendingComponent =
        getComponent(route.options.pendingComponent) ??
        getComponent(this.router.options.defaultPendingComponent)

      return {
        component: PendingComponent,
      }
    } else {
      const Component =
        getComponent(route.options.component) ??
        getComponent(this.router.options.defaultComponent) ??
        Outlet

      const key = matchData.key

      return {
        key,
        component: Component,
        providers: [
          {
            provide: MATCH_CONTEXT_INJECTOR_TOKEN,
            useValue: this.nearestMatchContext,
          },
        ],
      }
    }

  })
}

@Angular.Component({
  selector: 'outlet,[outlet]',
  template: '',
  standalone: true,
})
export class Outlet {
  router = injectRouter()
  nearestMatch = Angular.inject(MATCH_CONTEXT_INJECTOR_TOKEN)

  currentMatch = Angular.computed(() => {
    const matchId = this.nearestMatch.matchId()
    return matchId
      ? this.router.stores.activeMatchStoresById.get(matchId)?.state
      : undefined
  })

  routeId = Angular.computed(() => this.currentMatch()?.routeId as string)

  route = Angular.computed(
    () => this.router.routesById[this.routeId()] as AnyRoute,
  )

  parentGlobalNotFound = Angular.computed(
    () => this.currentMatch()?.globalNotFound ?? false,
  )
  childMatchIdByRouteId = injectStore(
    this.router.stores.childMatchIdByRouteId,
    (value) => value,
  )

  childMatchId = Angular.computed(() => {
    const routeId = this.routeId()
    if (!routeId) return null
    return this.childMatchIdByRouteId()[routeId] ?? null
  })

  render = injectRender(() => {
    if (this.parentGlobalNotFound()) {
      // Render not found with warning
      const NotFoundComponent = getNotFoundComponent(this.router, this.route())
      return { component: NotFoundComponent }
    }
    const childMatchId = this.childMatchId()

    if (!childMatchId) {
      // Do not render anything
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

function getNotFoundComponent(router: AnyRouter, route: AnyRoute) {
  const NotFoundComponent =
    getComponent(route.options.notFoundComponent) ??
    getComponent(router.options.defaultNotFoundComponent)

  if (NotFoundComponent) {
    return NotFoundComponent
  }

  if (Angular.isDevMode() && !route.options.notFoundComponent) {
    console.warn(
      `A notFoundError was encountered on the route with ID "${route.id}", but a notFoundComponent option was not configured, nor was a router level defaultNotFoundComponent configured. Consider configuring at least one of these to avoid TanStack Router's overly generic defaultNotFoundComponent (<p>Page not found</p>)`,
    )
  }

  return DefaultNotFoundComponent
}

type CalledIfFunction<T> = T extends (...args: Array<any>) => any ? ReturnType<T> : T

function getComponent<T>(routeComponent: T): CalledIfFunction<T> {
  if (typeof routeComponent === 'function') {
    return routeComponent()
  }
  return routeComponent as any
}
