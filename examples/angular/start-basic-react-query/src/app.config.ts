import { isPlatformServer } from '@angular/common'
import type { ApplicationConfig } from '@angular/core'
import { InjectionToken, PLATFORM_ID, inject } from '@angular/core'
import {
  QueryClient,
  provideTanStackQuery,
} from '@benjavicente/angular-query-experimental'

export const QUERY_CLIENT = new InjectionToken<QueryClient>('TanStackQueryClient', {
  providedIn: 'root',
  factory: () => {
    const platformId = inject(PLATFORM_ID)
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 30,
          gcTime: 1000 * 60 * 60 * 24,
          retry: !isPlatformServer(platformId),
        },
      },
    })
  },
})

export const appConfig: ApplicationConfig = {
  providers: [provideTanStackQuery(QUERY_CLIENT)],
}
