import { createLazyFileRoute } from '@benjavicente/react-router'

export const Route = createLazyFileRoute('/_layout/path/')({
  component: () => 'Path Index',
})
