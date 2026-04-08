import { createFileRoute } from '@benjavicente/react-router'

export const { apiUrl, timeout } = getConfig()

export const Route = createFileRoute('/config')({
  loader: async () => fetch(apiUrl),
  component: () => <div>Timeout: {timeout}</div>,
})

function getConfig() {
  return { apiUrl: '/api', timeout: 5000 }
}
