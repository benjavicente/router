import { createFileRoute } from '@benjavicente/react-router'
export const Route = createFileRoute('/posts/$postId/')({
  component: () => <div>Hello /posts/$postId/!</div>,
})
