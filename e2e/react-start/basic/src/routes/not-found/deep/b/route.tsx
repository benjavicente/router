import { Outlet, createFileRoute, notFound } from '@benjavicente/react-router'
import type { NotFoundRouteProps } from '@benjavicente/react-router'

export const Route = createFileRoute('/not-found/deep/b')({
  beforeLoad: ({ search }) => {
    if (search.throwAt === 'b') {
      throw notFound({
        data: { source: 'b-beforeLoad' },
      })
    }
  },
  component: () => <Outlet />,
  notFoundComponent: (props: NotFoundRouteProps) => (
    <div data-testid="deep-b-notFound-component">
      Not Found at /not-found/deep/b (
      {(props.data as { source?: string })?.source ?? 'unknown'})
    </div>
  ),
})
