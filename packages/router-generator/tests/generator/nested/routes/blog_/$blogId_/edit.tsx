import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/blog_/$blogId_/edit')({
  component: () => <div>Hello /blog_/$blogId_/edit!</div>,
})
