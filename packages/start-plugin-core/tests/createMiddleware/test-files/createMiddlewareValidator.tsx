import { createMiddleware } from '@benjavicente/react-start'
import { z } from 'zod'

export const withUseServer = createMiddleware({
  id: 'test',
})
  .inputValidator(z.number())
  .server(({ input }) => input + 1)
