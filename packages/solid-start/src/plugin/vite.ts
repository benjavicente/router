import {
  START_ENVIRONMENT_NAMES,
  tanStackStartVite,
} from '@benjavicente/start-plugin-core/vite'
import type {
  TanStackStartViteInputConfig,
  TanStackStartVitePluginCoreOptions,
} from '@benjavicente/start-plugin-core/vite'
import { solidStartDefaultEntryPaths } from './shared'
import type { PluginOption } from 'vite'

export function tanstackStart(
  options?: TanStackStartViteInputConfig,
): Array<PluginOption> {
  const corePluginOpts: TanStackStartVitePluginCoreOptions = {
    framework: 'solid',
    defaultEntryPaths: solidStartDefaultEntryPaths,
    providerEnvironmentName: START_ENVIRONMENT_NAMES.server,
    ssrIsProvider: true,
    ssrResolverStrategy: {
      type: 'default',
    },
  }

  return [
    {
      name: 'tanstack-solid-start:config',
      config() {
        return {
          ssr: {
            noExternal: [
              '@benjavicente/solid-router-ssr-query',
              '@tanstack/solid-query',
              '@tanstack/solid-query-devtools',
            ],
          },
        }
      },
      configEnvironment(environmentName, options) {
        return {
          optimizeDeps:
            environmentName === START_ENVIRONMENT_NAMES.client ||
            (environmentName === START_ENVIRONMENT_NAMES.server &&
              // This indicates that the server environment has opted in to dependency optimization
              options.optimizeDeps?.noDiscovery === false)
              ? {
                  // As `@benjavicente/solid-start` depends on `@benjavicente/solid-router`, we should exclude both.
                  exclude: [
                    '@benjavicente/solid-start',
                    '@benjavicente/solid-router',
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
