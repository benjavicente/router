import { InjectionToken } from '@angular/core'
import { provideTanStackQuery } from '@benjavicente/angular-query-experimental'
import { injectRouter } from '@benjavicente/angular-router-experimental'
import { withDevtools } from '@benjavicente/angular-query-devtools'
import type { ApplicationConfig } from '@angular/core'

export const QUERY_CLIENT = new InjectionToken('TanStackQueryClient', {
  providedIn: 'root',
  factory: () => {
    const router = injectRouter()
    return router.options.context.queryClient
  },
})

export const appConfig: ApplicationConfig = {
  providers: [provideTanStackQuery(QUERY_CLIENT, withDevtools())],
}
