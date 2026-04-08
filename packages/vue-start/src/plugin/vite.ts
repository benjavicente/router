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
      name: 'tanstack-vue-start:config',
      configEnvironment(environmentName, options) {
        return {
          optimizeDeps:
            environmentName === VITE_ENVIRONMENT_NAMES.client ||
            (environmentName === VITE_ENVIRONMENT_NAMES.server &&
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
    TanStackStartVitePluginCore(
      {
        framework: 'vue',
        defaultEntryPaths,
      },
      options,
    ),
  ]
}
