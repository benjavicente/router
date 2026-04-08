import { fileURLToPath } from 'node:url'
import {
  TanStackStartVitePluginCore,
  VITE_ENVIRONMENT_NAMES,
} from '@benjavicente/start-plugin-core'
import path from 'pathe'
import type { TanStackStartInputConfig } from '@benjavicente/start-plugin-core'
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
  options?: TanStackStartInputConfig,
): Array<PluginOption> {
  return [
    {
      name: 'tanstack-angular-start-experimental:config',
      configEnvironment(environmentName, options) {
        return {
          optimizeDeps:
            environmentName === VITE_ENVIRONMENT_NAMES.client ||
            (environmentName === VITE_ENVIRONMENT_NAMES.server &&
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
    TanStackStartVitePluginCore(
      {
        framework: 'angular',
        defaultEntryPaths,
      },
      options,
    ),
  ]
}
