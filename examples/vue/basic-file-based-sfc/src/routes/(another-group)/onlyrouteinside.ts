import { createFileRoute } from '@benjavicente/vue-router'
import { z } from 'zod'
import { zodValidator } from '@benjavicente/zod-adapter'

export const Route = createFileRoute('/(another-group)/onlyrouteinside')({
  validateSearch: zodValidator(z.object({ hello: z.string().optional() })),
})
