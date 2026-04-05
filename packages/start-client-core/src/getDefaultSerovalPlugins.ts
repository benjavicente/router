import {
  makeSerovalPlugin,
  defaultSerovalPlugins as routerDefaultSerovalPlugins,
} from '@benjavicente/router-core'
import { getStartOptions } from './getStartOptions'
import type { AnySerializationAdapter } from '@benjavicente/router-core'

export function getDefaultSerovalPlugins() {
  const start = getStartOptions()
  const adapters = start?.serializationAdapters as
    | Array<AnySerializationAdapter>
    | undefined
  return [
    ...(adapters?.map(makeSerovalPlugin) ?? []),
    ...routerDefaultSerovalPlugins,
  ]
}
