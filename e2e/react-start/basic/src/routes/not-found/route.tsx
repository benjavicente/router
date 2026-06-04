import { createFileRoute } from '@benjavicente/react-router'
import z from 'zod'

export const Route = createFileRoute('/not-found')({
  validateSearch: z.object({
    preload: z.literal(false).optional(),
  }),
})
