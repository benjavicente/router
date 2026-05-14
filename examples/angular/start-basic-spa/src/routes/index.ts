import { Component } from '@angular/core'
import { createFileRoute } from '@benjavicente/angular-router-experimental'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      {
        title: 'Angular Start SPA Mode Home',
      },
      {
        name: 'description',
        content: 'Home page for the Angular Start SPA mode example.',
      },
    ],
  }),
  component: () => IndexComponent,
})

@Component({
  selector: 'route-component-index',
  standalone: true,
  template: `
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">SPA mode status</h2>
      <ul
        class="list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300"
      >
        <li>Angular Start is configured with <code>spa.enabled</code>.</li>
        <li>
          The production build emits a shell at <code>/_shell.html</code>.
        </li>
        <li>Client-side navigation still uses file-based Angular routes.</li>
        <li>
          The shell can be deployed behind a CDN rewrite for unknown paths.
        </li>
      </ul>
    </div>
  `,
})
class IndexComponent {}
