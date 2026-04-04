import { Component, EnvironmentInjector, inject } from '@angular/core'
import { QueryClient } from '@benjavicente/angular-query-experimental'
import type { AngularInjectFn } from '@tanstack/angular-router-experimental'
import { RouterProvider } from '@tanstack/angular-router-experimental'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterProvider],
  template: '<router-provider [context]="routerContext" />',
})
export class App {
  private readonly envInjector = inject(EnvironmentInjector)
  private readonly queryClient = inject(QueryClient)

  readonly routerContext: {
    inject: AngularInjectFn
    queryClient: QueryClient
  } = {
    inject: this.envInjector.get.bind(this.envInjector) as AngularInjectFn,
    queryClient: this.queryClient,
  }
}
