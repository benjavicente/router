import { createFileRoute } from '@benjavicente/solid-router'

export const Route = createFileRoute('/')({
  ssr: false,
  component: () => {
    return <div className="p-2">hello world</div>
  },
})
