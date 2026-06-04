import { bootstrapTanstackStartApplication } from '@benjavicente/angular-start-experimental/client'
import { App } from './app'
import { appConfig } from './app.config'

bootstrapTanstackStartApplication(App, appConfig.providers).catch((err) =>
  console.error(err),
)
