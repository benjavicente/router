import '@angular/compiler'
import {
  createServerHandler,
} from '@tanstack/angular-start-experimental/server'
import type { Register } from '@tanstack/angular-router-experimental'
import { TanStackStartRoot } from '@tanstack/angular-start-experimental-client'

export default {
  fetch: createServerHandler<Register>(TanStackStartRoot, { providers: [] }, {
    document:
      '<!doctype html><html><head></head><body><app-root></app-root></body></html>',
  }),
}
