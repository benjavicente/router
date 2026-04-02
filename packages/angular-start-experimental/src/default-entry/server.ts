import {
  createStartHandler,
  defaultRenderHandler,
} from '@tanstack/angular-start-experimental-server'
import type { Register } from '@tanstack/angular-router-experimental'
import type { RequestHandler } from '@tanstack/angular-start-experimental-server'

const fetch = createStartHandler(defaultRenderHandler)

export type ServerEntry = { fetch: RequestHandler<Register> }

export function createServerEntry(entry: ServerEntry): ServerEntry {
  return {
    async fetch(...args) {
      return await entry.fetch(...args)
    },
  }
}

export default createServerEntry({ fetch })
