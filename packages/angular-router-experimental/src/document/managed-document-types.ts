import type { RouterManagedTag } from '@benjavicente/router-core'

export const TSR_MANAGED_ATTR = 'data-tsr-managed'
export const TSR_ID_ATTR = 'data-tsr-id'

export type ManagedBucket = 'head' | 'body'
export type ManagedTagId = string

/** Route-driven tag with stable hash id for DOM reconciliation. */
export type ManagedTag = Exclude<RouterManagedTag, { tag: 'title' }> & {
  id: ManagedTagId
}

export type ManagedDocumentContent = {
  title?: string
  head: Array<ManagedTag>
  body: Array<ManagedTag>
}

export type ManagedTagRecord = {
  id: ManagedTagId
  tag: ManagedTag
}

export type ManagedTagCollection = {
  mount: (initialNodes?: Array<HTMLElement>) => void
  sync: (nextTags: Array<ManagedTag>) => void
  destroy: () => void
}

export type RouteMetaEntry = {
  title?: string
  name?: string
  property?: string
  [key: string]: unknown
}
