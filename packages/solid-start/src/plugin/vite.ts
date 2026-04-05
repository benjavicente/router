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
  client: path.resolve(defaultEntryDir, 'client.tsx'),
  server: path.resolve(defaultEntryDir, 'server.ts'),
  start: path.resolve(defaultEntryDir, 'start.ts'),
}

export function tanstackStart(
  options?: TanStackStartInputConfig,
): Array<PluginOption> {
  return [
    {
      name: 'tanstack-solid-start:config',
      configEnvironment(environmentName, options) {
        return {
          optimizeDeps:
            environmentName === VITE_ENVIRONMENT_NAMES.client ||
            (environmentName === VITE_ENVIRONMENT_NAMES.server &&
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
    TanStackStartVitePluginCore(
      {
        framework: 'solid',
        defaultEntryPaths,
      },
      options,
    ),
  ]
}
