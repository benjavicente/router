import * as Angular from '@angular/core'
import {
  createNonReactiveMutableStore,
  createNonReactiveReadonlyStore,
} from '@tanstack/router-core'
import { isServer } from '@tanstack/router-core/isServer'
import type {
  AnyRoute,
  GetStoreConfig,
  RouterReadableStore,
  RouterStores,
  RouterWritableStore,
} from '@tanstack/router-core'

declare module '@tanstack/router-core' {
  export interface RouterStores<in out TRouteTree extends AnyRoute> {
    childMatchIdByRouteId: RouterReadableStore<Record<string, string>>
    pendingRouteIds: RouterReadableStore<Record<string, boolean>>
  }
}

function initRouterStores(
  stores: RouterStores<AnyRoute>,
  createReadonlyStore: <TValue>(
    read: () => TValue,
  ) => RouterReadableStore<TValue>,
) {
  stores.childMatchIdByRouteId = createReadonlyStore(() => {
    const ids = stores.matchesId.state
    const result: Record<string, string> = {}

    for (let i = 0; i < ids.length - 1; i++) {
      const parentStore = stores.activeMatchStoresById.get(ids[i]!)
      if (parentStore?.routeId) {
        result[parentStore.routeId] = ids[i + 1]!
      }
    }

    return result
  })

  stores.pendingRouteIds = createReadonlyStore(() => {
    const ids = stores.pendingMatchesId.state
    const result: Record<string, boolean> = {}

    for (const id of ids) {
      const store = stores.pendingMatchStoresById.get(id)
      if (store?.routeId) {
        result[store.routeId] = true
      }
    }

    return result
  })
}

function createAngularMutableStore<TValue>(
  initialValue: TValue,
): RouterWritableStore<TValue> {
  const signal = Angular.signal(initialValue)

  return {
    get state() {
      return signal()
    },
    setState(updater) {
      signal.update(updater)
    },
  }
}

function createAngularReadonlyStore<TValue>(
  read: () => TValue,
): RouterReadableStore<TValue> {
  const computed = Angular.computed(read)

  return {
    get state() {
      return computed()
    },
  }
}

export const getStoreFactory: GetStoreConfig = (opts) => {
  if (isServer ?? opts.isServer) {
    return {
      createMutableStore: createNonReactiveMutableStore,
      createReadonlyStore: createNonReactiveReadonlyStore,
      batch: (fn) => fn(),
      init: (stores) =>
        initRouterStores(stores, createNonReactiveReadonlyStore),
    }
  }

  return {
    createMutableStore: createAngularMutableStore,
    createReadonlyStore: createAngularReadonlyStore,
    batch: (fn) => fn(),
    init: (stores) => initRouterStores(stores, createAngularReadonlyStore),
  }
}
