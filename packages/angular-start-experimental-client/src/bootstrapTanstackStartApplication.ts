import { Provider, EnvironmentProviders } from '@angular/core'
import { bootstrapApplication } from '@angular/platform-browser'
import { provideTanstackRouter, AnyRouter, RouterProvider } from '@tanstack/angular-router-experimental'
import { hydrateStart } from './hydrateStart'

let hydrationPromise: Promise<AnyRouter> | undefined
export async function bootstrapTanstackStartApplication(providers: Array<Provider | EnvironmentProviders>) {
  if (!hydrationPromise) {
    hydrationPromise = hydrateStart()
  }
  const router = await hydrationPromise
  return bootstrapApplication(RouterProvider, {
    providers: [
      provideTanstackRouter({ router }),
      ...providers,
    ],
  })
}
