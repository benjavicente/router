import { Component } from '@angular/core'
import { createFileRoute } from '@benjavicente/angular-router-experimental'
import { injectQuery } from '@benjavicente/angular-query-experimental'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      {
        title: 'Angular Start Basic Home',
      },
      {
        name: 'description',
        content: 'Home page for the Angular Start experimental scaffold example.',
      },
    ],
  }),
  component: () => IndexComponent,
})

@Component({
  selector: 'route-component',
  standalone: true,
  template: `
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">Scaffold status</h2>
      <ul class="list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
        <li>The Angular Start packages exist and export the shared Start surface.</li>
        <li>The Vite plugin now treats Angular as a first-class Start framework.</li>
        <li>Client bootstrap now hydrates through the Angular Start experimental client package.</li>
        <li>Server rendering now runs through a minimal Angular Start handler and document manager.</li>
        <li>
          TanStack Query (Angular) is provided via
          <code class="rounded bg-gray-100 px-1 dark:bg-gray-800">provideTanStackQuery</code>
          with devtools in development.
        </li>
      </ul>

      <div
        class="rounded-xl border border-teal-200 bg-teal-50/80 p-4 text-sm dark:border-teal-900 dark:bg-teal-950/40"
      >
        @if (helloQuery.isPending()) {
          <p class="text-gray-600 dark:text-gray-300">Loading sample query…</p>
        } @else if (helloQuery.isError()) {
          <p class="text-red-600">Query failed</p>
        } @else {
          <p class="font-medium text-teal-900 dark:text-teal-100">
            {{ helloQuery.data() }}
          </p>
        }
      </div>
    </div>
  `,
})
class IndexComponent {
  helloQuery = injectQuery(() => ({
    queryKey: ['angular-start', 'hello'],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 150))
      return 'TanStack Query + Angular Start'
    },
  }))
}
