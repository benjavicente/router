import { defineHandlerCallback } from '@benjavicente/start-server-core'
import { renderRouterToString } from '@benjavicente/solid-router/ssr/server'
import { StartServer } from './StartServer'

export const defaultRenderHandler = defineHandlerCallback(
  ({ router, responseHeaders }) =>
    renderRouterToString({
      router,
      responseHeaders,
      children: () => <StartServer router={router} />,
    }),
)
