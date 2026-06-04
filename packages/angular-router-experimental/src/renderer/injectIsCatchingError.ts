import * as Angular from '@angular/core'
import { injectRouter } from '../injectRouter'
import { injectRouterState } from '../injectRouterState'
import type { AnyRoute, AnyRouteMatch } from '@benjavicente/router-core'

export function injectCatchingErrorMatch({
  matchId,
}: {
  matchId: Angular.Signal<string | undefined>
}): Angular.Signal<AnyRouteMatch | undefined> {
  const router = injectRouter()

  const matches = injectRouterState({
    select: (s) => s.matches,
  })

  const matchIndex = Angular.computed(() => {
    return matches().findIndex((m) => m.id === matchId())
  })

  return Angular.computed(() => {
    // The child route will handle the error with the default error component.
    if (router.options.defaultErrorComponent != null) return undefined

    const startingIndex = matchIndex()
    if (startingIndex === -1) return undefined
    const matchesList = matches()

    for (let i = startingIndex + 1; i < matchesList.length; i++) {
      const descendant = matchesList[i]
      const route = router.routesById[descendant?.routeId] as AnyRoute
      // Is catched by a child route with an error component.
      if (route.options.errorComponent != null) return undefined

      // Found error status without error component in between.
      if (descendant?.status === 'error') return descendant
    }
    return undefined
  })
}

export function injectIsCatchingError({
  matchId,
}: {
  matchId: Angular.Signal<string | undefined>
}): Angular.Signal<boolean> {
  const catchingErrorMatch = injectCatchingErrorMatch({ matchId })

  return Angular.computed(() => {
    return catchingErrorMatch() !== undefined
  })
}
