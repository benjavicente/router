import { createFileRoute } from '@benjavicente/react-router'
import { z } from 'zod'
import { zodValidator } from '@benjavicente/zod-adapter'

export const Route = createFileRoute('/(group)/lazyinside')({
  validateSearch: zodValidator(z.object({ hello: z.string().optional() })),
})
