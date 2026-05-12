import { fileURLToPath } from 'node:url'
import {
  START_ENVIRONMENT_NAMES,
  tanStackStartVite,
} from '@benjavicente/start-plugin-core/vite'
import path from 'pathe'
import type {
  TanStackStartViteInputConfig,
  TanStackStartVitePluginCoreOptions,
} from '@benjavicente/start-plugin-core/vite'
import type { PluginOption } from 'vite'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const defaultEntryDir = path.resolve(
  currentDir,
  '..',
  '..',
  'plugin',
  'default-entry',
)
const defaultEntryPaths = {
  client: path.resolve(defaultEntryDir, 'client.ts'),
  server: path.resolve(defaultEntryDir, 'server.ts'),
  start: path.resolve(defaultEntryDir, 'start.ts'),
}

export function tanstackStart(
  options?: TanStackStartViteInputConfig,
): Array<PluginOption> {
  const corePluginOpts: TanStackStartVitePluginCoreOptions = {
    framework: 'angular',
    defaultEntryPaths,
    providerEnvironmentName: START_ENVIRONMENT_NAMES.server,
    ssrIsProvider: true,
    ssrResolverStrategy: {
      type: 'default',
    },
  }

  return [
    {
      name: 'tanstack-angular-start-experimental:config',
      configEnvironment(environmentName, options) {
        return {
          optimizeDeps:
            environmentName === START_ENVIRONMENT_NAMES.client ||
            (environmentName === START_ENVIRONMENT_NAMES.server &&
              options.optimizeDeps?.noDiscovery === false)
              ? {
                  exclude: [
                    '@benjavicente/angular-start-experimental',
                    '@benjavicente/angular-router-experimental',
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
