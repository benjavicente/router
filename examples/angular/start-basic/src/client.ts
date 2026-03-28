import { bootstrapApplication } from '@angular/platform-browser'
import { hydrateStart } from '@tanstack/angular-start-experimental/client'
import { App } from './app/app'
import { appConfig } from './app/app.config'
import { routerState } from './app/router-state'
import './styles.css'

void hydrateStart().then((router) => {
  routerState.set(router)
})

// TODO(angular-start-example): keep this file as bootstrap-only once Angular
// Start finalizes shared application providers and hydration setup.
bootstrapApplication(App, appConfig).catch((err) => console.error(err))
