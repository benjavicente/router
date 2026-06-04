// Valid: Sync component used in route - should NOT error
import { createFileRoute } from '@benjavicente/react-router'
import { SyncComponent } from './sync-component'

export const Route = createFileRoute(undefined)({
  component: SyncComponent,
})
