import { createFileRoute } from '@benjavicente/react-router'
import { redirect } from '@benjavicente/react-router'

export const Route = createFileRoute('/params-ps/wildcard/')({
  beforeLoad: () => {
    throw redirect({ to: '/params-ps' })
  },
})
