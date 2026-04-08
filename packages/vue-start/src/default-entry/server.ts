import {
  createStartHandler,
  defaultStreamHandler,
} from '@benjavicente/vue-start/server'
import type { Register } from '@benjavicente/vue-router'
import type { RequestHandler } from '@benjavicente/vue-start/server'

const fetch = createStartHandler(defaultStreamHandler)

// Providing `RequestHandler` from `@benjavicente/vue-start/server` is required so that the output types don't import it from `@benjavicente/start-server-core`
export type ServerEntry = { fetch: RequestHandler<Register> }

export function createServerEntry(entry: ServerEntry): ServerEntry {
  return {
    async fetch(...args) {
      return await entry.fetch(...args)
    },
  }
}

export default createServerEntry({ fetch })
