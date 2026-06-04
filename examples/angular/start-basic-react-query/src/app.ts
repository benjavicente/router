import { Component } from '@angular/core'
import { RouterProvider } from '@benjavicente/angular-router-experimental'
import { TanStackRouterDevtoolsInProd } from '@benjavicente/angular-router-devtools'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterProvider, TanStackRouterDevtoolsInProd],
  template: '<router-provider/><router-devtools />',
})
export class App {}
