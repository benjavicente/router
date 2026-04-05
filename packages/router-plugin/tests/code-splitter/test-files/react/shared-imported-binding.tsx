import { createFileRoute } from '@benjavicente/react-router'
import { sharedUtil } from '../utils'

export const Route = createFileRoute('/imported')({
  loader: async () => sharedUtil('load'),
  component: () => <div>{sharedUtil('render')}</div>,
})
