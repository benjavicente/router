import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/lazy-error')({
  loader: () => {
    throw new Error('Lazy route loader error')
  },
})
