import { Component } from '@angular/core'
import { createFileRoute } from '@tanstack/angular-router-experimental'

export const Route = createFileRoute('/')({
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
        <li>Client bootstrap is scaffolded, but Angular hydration APIs are still pending.</li>
        <li>Server rendering intentionally returns a placeholder response for now.</li>
      </ul>
    </div>
  `,
})
class IndexComponent {}
