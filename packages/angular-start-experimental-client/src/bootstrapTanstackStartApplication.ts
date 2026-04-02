import { Provider, EnvironmentProviders, Type } from '@angular/core'
import { bootstrapApplication } from '@angular/platform-browser'
import {
  provideHeadContent,
  provideTanstackRouter,
  AnyRouter,
  RouterProvider,
} from '@tanstack/angular-router-experimental'
import { hydrateStart } from './hydrateStart'

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
      provideHeadContent(router),
      ...providers,
    ],
  })
}
