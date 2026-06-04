import { defineHandlerCallback } from '@benjavicente/start-server-core'
import { renderRouterToStream } from '@benjavicente/solid-router/ssr/server'
import { StartServer } from './StartServer'

export const defaultStreamHandler = defineHandlerCallback(
  async ({ request, router, responseHeaders }) =>
    await renderRouterToStream({
      request,
      router,
      responseHeaders,
      children: () => <StartServer router={router} />,
    }),
)
