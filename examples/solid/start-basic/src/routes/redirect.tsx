import { redirect, createFileRoute } from '@benjavicente/solid-router'

export const Route = createFileRoute('/redirect')({
  beforeLoad: async () => {
    throw redirect({
      to: '/posts',
    })
  },
})
