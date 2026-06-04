import type { GetRoutesByFileMapResult } from '@benjavicente/router-generator'

export type RouterPluginContext = {
  routesByFile: GetRoutesByFileMapResult
}

export function createRouterPluginContext(): RouterPluginContext {
  return {
    routesByFile: new Map(),
  }
}
