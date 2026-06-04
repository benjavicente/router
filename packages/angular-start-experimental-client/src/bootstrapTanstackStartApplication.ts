import { bootstrapApplication } from '@angular/platform-browser'
import {
  RouterProvider,
  provideTanstackDocument,
  provideTanstackRouter,
} from '@benjavicente/angular-router-experimental'
import { hydrateStart } from './hydrateStart'
import type { EnvironmentProviders, Provider, Type } from '@angular/core'
import type { AnyRouter } from '@benjavicente/angular-router-experimental'

let hydrationPromise: Promise<AnyRouter> | undefined
export async function bootstrapTanstackStartApplication(
  rootComponent: Type<any> = RouterProvider,
  providers: Array<Provider | EnvironmentProviders> = [],
) {
  if (!hydrationPromise) {
    hydrationPromise = hydrateStart()
  }
  const router = await hydrationPromise
  return bootstrapApplication(rootComponent, {
    providers: [
      provideTanstackRouter({ router }),
      provideTanstackDocument(router),
      ...providers,
    ],
  })
}
