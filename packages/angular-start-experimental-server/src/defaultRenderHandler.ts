import '@angular/compiler'
import type { ApplicationConfig, Type } from '@angular/core'
import { enableProdMode } from '@angular/core'
import { bootstrapApplication } from '@angular/platform-browser'
import { provideServerRendering, renderApplication } from '@angular/platform-server'
import {
  createStartHandler,
  defineHandlerCallback,
} from '@tanstack/start-server-core'
import {
  type Register,
  provideHeadContent,
  provideTanstackRouter,
} from '@tanstack/angular-router-experimental'
import type { RequestHandler } from '@tanstack/start-server-core'

export type CreateServerHandlerOptions = {
  /** Host document: must match the root component’s selector. */
  document: string
}

function createAngularRenderHandler(
  rootComponent: Type<any>,
  appConfig: ApplicationConfig,
  options: CreateServerHandlerOptions,
) {
  if (
    (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env
      ?.NODE_ENV === 'production'
  ) {
    enableProdMode()
  }

  const { document } = options

  return defineHandlerCallback(async ({ router, responseHeaders }) => {
    try {
      const html = await renderApplication(
        (context) =>
          bootstrapApplication(
            rootComponent,
            {
              providers: [
                provideServerRendering(),
                provideTanstackRouter({ router }),
                provideHeadContent(router),
                ...(appConfig.providers ?? []),
              ],
            },
            context,
          ),
        {
          document,
        },
      )

      return new Response(html, {
        headers: responseHeaders,
      })
    } finally {
      router.serverSsr?.cleanup()
    }
  })
}

export function createServerHandler<TRegister = Register>(
  rootComponent: Type<any>,
  appConfig: ApplicationConfig,
  options: CreateServerHandlerOptions,
): RequestHandler<TRegister> {
  return createStartHandler(
    createAngularRenderHandler(rootComponent, appConfig, options),
  )
}
