import { ErrorComponent, createFileRoute } from '@benjavicente/vue-router'
import { fetchPost } from '../../posts'
import type { ErrorComponentProps } from '@benjavicente/vue-router'

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params: { postId } }) => fetchPost(postId),
  errorComponent: PostErrorComponent,
  notFoundComponent: () => {
    return <p>Post not found</p>
  },
  component: PostComponent,
})

function PostErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}

function PostComponent() {
  const post = Route.useLoaderData()

  return (
    <div class="space-y-2">
      <h4 class="text-xl font-bold underline">{post.value.title}</h4>
      <div class="text-sm">{post.value.body}</div>
    </div>
  )
}
