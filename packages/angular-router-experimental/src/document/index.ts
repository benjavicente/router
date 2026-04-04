export type { TanstackDocumentFeatures } from './provide-tanstack-document'
export {
  provideHeadContent,
  provideTanstackDocument,
} from './provide-tanstack-document'
export { provideTanstackDocumentTitle } from './provide-tanstack-document-title'
export { provideTanstackHeadManagedTags } from './provide-tanstack-head-managed-tags'
export { provideTanstackBodyManagedTags } from './provide-tanstack-body-managed-tags'
export {
  buildManagedDocumentContent,
  buildMatchManagedDocumentContent,
} from './build-match-managed-document'
export { TANSTACK_DOCUMENT_ROUTER } from './document-router-token'
export type {
  ManagedBucket,
  ManagedDocumentContent,
  ManagedTag,
  ManagedTagCollection,
  ManagedTagId,
  ManagedTagRecord,
  RouteMetaEntry,
} from './managed-document-types'
export { TSR_ID_ATTR, TSR_MANAGED_ATTR } from './managed-document-types'
export {
  createManagedTagCollection,
  hashManagedTag,
  normalizeManagedTag,
  uniqManagedTags,
} from './managed-dom'
export {
  collectDehydrationScriptManagedTags,
  mergeDehydrationPrefixIntoDocument,
} from './document-dehydration'
