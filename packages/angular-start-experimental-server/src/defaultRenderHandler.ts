import '@angular/compiler'
import * as angularCore from '@angular/core'
import { bootstrapApplication } from '@angular/platform-browser'
import {
  provideServerRendering,
  renderApplication,
} from '@angular/platform-server'
import {
  createStartHandler,
  defineHandlerCallback,
} from '@benjavicente/start-server-core'
import {
  provideTanstackDocument,
  provideTanstackRouter,
} from '@benjavicente/angular-router-experimental'
import type { Register } from '@benjavicente/angular-router-experimental'
import type { ApplicationConfig, Type } from '@angular/core'
import type { RequestHandler } from '@benjavicente/start-server-core'

/** Angular internal Console DI class; property name is U+0275 + "Console" (ASCII-only lookup for Vite SSR inliner). */
const ngConsoleToken = (angularCore as Record<string, unknown>)[
  `${String.fromCharCode(0x275)}Console`
] as any

export type CreateServerHandlerOptions = {
  /** Host document: must match the root component's selector. */
  document: string
}

const angularDevModeBootstrapLog = 'Angular is running in development mode.'

function createQuietAngularConsole(): {
  log: (message: string) => void
  warn: (message: string) => void
} {
  const ConsoleCtor = ngConsoleToken as new () => {
    log: (message: string) => void
    warn: (message: string) => void
  }
  const instance = new ConsoleCtor()
  const baseLog = instance.log.bind(instance)
  instance.log = (message: string) => {
    if (message === angularDevModeBootstrapLog) {
      return
    }
    baseLog(message)
  }
  return instance
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
    angularCore.enableProdMode()
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
                provideTanstackDocument(router),
                {
                  provide: ngConsoleToken,
                  useFactory: createQuietAngularConsole,
                },
                ...appConfig.providers,
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
