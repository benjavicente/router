/**
 * Code to manage head content in Angular.
 * This code is not preaty, but id does what it needs to do.
 * Reads the router state and syncs the tags needed for the head and body.
 */

import { DOCUMENT } from '@angular/common'
import * as Angular from '@angular/core'
import type { AnyRouter, RouterManagedTag } from '@tanstack/router-core'

const HEAD_CONTENT_ROUTER_INJECTION_KEY = new Angular.InjectionToken<AnyRouter>(
  'HEAD_CONTENT_ROUTER',
)

const TSR_MANAGED_ATTR = 'data-tsr-managed'
const TSR_ID_ATTR = 'data-tsr-id'

type ManagedBucket = 'head' | 'body'
type ManagedTagId = string

type ManagedTag = Exclude<RouterManagedTag, { tag: 'title' }> & {
  id: ManagedTagId
}

type ManagedDocumentContent = {
  title?: string
  head: Array<ManagedTag>
  body: Array<ManagedTag>
}

type ManagedTagRecord = {
  id: ManagedTagId
  tag: ManagedTag
}

type RouteMetaEntry = {
  title?: string
  name?: string
  property?: string
  [key: string]: unknown
}

type ManagedTagCollection = {
  mount: (initialNodes?: Array<HTMLElement>) => void
  sync: (nextTags: Array<ManagedTag>) => void
  destroy: () => void
}

export function provideHeadContent(
  router: AnyRouter,
): Angular.EnvironmentProviders {
  return Angular.makeEnvironmentProviders([
    {
      provide: HEAD_CONTENT_ROUTER_INJECTION_KEY,
      useValue: router,
    },
    Angular.provideEnvironmentInitializer(() => {
      const manager = createHeadContentManager({
        router: Angular.inject(HEAD_CONTENT_ROUTER_INJECTION_KEY),
        document: Angular.inject(DOCUMENT),
        rendererFactory: Angular.inject(Angular.RendererFactory2, {
          optional: true,
        }),
        destroyRef: Angular.inject(Angular.DestroyRef),
      })

      manager.start()
    }),
  ])
}

export function buildManagedDocumentContent(
  router: AnyRouter,
): ManagedDocumentContent {
  const nonce = router.options.ssr?.nonce
  const state = router.__store.state
  const title = selectTitle(state.matches)
  const metaTags = selectMetaTags(state.matches, nonce)
  const links = selectConstructedLinks(state.matches, nonce)
  const manifestLinks = selectManifestLinks(router, state.matches, nonce)
  const preloadLinks = selectPreloadLinks(router, state.matches, nonce)
  const styles = selectStyles(state.matches, nonce)
  const headScripts = selectHeadScripts(state.matches, nonce)
  const routeScripts = selectRouteScripts(state.matches, nonce)
  const manifestScripts = selectManifestScripts(router, state.matches, nonce)
  const serverBufferedScript = selectServerBufferedScript(router)

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
    [
      serverBufferedScript,
      ...routeScripts,
      ...manifestScripts,
    ].flatMap((tag) => normalizeManagedTag(tag)),
  )

  return {
    title,
    head,
    body,
  }
}

function createHeadContentManager({
  router,
  document,
  rendererFactory,
  destroyRef,
}: {
  router: AnyRouter
  document: Document
  rendererFactory: Angular.RendererFactory2 | null
  destroyRef: Angular.DestroyRef
}) {
  const renderer = rendererFactory?.createRenderer(null, null) ?? null
  const initialTitle = document.title
  const headCollection = createManagedTagCollection({
    root: document.head,
    bucket: 'head',
    renderer,
  })
  const bodyCollection = document.body
    ? createManagedTagCollection({
        root: document.body,
        bucket: 'body',
        renderer,
      })
    : null

  return {
    start() {
      headCollection.mount()
      bodyCollection?.mount()

      let currentContent = buildManagedDocumentContent(router)
      applyManagedDocumentContent({
        document,
        initialTitle,
        headCollection,
        bodyCollection,
        nextContent: currentContent,
      })

      const unsubscribe = router.__store.subscribe(() => {
        const nextContent = buildManagedDocumentContent(router)
        if (areManagedDocumentContentsEqual(currentContent, nextContent)) {
          return
        }

        currentContent = nextContent
        applyManagedDocumentContent({
          document,
          initialTitle,
          headCollection,
          bodyCollection,
          nextContent,
        })
      })

      destroyRef.onDestroy(() => {
        unsubscribe()
        headCollection.destroy()
        bodyCollection?.destroy()
        document.title = initialTitle
      })
    },
  }
}

