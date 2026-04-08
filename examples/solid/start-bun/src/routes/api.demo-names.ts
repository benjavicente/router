import { createFileRoute } from '@benjavicente/solid-router'

export const Route = createFileRoute('/api/demo-names')({
  server: {
    handlers: {
      GET: () => {
        return new Response(JSON.stringify(['Alice', 'Bob', 'Charlie']), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      },
    },
  },
})
