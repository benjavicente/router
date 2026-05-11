import {
  START_ENVIRONMENT_NAMES,
  tanStackStartVite,
} from '@benjavicente/start-plugin-core/vite'
import type {
  TanStackStartViteInputConfig,
  TanStackStartVitePluginCoreOptions,
} from '@benjavicente/start-plugin-core/vite'
import { vueStartDefaultEntryPaths } from './shared'
import type { PluginOption } from 'vite'

export function tanstackStart(
  options?: TanStackStartViteInputConfig,
): Array<PluginOption> {
  const corePluginOpts: TanStackStartVitePluginCoreOptions = {
    framework: 'vue',
    defaultEntryPaths: vueStartDefaultEntryPaths,
    providerEnvironmentName: START_ENVIRONMENT_NAMES.server,
    ssrIsProvider: true,
    ssrResolverStrategy: {
      type: 'default',
    },
  }

  return [
    {
      name: 'tanstack-vue-start:config',
      configEnvironment(environmentName, options) {
        return {
          optimizeDeps:
            environmentName === START_ENVIRONMENT_NAMES.client ||
            (environmentName === START_ENVIRONMENT_NAMES.server &&
              // This indicates that the server environment has opted in to dependency optimization
              options.optimizeDeps?.noDiscovery === false)
              ? {
                  // As `@benjavicente/vue-start` depends on `@benjavicente/vue-router`, we should exclude both.
                  exclude: [
                    '@benjavicente/vue-start',
                    '@benjavicente/vue-router',
                    '@benjavicente/start-static-server-functions',
                  ],
                }
              : undefined,
        }
      },
    },
    tanStackStartVite(corePluginOpts, options),
  ]
}
