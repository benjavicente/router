import { createFileRoute, redirect } from '@benjavicente/react-router'

export const Route = createFileRoute('/redirect')({
  beforeLoad: () => {
    throw redirect({ to: '/' })
  },
  head: () => ({
    links: [{ rel: 'preconnect', href: 'https://redirect-dynamic.test' }],
  }),
  component: () => null,
})
