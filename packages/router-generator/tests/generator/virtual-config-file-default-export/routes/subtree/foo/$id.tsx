import { createFileRoute } from '@benjavicente/react-router'
export const Route = createFileRoute('/_layout/hello/foo/$id')({
  component: () => <div>Hello /foo/$id!</div>,
})
