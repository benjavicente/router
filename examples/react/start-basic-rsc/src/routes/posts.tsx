import { createFileRoute } from '@benjavicente/react-router'
import { createServerFn, renderRsc } from '@benjavicente/react-start'
import { renderPosts } from '~/utils/renderPosts'

export const serverRenderPosts = createServerFn({ method: 'GET' }).handler(
  renderPosts,
)

export const Route = createFileRoute('/posts')({
  loader: async () => serverRenderPosts(),
  component: PostsComponent,
})

function PostsComponent() {
  return renderRsc(Route.useLoaderData())
}
