import { createFileRoute, redirect } from '@benjavicente/react-router'

export const Route = createFileRoute('/redirect')({
  beforeLoad: () => {
    throw redirect({
      to: '/posts',
    })
  },
})
