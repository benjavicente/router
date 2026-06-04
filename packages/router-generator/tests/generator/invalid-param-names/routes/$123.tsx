import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/$123')({
  component: () => <div>Invalid param starting with number</div>,
})