function applyManagedDocumentContent({
  document,
  initialTitle,
  headCollection,
  bodyCollection,
  nextContent,
}: {
  document: Document
  initialTitle: string
  headCollection: ManagedTagCollection
  bodyCollection: ManagedTagCollection | null
  nextContent: ManagedDocumentContent
}) {
  if (nextContent.title !== undefined) {
    document.title = nextContent.title
  } else {
    document.title = initialTitle
  }

  headCollection.sync(nextContent.head)
  bodyCollection?.sync(nextContent.body)
}

function createManagedTagCollection({
  root,
  bucket,
  renderer,
}: {
  root: HTMLElement
  bucket: ManagedBucket
  renderer: Angular.Renderer2 | null
}): ManagedTagCollection {
  const nodesById = new Map<ManagedTagId, HTMLElement>()
  const itemsById = new Map<ManagedTagId, ManagedTagRecord>()
  let orderedIds: Array<ManagedTagId> = []

  return {
    mount(initialNodes = adoptManagedNodes(root, bucket)) {
      nodesById.clear()
      itemsById.clear()
      orderedIds = []

      initialNodes.forEach((node) => {
        const id = node.getAttribute(TSR_ID_ATTR)
        if (!id) {
          return
        }

        nodesById.set(id, node)
        orderedIds.push(id)
      })
    },
    sync(nextTags) {
      const nextIds = nextTags.map((tag) => tag.id)

      if (areOrderedIdsEqual(orderedIds, nextIds)) {
        return
      }

      const nextItemsById = new Map<ManagedTagId, ManagedTagRecord>(
        nextTags.map((tag) => [tag.id, { id: tag.id, tag }]),
      )

      for (const id of orderedIds) {
        if (nextItemsById.has(id)) {
          continue
        }

        const node = nodesById.get(id)
        if (!node) {
          continue
        }

        removeNode(node, root, renderer)
        nodesById.delete(id)
        itemsById.delete(id)
      }

      let cursor: ChildNode | null = root.firstChild

      for (const tag of nextTags) {
        let node = nodesById.get(tag.id)

        if (!node) {
          node = createManagedNode(tag, bucket, root.ownerDocument, renderer)
          nodesById.set(tag.id, node)
        }

        if (node !== cursor) {
          insertNodeBefore(root, node, cursor, renderer)
        }

        itemsById.set(tag.id, {
          id: tag.id,
          tag,
        })
        cursor = node.nextSibling
      }

      orderedIds = nextIds
    },
    destroy() {
      nodesById.forEach((node) => {
        node.parentNode?.removeChild(node)
      })

      nodesById.clear()
      itemsById.clear()
      orderedIds = []
    },
  }
}

function adoptManagedNodes(
  root: HTMLElement,
  bucket: ManagedBucket,
) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(`[${TSR_MANAGED_ATTR}="${bucket}"]`),
  )
}

function createManagedNode(
  tag: ManagedTag,
  bucket: ManagedBucket,
  document: Document,
  renderer: Angular.Renderer2 | null,
) {
  const node = createElement(document, tag.tag, renderer)
  setAttribute(node, TSR_MANAGED_ATTR, bucket, renderer)
  setAttribute(node, TSR_ID_ATTR, tag.id, renderer)

  for (const [attrName, attrValue] of Object.entries(tag.attrs ?? {})) {
    if (attrName === 'suppressHydrationWarning') continue

    if (attrValue === undefined || attrValue === null || attrValue === false) {
      continue
    }

    const domAttrName = attrName === 'className' ? 'class' : attrName
    const domAttrValue =
      typeof attrValue === 'boolean' ? '' : String(attrValue)
    setAttribute(node, domAttrName, domAttrValue, renderer)
  }

  if ('children' in tag && typeof tag.children === 'string') {
    setTextContent(node, tag.children, renderer)
  }

  return node
}

function normalizeManagedTag(
  tag: RouterManagedTag | undefined,
): Array<ManagedTag> {
  if (!tag) {
    return []
  }

  if (tag.tag === 'title') {
    return []
  }

  if (tag.tag === 'script') {
    const src = tag.attrs?.src
    if (!src && typeof tag.children !== 'string') {
      return []
    }
  }

  const normalizedTag = {
    ...tag,
    attrs: normalizeAttrs(tag.attrs),
  } as Exclude<RouterManagedTag, { tag: 'title' }>

  return [
    {
      ...normalizedTag,
      id: hashManagedTag(normalizedTag),
    },
  ]
}

