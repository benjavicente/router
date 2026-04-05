import { escapeHtml } from '@benjavicente/router-core'
import {
  collectDehydrationScriptManagedTags,
  mergeDehydrationPrefixIntoDocument,
} from './document-dehydration'
import { normalizeManagedTag, uniqManagedTags } from './managed-dom'
import type { AnyRouter, RouterManagedTag } from '@benjavicente/router-core'
import type { ManagedDocumentContent, RouteMetaEntry } from './managed-document-types'

/**
 * Document content from the current route tree only (meta, links, route body scripts, etc.).
 * Does not call `takeBufferedScripts` — mirrors the route-derived arrays passed into
 * `renderScripts` before the server-buffered script is unshifted in React/Solid/Vue.
 */
export function buildMatchManagedDocumentContent(
  router: AnyRouter,
): ManagedDocumentContent {
  const nonce = router.options.ssr?.nonce
  const matches = router.stores.activeMatchesSnapshot.state
  const title = selectTitle(matches)
  const metaTags = selectMetaTags(matches, nonce)
  const links = selectConstructedLinks(matches, nonce)
  const manifestLinks = selectManifestLinks(router, matches, nonce)
  const preloadLinks = selectPreloadLinks(router, matches, nonce)
  const styles = selectStyles(matches, nonce)
  const headScripts = selectHeadScripts(matches, nonce)
  const routeScripts = selectRouteScripts(matches, nonce)
  const manifestScripts = selectManifestScripts(router, matches, nonce)

  const head = uniqManagedTags(
    [
      ...metaTags,
      ...preloadLinks,
      ...links,
      ...manifestLinks,
      ...styles,
      ...headScripts,
    ].flatMap((tag) => normalizeManagedTag(tag)),
  )

  const body = uniqManagedTags(
    [...routeScripts, ...manifestScripts].flatMap((tag) =>
      normalizeManagedTag(tag),
    ),
  )

  return {
    title,
    head,
    body,
  }
}

/**
 * Full managed document for a single snapshot: match-derived tags plus one
 * `takeBufferedScripts()` read (for tests and tooling). Prefer composing
 * `buildMatchManagedDocumentContent` + a one-time dehydration prefix in SSR, as
 * the body managed-tags provider does.
 */
export function buildManagedDocumentContent(
  router: AnyRouter,
): ManagedDocumentContent {
  return mergeDehydrationPrefixIntoDocument(
    buildMatchManagedDocumentContent(router),
    collectDehydrationScriptManagedTags(router),
  )
}

function selectTitle(matches: Array<any>) {
  const routeMeta = selectRouteMeta(matches)

  for (let i = routeMeta.length - 1; i >= 0; i--) {
    const metas = routeMeta[i]!
    for (let j = metas.length - 1; j >= 0; j--) {
      const meta = metas[j]
      if (meta?.title) {
        return meta.title
      }
    }
  }

  return undefined
}

function selectMetaTags(
  matches: Array<any>,
  nonce: string | undefined,
) {
  const routeMeta = selectRouteMeta(matches)
  const metaTags: Array<RouterManagedTag> = []
  const metaByAttribute: Record<string, true> = {}

  for (let i = routeMeta.length - 1; i >= 0; i--) {
    const metas = routeMeta[i]!
    for (let j = metas.length - 1; j >= 0; j--) {
      const m = metas[j]
      if (!m || m.title) continue

      if ('script:ld+json' in m && m['script:ld+json'] !== undefined) {
        try {
          const json = JSON.stringify(m['script:ld+json'])
          metaTags.push({
            tag: 'script',
            attrs: {
              type: 'application/ld+json',
              nonce,
            },
            children: escapeHtml(json),
          })
        } catch {
          // Skip invalid JSON-LD objects
        }
        continue
      }

      const attribute = m.name ?? m.property
      if (attribute) {
        if (metaByAttribute[attribute]) {
          continue
        }
        metaByAttribute[attribute] = true
      }

      metaTags.push({
        tag: 'meta',
        attrs: {
          ...m,
          nonce,
        },
      })
    }
  }

  if (nonce) {
    metaTags.push({
      tag: 'meta',
      attrs: {
        property: 'csp-nonce',
        content: nonce,
      },
    })
  }

  metaTags.reverse()

  return metaTags
}

