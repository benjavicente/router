import { bootstrapApplication } from '@angular/platform-browser'
import { provideServerRendering, renderApplication } from '@angular/platform-server'
import { defineHandlerCallback } from '@tanstack/start-server-core'
import { RouterProvider, provideTanstackRouter } from "@tanstack/angular-router-experimental"

export const defaultRenderHandler = defineHandlerCallback(async ({ router, responseHeaders }) => {
  const htmlPromise = renderApplication(
      (context) =>
      bootstrapApplication(RouterProvider, {
        providers: [
          provideServerRendering(),
          provideTanstackRouter({ router }),
        ],
      }, context),
    {
      document:
        '<!doctype html><html><body router-provider></body></html>',
    },
  )
  return new Response(await htmlPromise, {
    headers: responseHeaders,
  })
})
