import * as React from 'react'
import type { AnyRouter } from '@benjavicente/router-core'

export const routerContext = React.createContext<AnyRouter>(null!)
