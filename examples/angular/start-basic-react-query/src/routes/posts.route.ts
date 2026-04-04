import { Component, computed } from '@angular/core'
import {
  Link,
  Outlet,
  createFileRoute,
} from '@tanstack/angular-router-experimental'
import { PostsApiService } from '../posts-api.service'

export const Route = createFileRoute('/posts')({
  head: () => ({
    meta: [
      {
        title: 'Angular Start Posts',
      },
      {
        name: 'description',
        content: 'Posts route rendered through Angular Start experimental SSR.',
      },
    ],
  }),
  loader: ({ context }) => {
    const api = context.inject(PostsApiService)
    return context.queryClient.fetchQuery(api.allPostsQueryOptions())
  },
  component: () => PostsLayoutComponent,
})

@Component({
  selector: 'route-component',
  standalone: true,
  imports: [Link, Outlet],
  template: `
    <div class="grid gap-6 md:grid-cols-[16rem_1fr]">
      <div class="space-y-3">
        <p class="text-sm font-medium text-gray-600 dark:text-gray-300">
          File-based routes still work inside the scaffold.
        </p>
        <ul class="space-y-2">
          @for (post of postsWithFake(); track post.id) {
            <li>
              <a
                [link]="{
                  to: '/posts/$postId',
                  params: { postId: post.id },
                  activeProps: { class: 'border-teal-500 bg-teal-50 dark:bg-teal-950/40' }
                }"
                class="block rounded-xl border px-3 py-2 text-sm transition hover:opacity-80"
              >
                {{ post.title.substring(0, 28) }}
              </a>
            </li>
          }
        </ul>
      </div>

      <section class="rounded-xl border p-4">
        <outlet />
      </section>
    </div>
  `,
})
class PostsLayoutComponent {
  posts = Route.injectLoaderData()
  postsWithFake = computed(() => [
    ...this.posts(),
    { id: 999_999, title: 'Missing post example', body: '' },
  ])
}
