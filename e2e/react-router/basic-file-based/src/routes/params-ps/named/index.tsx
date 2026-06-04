import { createFileRoute, redirect } from '@benjavicente/react-router'

export const Route = createFileRoute('/params-ps/named/')({
  beforeLoad: () => {
    throw redirect({ to: '/params-ps' })
  },
})
