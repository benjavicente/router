import { Component } from '@angular/core'
import { RouterProvider } from '@tanstack/angular-router-experimental'
import { routerState } from './router-state'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterProvider],
  template: `
    @if (router(); as routerInstance) {
      <router-provider [router]="routerInstance" />
    } @else {
      <div class="mx-auto max-w-3xl p-6 text-sm text-gray-600 dark:text-gray-300">
        Bootstrapping Angular Start scaffold...
      </div>
    }
  `,
})
export class App {
  router = routerState
}
