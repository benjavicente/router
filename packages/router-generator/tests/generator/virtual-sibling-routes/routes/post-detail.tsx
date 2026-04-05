import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/_main/posts/$id')({
  component: () => 'Post Detail',
})
