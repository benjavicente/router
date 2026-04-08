import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/about')({
  component: () => <div>About</div>,
})
