import { createFileRoute } from '@benjavicente/react-router'

const loaderHelper = () => fetch('/api')
const ComponentHelper = () => <span>helper</span>

export const Route = createFileRoute('/clean')({
  loader: async () => loaderHelper(),
  component: () => (
    <div>
      <ComponentHelper />
    </div>
  ),
})
