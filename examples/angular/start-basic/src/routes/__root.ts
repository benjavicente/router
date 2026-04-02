import { Component } from '@angular/core'
import type { AngularInjectFn } from '@tanstack/angular-router-experimental'
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/angular-router-experimental'
import { TanStackRouterDevtools } from '@tanstack/angular-router-devtools'
import stylesUrl from '../styles.css?url'

export const Route = createRootRouteWithContext<{
  inject: AngularInjectFn
}>()({
  head: () => ({
    meta: [
      {
        title: 'Angular Start Basic',
      },
      {
        name: 'description',
        content: 'An Angular Start scaffold wired through the current experimental adapter.',
      },
    ],
    scripts: [
      {
        type: 'application/json',
        children: '{"adapter":"angular-start","scope":"head"}',
      },
    ],
    links: [
      { rel: 'stylesheet', href: stylesUrl },
    ]
  }),
  scripts: () => [
    {
      type: 'application/json',
      children: '{"adapter":"angular-start","scope":"body"}',
    },
  ],
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
              [link]="{ to: '/lazy', activeProps: { class: 'bg-teal-600 text-white' } }"
              class="rounded-full border px-3 py-1.5 transition hover:opacity-80"
            >
              Lazy
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
          This example now boots through the Angular Start adapter with document
          head and script management wired through the current experimental setup.
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
