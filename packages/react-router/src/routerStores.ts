import { batch, createStore } from '@tanstack/react-store'
import {
  createNonReactiveMutableStore,
  createNonReactiveReadonlyStore,
} from '@benjavicente/router-core'
import { isServer } from '@benjavicente/router-core/isServer'
import type { Readable } from '@tanstack/react-store'
import type { GetStoreConfig } from '@benjavicente/router-core'

declare module '@benjavicente/router-core' {
  export interface RouterReadableStore<TValue> extends Readable<TValue> {}
}
export const getStoreFactory: GetStoreConfig = (opts) => {
  if (isServer ?? opts.isServer) {
    return {
      createMutableStore: createNonReactiveMutableStore,
      createReadonlyStore: createNonReactiveReadonlyStore,
      batch: (fn) => fn(),
    }
  }
  return {
    createMutableStore: createStore,
    createReadonlyStore: createStore,
    batch: batch,
  }
}
