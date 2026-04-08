import { Component } from '@angular/core'
import {
  createFileRoute,
  injectErrorState,
} from '@benjavicente/angular-router-experimental'
import { postQueryOptions } from '../postsQueries'

export const Route = createFileRoute('/posts/$postId')({
  loader: ({ context, params }) => {
    return context.queryClient.ensureQueryData(postQueryOptions(params.postId))
  },
  head: ({ loaderData, params }) => ({
    meta: [
      {
        title: loaderData?.title ?? `Post ${params.postId}`,
      },
      {
        name: 'description',
        content:
          loaderData?.body?.slice(0, 120) ??
          `Post detail route for ${params.postId}.`,
      },
    ],
  }),
  errorComponent: () => PostErrorComponent,
  notFoundComponent: () => PostNotFoundComponent,
  pendingComponent: () => PostPendingComponent,
  component: () => PostComponent,
})

@Component({
  selector: 'post-error',
  standalone: true,
  template: `
    <div class="space-y-3">
      <p class="font-semibold">Post loader failed</p>
      <p class="text-sm text-gray-600 dark:text-gray-300">
        {{ errorState().error.message }}
      </p>
      <button
        class="rounded-lg border px-3 py-1.5 text-sm"
        (click)="errorState().reset()"
      >
        Reset
      </button>
    </div>
  `,
})
class PostErrorComponent {
  errorState = injectErrorState()
}

@Component({
  selector: 'post-not-found',
  standalone: true,
  template: `<p>Post not found.</p>`,
})
class PostNotFoundComponent {}

@Component({
  selector: 'post-pending',
  standalone: true,
  template: `
    <div class="space-y-3" aria-busy="true" aria-label="Loading post">
      <p
        class="text-xs font-semibold uppercase tracking-[0.25em] text-teal-600/70 dark:text-teal-300/70"
      >
        Loading post
      </p>
      <div class="h-7 w-3/4 max-w-md animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
      <div class="space-y-2">
        <div class="h-3 w-full animate-pulse rounded bg-gray-100 dark:bg-gray-900"></div>
        <div class="h-3 w-full animate-pulse rounded bg-gray-100 dark:bg-gray-900"></div>
        <div class="h-3 w-5/6 animate-pulse rounded bg-gray-100 dark:bg-gray-900"></div>
      </div>
    </div>
  `,
})
class PostPendingComponent {}

@Component({
  selector: 'route-component',
  standalone: true,
  template: `
    <div class="space-y-3">
      <p
        class="text-xs font-semibold uppercase tracking-[0.25em] text-teal-600 dark:text-teal-300"
      >
        Scaffolded loader route
      </p>
      <h3 class="text-xl font-semibold">{{ post().title }}</h3>
      <p class="text-sm text-gray-700 dark:text-gray-300">{{ post().body }}</p>
    </div>
  `,
})
class PostComponent {
  post = Route.injectLoaderData()
}
