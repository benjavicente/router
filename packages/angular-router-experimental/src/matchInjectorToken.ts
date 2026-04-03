import * as Angular from '@angular/core'
import type { AnyRouteMatch } from '@tanstack/router-core'

export type NearestMatchContextValue = {
  matchId: () => string | undefined,
  routeId: () => string | undefined,
  match: () => AnyRouteMatch | undefined,
  hasPending: () => boolean,
}

const defaultNearestMatchContext: NearestMatchContextValue = {
  matchId: () => undefined,
  routeId: () => undefined,
  match: () => undefined,
  hasPending: () => false,
}

export const MATCH_CONTEXT_INJECTOR_TOKEN = new Angular.InjectionToken<
  NearestMatchContextValue
>('MATCH_CONTEXT_INJECTOR', {
  providedIn: 'root',
  factory: () => defaultNearestMatchContext,
})
