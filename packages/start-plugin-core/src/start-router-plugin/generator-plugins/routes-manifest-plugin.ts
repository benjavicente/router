import { rootRouteId } from '@benjavicente/router-core'

import type { GeneratorPlugin } from '@benjavicente/router-generator'

/**
 * this plugin builds the routes manifest and stores it on globalThis
 * so that it can be accessed later (e.g. from a vite plugin)
 */
export function routesManifestPlugin(): GeneratorPlugin {
  return {
    name: 'routes-manifest-plugin',
    onRouteTreeChanged: ({ routeTree, rootRouteNode, routeNodes, acc }) => {
      const getFilePaths = (routePath: string | undefined, fallbackPath: string) => {
        if (!routePath) {
          return [fallbackPath]
        }

        const routePieces = acc.routePiecesByPath[routePath]
        const pieceFilePaths = Object.values(routePieces ?? {})
          .filter(Boolean)
          .map((piece) => piece.fullPath)

        return [...new Set([fallbackPath, ...pieceFilePaths])]
      }

      const allChildren = routeTree.map((d) => d.routePath)
      const routes: Record<
        string,
        {
          filePath: string
          filePaths: Array<string>
          children: Array<string>
        }
      > = {
        [rootRouteId]: {
          filePath: rootRouteNode.fullPath,
          filePaths: getFilePaths(rootRouteId, rootRouteNode.fullPath),
          children: allChildren,
        },
        ...Object.fromEntries(
          routeNodes.map((d) => {
            const filePathId = d.routePath

            return [
              filePathId,
              {
                filePath: d.fullPath,
                filePaths: getFilePaths(d.routePath, d.fullPath),
                children: d.children?.map((childRoute) => childRoute.routePath),
              },
            ]
          }),
        ),
      }

      globalThis.TSS_ROUTES_MANIFEST = routes
    },
  }
}
