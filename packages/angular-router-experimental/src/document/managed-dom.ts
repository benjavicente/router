import {
  
  
  
  
  
  TSR_ID_ATTR,
  TSR_MANAGED_ATTR
} from './managed-document-types'
import type {ManagedBucket, ManagedTag, ManagedTagCollection, ManagedTagId, ManagedTagRecord} from './managed-document-types';
import type * as Angular from '@angular/core'
import type { RouterManagedTag } from '@benjavicente/router-core'

export function normalizeManagedTag(
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

export function uniqManagedTags(tags: Array<ManagedTag>) {
  const seen = new Set<ManagedTagId>()

  return tags.filter((tag) => {
    if (seen.has(tag.id)) {
      return false
    }

    seen.add(tag.id)
    return true
  })
}

export function hashManagedTag(
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

export function createManagedTagCollection({
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

function adoptManagedNodes(root: HTMLElement, bucket: ManagedBucket) {
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
