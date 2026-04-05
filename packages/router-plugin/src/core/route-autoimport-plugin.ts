import { generateFromAst, logDiff, parseAst } from '@benjavicente/router-utils'
import * as babel from '@babel/core'
import * as template from '@babel/template'
import { getConfig } from './config'
import { debug, normalizePath } from './utils'
import type { Config } from './config'
import type { UnpluginFactory } from 'unplugin'

/**
 * This plugin adds imports for createFileRoute and createLazyFileRoute to the file route.
 */
export const unpluginRouteAutoImportFactory: UnpluginFactory<
  Partial<Config | (() => Config)> | undefined
> = (options = {}) => {
  let ROOT: string = process.cwd()
  let userConfig: Config

  function initUserConfig() {
    if (typeof options === 'function') {
      userConfig = options()
    } else {
      userConfig = getConfig(options, ROOT)
    }
  }
  return {
    name: 'tanstack-router:autoimport',
    enforce: 'pre',

    transform: {
      filter: {
        // this is necessary for webpack / rspack to avoid matching .html files
        id: /\.(m|c)?(j|t)sx?$/,
        code: /createFileRoute\(|createLazyFileRoute\(/,
      },
      handler(code, id) {
        const normalizedId = normalizePath(id)
        if (!globalThis.TSR_ROUTES_BY_ID_MAP?.has(normalizedId)) {
          return null
        }
        let routeType: 'createFileRoute' | 'createLazyFileRoute'
        if (code.includes('createFileRoute(')) {
          routeType = 'createFileRoute'
        } else if (code.includes('createLazyFileRoute(')) {
          routeType = 'createLazyFileRoute'
        } else {
          return null
        }

        // Angular route files get `createFileRoute` imports from the generator; injecting
        // here as well can duplicate bindings (plugin order vs. code-splitter).
        if ((userConfig.target as string) === 'angular') {
          return null
        }

        const routerImportPath = `@benjavicente/${userConfig.target}-router`

        const ast = parseAst({ code })

        let isCreateRouteFunctionImported = false as boolean

        babel.traverse(ast, {
          Program(programPath) {
            programPath.traverse({
              ImportDeclaration(path) {
                const source = path.node.source.value
                for (const spec of path.node.specifiers ?? []) {
                  if (spec.type !== 'ImportSpecifier') continue
                  const importedName =
                    spec.imported.type === 'Identifier'
                      ? spec.imported.name
                      : null
                  if (importedName !== routeType) continue

                  if (source === routerImportPath) {
                    isCreateRouteFunctionImported = true
                  }
                }
              },
            })
          },
        })

        if (!isCreateRouteFunctionImported) {
          if (debug) console.info('Adding autoimports to route ', normalizedId)

          const autoImportStatement = template.statement(
            `import { ${routeType} } from '${routerImportPath}'`,
          )()
          ast.program.body.unshift(autoImportStatement)

          const result = generateFromAst(ast, {
            sourceMaps: true,
            filename: normalizedId,
            sourceFileName: normalizedId,
          })
          if (debug) {
            logDiff(code, result.code)
            console.log('Output:\n', result.code + '\n\n')
          }
          return result
        }

        return null
      },
    },

    vite: {
      configResolved(config) {
        ROOT = config.root
        initUserConfig()
      },
      // this check may only happen after config is resolved, so we use applyToEnvironment (apply is too early)
      applyToEnvironment() {
        return userConfig.verboseFileRoutes === false
      },
    },

    rspack() {
      ROOT = process.cwd()
      initUserConfig()
    },

    webpack() {
      ROOT = process.cwd()
      initUserConfig()
    },
  }
}
