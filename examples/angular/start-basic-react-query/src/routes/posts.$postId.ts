import { Component } from '@angular/core'
import {
  createFileRoute,
  injectErrorState,
} from '@tanstack/angular-router-experimental'
import { PostsApiService } from '../posts-api.service'

export const Route = createFileRoute('/posts/$postId')({
  loader: ({ context, params }) => {
    const api = context.inject(PostsApiService)
    return context.queryClient.fetchQuery(api.postQueryOptions(params.postId))
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
      <button class="rounded-lg border px-3 py-1.5 text-sm" (click)="errorState().reset()">
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
  selector: 'route-component',
  standalone: true,
  template: `
    <div class="space-y-3">
      <p class="text-xs font-semibold uppercase tracking-[0.25em] text-teal-600 dark:text-teal-300">
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
