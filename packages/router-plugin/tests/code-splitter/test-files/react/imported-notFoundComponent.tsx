import { createFileRoute } from '@benjavicente/react-router'

import ImportedDefaultComponent, {
  importedNotFoundComponent,
} from '../../shared/imported'

export const Route = createFileRoute('/')({
  component: ImportedDefaultComponent,
  notFoundComponent: importedNotFoundComponent,
})
