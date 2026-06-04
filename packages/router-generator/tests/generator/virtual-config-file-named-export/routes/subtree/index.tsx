import { createFileRoute } from '@benjavicente/react-router'
export const Route = createFileRoute('/_layout/hello/')({
  component: () => <div>Hello /!</div>,
})
