import { createFileRoute } from '@benjavicente/react-router'

import ImportedDefaultComponent, {
  importedPendingComponent,
} from '../../shared/imported'

export const Route = createFileRoute('/')({
  component: ImportedDefaultComponent,
  pendingComponent: importedPendingComponent,
})
