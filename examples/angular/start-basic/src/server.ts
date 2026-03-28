import type { Register } from '@tanstack/angular-router-experimental'
import type { RequestHandler } from '@tanstack/angular-start-experimental/server'
import { appConfigServer } from './app/app.config.server'

// TODO(angular-start-example): replace this with Angular-specific server app
// setup once Start defines how server-side providers and document rendering are
// composed for Angular.
void appConfigServer

const fetch: RequestHandler<Register> = async () =>
  new Response(
    'Angular Start SSR and hydration are intentionally not implemented in this scaffold yet.',
    {
      status: 501,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    },
  )

export type ServerEntry = { fetch: RequestHandler<Register> }

export function createServerEntry(entry: ServerEntry): ServerEntry {
  return {
    async fetch(...args) {
      return await entry.fetch(...args)
    },
  }
}

export default createServerEntry({ fetch })
