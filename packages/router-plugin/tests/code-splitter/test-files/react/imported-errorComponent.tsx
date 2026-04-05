import { createFileRoute } from '@benjavicente/react-router'

import ImportedDefaultComponent, {
  importedErrorComponent,
} from '../../shared/imported'

export const Route = createFileRoute('/')({
  component: ImportedDefaultComponent,
  errorComponent: importedErrorComponent,
})
