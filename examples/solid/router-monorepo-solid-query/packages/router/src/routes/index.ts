import { createFileRoute } from '@benjavicente/solid-router'
import { postsQueryOptions } from '@router-solid-mono-solid-query/post-query'

export const Route = createFileRoute('/')({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(postsQueryOptions)
  },
})