function selectConstructedLinks(
  matches: Array<any>,
  nonce: string | undefined,
) {
  return matches
    .map((match) => match.links!)
    .filter(Boolean)
    .flat(1)
    .map(
      (link) =>
        ({
          tag: 'link',
          attrs: {
            ...link,
            nonce,
          },
        }) satisfies RouterManagedTag,
    )
}

function selectManifestLinks(
  router: AnyRouter,
  matches: Array<any>,
  nonce: string | undefined,
) {
  return matches
    .map((match) => router.ssr?.manifest?.routes[match.routeId]?.assets ?? [])
    .filter(Boolean)
    .flat(1)
    .filter((asset) => asset.tag === 'link')
    .map(
      (asset) =>
        ({
          tag: 'link',
          attrs: {
            ...asset.attrs,
            suppressHydrationWarning: true,
            nonce,
          },
        }) satisfies RouterManagedTag,
    )
}

function selectPreloadLinks(
  router: AnyRouter,
  matches: Array<any>,
  nonce: string | undefined,
) {
  const preloadLinks: Array<RouterManagedTag> = []

  matches
    .map((match) => router.looseRoutesById[match.routeId]!)
    .forEach((route) =>
      router.ssr?.manifest?.routes[route.id]?.preloads
        ?.filter(Boolean)
        .forEach((preload) => {
          preloadLinks.push({
            tag: 'link',
            attrs: {
              rel: 'modulepreload',
              href: preload,
              nonce,
            },
          })
        }),
    )

  return preloadLinks
}

function selectStyles(
  matches: Array<any>,
  nonce: string | undefined,
) {
  return (
    matches
      .map((match) => match.styles!)
      .flat(1)
      .filter(Boolean) as Array<Record<string, unknown>>
  ).map(({ children, ...attrs }) => ({
    tag: 'style',
    attrs: {
      ...attrs,
      nonce,
    },
    children: typeof children === 'string' ? children : undefined,
  })) satisfies Array<RouterManagedTag>
}

function selectHeadScripts(
  matches: Array<any>,
  nonce: string | undefined,
) {
  return (
    matches
      .map((match) => match.headScripts!)
      .flat(1)
      .filter(Boolean) as Array<Record<string, unknown>>
  ).map(({ children, ...script }) => ({
    tag: 'script',
    attrs: {
      ...script,
      nonce,
    },
    children: typeof children === 'string' ? children : undefined,
  })) satisfies Array<RouterManagedTag>
}

function selectRouteScripts(
  matches: Array<any>,
  nonce: string | undefined,
) {
  return (
    matches
      .map((match) => match.scripts!)
      .flat(1)
      .filter(Boolean) as Array<Record<string, unknown>>
  ).map(({ children, ...script }) => ({
    tag: 'script',
    attrs: {
      ...script,
      suppressHydrationWarning: true,
      nonce,
    },
    children: typeof children === 'string' ? children : undefined,
  })) satisfies Array<RouterManagedTag>
}

function selectManifestScripts(
  router: AnyRouter,
  matches: Array<any>,
  nonce: string | undefined,
) {
  return matches
    .map((match) => router.looseRoutesById[match.routeId]!)
    .flatMap((route) =>
      router.ssr?.manifest?.routes[route.id]?.assets
        ?.filter((asset) => asset.tag === 'script')
        .map(
          (asset) =>
            ({
              tag: 'script',
              attrs: {
                ...asset.attrs,
                nonce,
              },
              children: asset.children,
            }) satisfies RouterManagedTag,
        ) ?? [],
    )
}

function selectRouteMeta(matches: Array<any>) {
  return matches.reduce<Array<Array<RouteMetaEntry>>>((acc, match) => {
    if (match.meta) {
      acc.push(match.meta as Array<RouteMetaEntry>)
    }
    return acc
  }, [])
}
