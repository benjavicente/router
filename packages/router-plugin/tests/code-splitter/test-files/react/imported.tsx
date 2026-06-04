import { createFileRoute } from '@benjavicente/react-router'

import { importedComponent, importedLoader } from '../../shared'

export const Route = createFileRoute('/')({
  component: importedComponent,
  loader: importedLoader,
})
