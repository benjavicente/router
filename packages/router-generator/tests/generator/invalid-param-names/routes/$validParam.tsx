import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/$validParam')({
  component: () => <div>Valid param</div>,
})
