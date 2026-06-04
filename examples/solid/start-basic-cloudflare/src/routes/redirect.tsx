import { createFileRoute, redirect } from '@benjavicente/solid-router'

export const Route = createFileRoute('/redirect')({
  beforeLoad: () => {
    throw redirect({
      to: '/posts',
    })
  },
})
