import React from 'react'
import { createFileRoute } from '@benjavicente/react-router'

import { importedLoader, importedComponent } from '../../shared/imported'

export const Route = createFileRoute('/')({
  component: React.memo(importedComponent),
  loader: importedLoader,
})
