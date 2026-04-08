import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/$user-name')({
  component: () => <div>Invalid param with hyphen</div>,
})
