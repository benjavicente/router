import {
  createServerHandler,
} from '@tanstack/angular-start-experimental/server'
import type { Register } from '@tanstack/angular-router-experimental'
import type { RequestHandler } from '@tanstack/angular-start-experimental/server'
import { App } from './app'
import { appConfig } from './app.config'
import { appConfigServer } from './app.config.server'

const fetch = createServerHandler<Register>(App, appConfig, {
  document: '<!doctype html><html><head></head><body><app-root></app-root></body></html>',
  serverAppConfig: appConfigServer,
})

export type ServerEntry = { fetch: RequestHandler<Register> }

export function createServerEntry(entry: ServerEntry): ServerEntry {
  return {
    async fetch(...args) {
      return await entry.fetch(...args)
    },
  }
}

export default createServerEntry({ fetch })
