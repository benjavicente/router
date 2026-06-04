import { createFileRoute } from '@benjavicente/solid-router'

export const Route = createFileRoute('/')({
  ssr: () => {
    if (typeof window === 'undefined') {
      return 'data-only'
    }
  },
  component: () => {
    return <div className="p-2">hello world</div>
  },
})