function normalizeAttrs(attrs?: Record<string, unknown>) {
  if (!attrs) {
    return {}
  }

  const normalized: Record<string, unknown> = {}

  for (const key of Object.keys(attrs).sort()) {
    const value = attrs[key]

    if (
      value === undefined ||
      value === null ||
      value === false ||
      key === 'suppressHydrationWarning'
    ) {
      continue
    }

    const attrName = key === 'className' ? 'class' : key
    normalized[attrName] = value
  }

  return normalized
}

function uniqManagedTags(tags: Array<ManagedTag>) {
  const seen = new Set<ManagedTagId>()

  return tags.filter((tag) => {
    if (seen.has(tag.id)) {
      return false
    }

    seen.add(tag.id)
    return true
  })
}

function createElement(
  document: Document,
  tagName: string,
  renderer: Angular.Renderer2 | null,
) {
  return renderer
    ? (renderer.createElement(tagName) as HTMLElement)
    : document.createElement(tagName)
}

function setAttribute(
  node: HTMLElement,
  name: string,
  value: string,
  renderer: Angular.Renderer2 | null,
) {
  if (renderer) {
    renderer.setAttribute(node, name, value)
    return
  }

  node.setAttribute(name, value)
}

function setTextContent(
  node: HTMLElement,
  value: string,
  renderer: Angular.Renderer2 | null,
) {
  if (renderer) {
    renderer.setProperty(node, 'textContent', value)
    return
  }

  node.textContent = value
}

function insertNodeBefore(
  root: HTMLElement,
  node: HTMLElement,
  before: ChildNode | null,
  renderer: Angular.Renderer2 | null,
) {
  if (node.parentNode === root && node.nextSibling === before) {
    return
  }

  if (renderer) {
    renderer.insertBefore(root, node, before)
    return
  }

  root.insertBefore(node, before)
}

function removeNode(
  node: HTMLElement,
  root: HTMLElement,
  renderer: Angular.Renderer2 | null,
) {
  if (renderer) {
    renderer.removeChild(root, node)
    return
  }

  root.removeChild(node)
}

function areManagedDocumentContentsEqual(
  prev: ManagedDocumentContent,
  next: ManagedDocumentContent,
) {
  return (
    prev.title === next.title &&
    areManagedTagArraysEqual(prev.head, next.head) &&
    areManagedTagArraysEqual(prev.body, next.body)
  )
}

function areManagedTagArraysEqual(
  prev: Array<ManagedTag>,
  next: Array<ManagedTag>,
) {
  if (prev.length !== next.length) {
    return false
  }

  for (let i = 0; i < prev.length; i++) {
    if (prev[i]?.id !== next[i]?.id) {
      return false
    }
  }

  return true
}

function areOrderedIdsEqual(
  prev: Array<ManagedTagId>,
  next: Array<ManagedTagId>,
) {
  if (prev.length !== next.length) {
    return false
  }

  for (let i = 0; i < prev.length; i++) {
    if (prev[i] !== next[i]) {
      return false
    }
  }

  return true
}

function hashManagedTag(
  tag: Exclude<RouterManagedTag, { tag: 'title' }>,
): ManagedTagId {
  const source = JSON.stringify(tag)
  let hash = 2166136261

  for (let i = 0; i < source.length; i++) {
    hash ^= source.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }

  return `tsr-${(hash >>> 0).toString(36)}`
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
      const meta = metas[j]
      if (!meta || meta.title) continue

      const attribute = meta.name ?? meta.property
      if (attribute) {
        if (metaByAttribute[attribute]) {
          continue
        }
        metaByAttribute[attribute] = true
      }

      metaTags.push({
        tag: 'meta',
        attrs: {
          ...meta,
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

function selectServerBufferedScript(router: AnyRouter) {
  return router.serverSsr?.takeBufferedScripts()
}

function selectRouteMeta(matches: Array<any>) {
  return matches.reduce<Array<Array<RouteMetaEntry>>>((acc, match) => {
    if (match.meta) {
      acc.push(match.meta as Array<RouteMetaEntry>)
    }
    return acc
  }, [])
}
