import { Component } from '@angular/core'
import {
  Link,
  Outlet,
  createRootRoute,
} from '@tanstack/angular-router-experimental'
import { TanStackRouterDevtools } from '@tanstack/angular-router-devtools'

export const Route = createRootRoute({
  component: () => RootComponent,
  notFoundComponent: () => NotFoundComponent,
})

@Component({
  selector: 'root-route',
  standalone: true,
  imports: [Outlet, Link, TanStackRouterDevtools],
  template: `
    <div class="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-4 py-6">
      <header class="space-y-3 rounded-2xl border bg-white/80 p-5 shadow-sm dark:bg-gray-950/70">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-teal-600 dark:text-teal-300">
              Angular Start Scaffold
            </p>
            <h1 class="text-2xl font-semibold">Adapter boilerplate only</h1>
          </div>
          <nav class="flex flex-wrap gap-2 text-sm">
            <a
              [link]="{ to: '/', activeProps: { class: 'bg-teal-600 text-white' }, activeOptions: { exact: true } }"
              class="rounded-full border px-3 py-1.5 transition hover:opacity-80"
            >
              Home
            </a>
            <a
              [link]="{ to: '/posts', activeProps: { class: 'bg-teal-600 text-white' } }"
              class="rounded-full border px-3 py-1.5 transition hover:opacity-80"
            >
              Posts
            </a>
          </nav>
        </div>

        <p class="max-w-3xl text-sm text-gray-600 dark:text-gray-300">
          This example wires the Angular Start package and route-tree shape, but
          Angular SSR rendering and hydration are still deferred.
        </p>
      </header>

      <main class="rounded-2xl border bg-white/80 p-5 shadow-sm dark:bg-gray-950/70">
        <outlet />
      </main>

      <router-devtools />
    </div>
  `,
})
class RootComponent {}

@Component({
  selector: 'not-found',
  standalone: true,
  imports: [Link],
  template: `
    <div class="space-y-3">
      <p class="text-lg font-semibold">Route not found</p>
      <p class="text-sm text-gray-600 dark:text-gray-300">
        The scaffold only includes a minimal route set for now.
      </p>
      <a [link]="{ to: '/' }" class="underline">Return home</a>
    </div>
  `,
})
class NotFoundComponent {}
