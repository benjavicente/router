import '@angular/compiler'
import { mergeApplicationConfig } from '@angular/core'
import { createServerHandler } from '@benjavicente/angular-start-experimental/server'
import { App } from './app'
import { appConfig } from './app.config'
import { appConfigServer } from './app.config.server'
import type { Register } from '@benjavicente/angular-router-experimental'

export default {
  fetch: createServerHandler<Register>(
    App,
    mergeApplicationConfig(appConfig, appConfigServer),
    {
      document:
        '<!doctype html><html><head></head><body><app-root></app-root></body></html>',
    },
  ),
}
