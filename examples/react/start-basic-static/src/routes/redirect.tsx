import { redirect, createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/redirect')({
  beforeLoad: async () => {
    throw redirect({
      to: '/posts',
    })
  },
})
