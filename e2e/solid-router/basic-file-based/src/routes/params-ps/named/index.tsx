import { createFileRoute, redirect } from '@benjavicente/solid-router'

export const Route = createFileRoute('/params-ps/named/')({
  beforeLoad: () => {
    throw redirect({ to: '/params-ps' })
  },
})
