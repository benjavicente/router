import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute(
  '/_first/_second-layout/route-without-file/layout-a',
)({
  component: () => 'Layout A',
})
