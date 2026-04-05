import { getStartContext } from '@benjavicente/start-storage-context'
import { createServerOnlyFn } from '@benjavicente/start-fn-stubs'

export const getStartContextServerOnly = createServerOnlyFn(getStartContext)
