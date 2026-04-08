import { createLazyFileRoute } from '@benjavicente/angular-router-experimental'
import { Component } from '@angular/core'

export const Route = createLazyFileRoute('/lazy')({
  component: () => LazyRouteComponent,
})

@Component({
  selector: 'lazy-route-component',
  standalone: true,
  template: `
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">Lazy route loaded</h2>
      <p class="text-sm text-gray-700 dark:text-gray-300">
        This component is loaded from a <code>.lazy.ts</code> route module, so
        the Angular Start scaffold is at least able to host router-level lazy
        route imports today.
      </p>
    </div>
  `,
})
class LazyRouteComponent {}
