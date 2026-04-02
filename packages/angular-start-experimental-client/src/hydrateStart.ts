import {
  TSS_SERVER_FUNCTION,
} from '@tanstack/start-client-core'
import { createClientRpc } from '@tanstack/start-client-core/client-rpc'
import {
  createSerializationAdapter,
  type AnyRouter,
  type AnySerializationAdapter,
} from '@tanstack/router-core'
import { hydrate } from '@tanstack/router-core/ssr/client'
// eslint-disable-next-line import/no-duplicates,import/order
import { getRouter } from '#tanstack-router-entry'

const ServerFunctionSerializationAdapter = createSerializationAdapter({
  key: '$TSS/serverfn',
  test: (value): value is { functionId: string } => {
    if (typeof value !== 'function') {
      return false
    }

    if (!(TSS_SERVER_FUNCTION in value)) {
      return false
    }

    return !!value[TSS_SERVER_FUNCTION]
  },
  toSerializable: ({ functionId }) => ({ functionId }),
  fromSerializable: ({ functionId }) => createClientRpc(functionId),
})

export async function hydrateStart(): Promise<AnyRouter> {
  const router = await getRouter()
  const serializationAdapters: Array<AnySerializationAdapter> = []
  const basepath = (
    import.meta as ImportMeta & {
      env?: {
        TSS_ROUTER_BASEPATH?: string
      }
    }
  ).env?.TSS_ROUTER_BASEPATH

  ;(
    window as Window & {
      __TSS_START_OPTIONS__?: {
        serializationAdapters: Array<AnySerializationAdapter>
      }
    }
  ).__TSS_START_OPTIONS__ = {
    serializationAdapters,
  }

  serializationAdapters.push(ServerFunctionSerializationAdapter)
  if (router.options.serializationAdapters) {
    serializationAdapters.push(...router.options.serializationAdapters)
  }

  router.update({
    ...(basepath ? { basepath } : {}),
    ...{ serializationAdapters },
  })

  if (!router.state.matches.length) {
    await hydrate(router)
  }

  return router
}
