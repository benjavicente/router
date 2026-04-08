import '@angular/compiler'
import {
  createServerHandler,
} from '@benjavicente/angular-start-experimental/server'
import type { Register } from '@benjavicente/angular-router-experimental'
import { TanStackStartRoot } from '@benjavicente/angular-start-experimental-client'

export default {
  fetch: createServerHandler<Register>(TanStackStartRoot, { providers: [] }, {
    document:
      '<!doctype html><html><head></head><body><app-root></app-root></body></html>',
  }),
}
