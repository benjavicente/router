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
  // eslint-disable-next-line unused-imports/no-unused-vars -- generic must match upstream `RouterStores<TRouteTree>` for augmentation
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
      const matchId = ids[i]
      const childId = ids[i + 1]
      if (matchId === undefined || childId === undefined) continue
      const parentStore = stores.activeMatchStoresById.get(matchId)
      if (parentStore?.routeId) {
        result[parentStore.routeId] = childId
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
  const useNonReactive =
    typeof isServer === 'boolean' ? isServer : !!opts.isServer
  if (useNonReactive) {
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
