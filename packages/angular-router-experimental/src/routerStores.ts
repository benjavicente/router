import { batch, createAtom } from '@tanstack/store'
import {
  createNonReactiveMutableStore,
  createNonReactiveReadonlyStore,
} from '@benjavicente/router-core'
import { isServer } from '@benjavicente/router-core/isServer'
import type { Readable } from '@tanstack/store'
import type {
  AnyRoute,
  GetStoreConfig,
  RouterReadableStore,
  RouterStores,
  RouterWritableStore,
} from '@benjavicente/router-core'

declare module '@benjavicente/router-core' {
  export interface RouterReadableStore<TValue> extends Readable<TValue> {}

  // eslint-disable-next-line unused-imports/no-unused-vars -- generic must match upstream `RouterStores<TRouteTree>` for augmentation
  export interface RouterStores<in out TRouteTree extends AnyRoute> {
    /** Maps each active routeId to the matchId of its child in the match tree. */
    childMatchIdByRouteId: RouterReadableStore<Record<string, string>>
    /** Maps each pending routeId to true for quick lookup. */
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
    const ids = stores.matchesId.get()
    const obj: Record<string, string> = {}
    for (let i = 0; i < ids.length - 1; i++) {
      const parentStore = stores.matchStores.get(ids[i]!)
      if (parentStore?.routeId) {
        obj[parentStore.routeId] = ids[i + 1]!
      }
    }
    return obj
  })

  stores.pendingRouteIds = createReadonlyStore(() => {
    const ids = stores.pendingIds.get()
    const obj: Record<string, boolean> = {}
    for (const id of ids) {
      const store = stores.pendingMatchStores.get(id)
      if (store?.routeId) {
        obj[store.routeId] = true
      }
    }
    return obj
  })
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
    createMutableStore: createAtom as <TValue>(
      initialValue: TValue,
    ) => RouterWritableStore<TValue>,
    createReadonlyStore: createAtom as <TValue>(
      read: () => TValue,
    ) => RouterReadableStore<TValue>,
    batch,
    init: (stores) => initRouterStores(stores, createAtom),
  }
}
