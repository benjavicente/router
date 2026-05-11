// Route with inline arrow function that renders async component
import { createFileRoute } from '@benjavicente/react-router'
import { InlineAsyncComponent } from './inline-async-component'

export const Route = createFileRoute(undefined)({
  component: () => <InlineAsyncComponent />,
})
