import { createFileRoute } from '@benjavicente/react-router'
export const Route = createFileRoute('/without-loader')({
  component: () => <div>Hello /without-loader!</div>,
})
