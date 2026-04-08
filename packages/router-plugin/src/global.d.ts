/* eslint-disable no-var */
import type { GetRoutesByFileMapResult } from '@benjavicente/router-generator'

declare global {
  var TSR_ROUTES_BY_ID_MAP: GetRoutesByFileMapResult | undefined
}
export {}
