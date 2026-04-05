import { createFileRoute } from '@benjavicente/react-router'

// Physical about route - conflicts with virtual about.tsx -> /about
export const Route = createFileRoute('/about')({
  component: () => <div>About (physical)</div>,
})
