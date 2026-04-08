import { createFileRoute } from '@benjavicente/solid-router'
import { fetchPost } from '../fetch/posts'

export const Route = createFileRoute('/$postId')({
  loader: ({ params }) => fetchPost(params.postId),
})
