import * as Solid from 'solid-js'
import type { AnyRouter } from '@benjavicente/router-core'

export const routerContext = Solid.createContext<AnyRouter>(
  null as unknown as AnyRouter,
)
