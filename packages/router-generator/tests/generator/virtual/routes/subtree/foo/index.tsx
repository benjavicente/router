import { createFileRoute } from '@benjavicente/react-router'
export const Route = createFileRoute('/_layout/hello/foo/')({
  component: () => <div>Hello /foo/!</div>,
})
