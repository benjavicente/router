import { createFileRoute } from '@benjavicente/react-router'

const collection = { name: 'todos', preload: async () => {} }

export const Route = createFileRoute('/todos')({
  loader: async () => {
    await collection.preload()
    return { data: 'loaded' }
  },
  component: () => <div>{collection.name}</div>,
})
