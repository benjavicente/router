import { createFileRoute } from '@benjavicente/react-router'

// Test errorComponent with false literal
export const Route = createFileRoute('/test')({
  component: () => <div>Test Component</div>,
  errorComponent: false,
  pendingComponent: null,
  loader: async () => ({ data: 'test' }),
})
