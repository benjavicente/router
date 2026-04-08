import { defineHandlerCallback } from '@benjavicente/router-core/ssr/server'
import { renderRouterToString } from './renderRouterToString'
import { RouterServer } from './RouterServer'

export const defaultRenderHandler = defineHandlerCallback(
  ({ router, responseHeaders }) =>
    renderRouterToString({
      router,
      responseHeaders,
      App: RouterServer,
    }),
)
