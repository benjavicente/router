import { createFileRoute } from '@benjavicente/vue-router'

export const Route = createFileRoute('/search-params')({
  beforeLoad: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { hello: 'world' as string }
  },
})
