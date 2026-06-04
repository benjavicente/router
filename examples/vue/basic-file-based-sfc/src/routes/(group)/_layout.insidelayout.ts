import { createFileRoute } from '@benjavicente/vue-router'
import { z } from 'zod'
import { zodValidator } from '@benjavicente/zod-adapter'

export const Route = createFileRoute('/(group)/_layout/insidelayout')({
  validateSearch: zodValidator(z.object({ hello: z.string().optional() })),
})
