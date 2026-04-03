import '@angular/compiler'
import { mergeApplicationConfig } from '@angular/core'
import {
  createServerHandler,
} from '@tanstack/angular-start-experimental/server'
import type { Register } from '@tanstack/angular-router-experimental'
import { App } from './app'
import { appConfig } from './app.config'
import { appConfigServer } from './app.config.server'

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
