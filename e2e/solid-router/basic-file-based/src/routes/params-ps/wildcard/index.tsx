import { createFileRoute } from '@benjavicente/solid-router'
import { redirect } from '@benjavicente/solid-router'

export const Route = createFileRoute('/params-ps/wildcard/')({
  beforeLoad: () => {
    throw redirect({ to: '/params-ps' })
  },
})
