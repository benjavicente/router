import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/_main/posts')({
  component: () => 'Posts List',
})
