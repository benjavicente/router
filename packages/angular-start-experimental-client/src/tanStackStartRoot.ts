import { Component } from '@angular/core'
import { RouterProvider } from '@tanstack/angular-router-experimental'

/**
 * Default app shell for TanStack Start Angular (matches the basic example’s `app-root` + `router-provider` layout).
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterProvider],
  template: '<router-provider />',
})
export class TanStackStartRoot {}
