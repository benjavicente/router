import { createFileRoute } from '@benjavicente/react-router'
export const Route = createFileRoute('/posts/')({
  component: () => <div>Hello /posts/!</div>,
})
