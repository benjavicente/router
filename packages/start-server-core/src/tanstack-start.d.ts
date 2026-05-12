declare module 'tanstack-start-manifest:v' {
  import type { Manifest } from '@benjavicente/router-core'

  export const tsrStartManifest: () => Manifest & { clientEntry: string }
}

declare module 'tanstack-start-route-tree:v' {
  import type { AnyRoute } from '@benjavicente/router-core'

  export const routeTree: AnyRoute | undefined
}

declare module '#tanstack-start-server-fn-resolver' {
  export type ServerFnLookupAccess = { origin: 'client' } | { origin: 'server' }

  export type ServerFn = ((...args: Array<any>) => Promise<any>) & {
    method?: 'GET' | 'POST'
  }
  export function getServerFnById(
    id: string,
    access: ServerFnLookupAccess,
  ): Promise<ServerFn>
}

declare module '#tanstack-start-plugin-adapters' {
  import type { AnySerializationAdapter } from '@benjavicente/router-core'

  export const pluginSerializationAdapters: Array<AnySerializationAdapter>
  export const hasPluginAdapters: boolean
}

declare module 'tanstack-start-injected-head-scripts:v' {
  export const injectedHeadScripts: string | undefined
}
