import { Component } from '@angular/core'
import { createFileRoute } from '@tanstack/angular-router-experimental'

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
      </ul>
    </div>
  `,
})
class IndexComponent {}
