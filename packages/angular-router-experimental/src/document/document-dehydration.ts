import { normalizeManagedTag, uniqManagedTags } from './managed-dom'
import type { AnyRouter } from '@tanstack/router-core'
import type { ManagedDocumentContent, ManagedTag  } from './managed-document-types'

export function collectDehydrationScriptManagedTags(
  router: AnyRouter,
): Array<ManagedTag> {
  return router.serverSsr
    ? uniqManagedTags(
        normalizeManagedTag(router.serverSsr.takeBufferedScripts()),
      )
    : []
}

export function mergeDehydrationPrefixIntoDocument(
  matchContent: ManagedDocumentContent,
  dehydrationPrefix: Array<ManagedTag>,
): ManagedDocumentContent {
  if (dehydrationPrefix.length === 0) {
    return matchContent
  }

  return {
    ...matchContent,
    body: uniqManagedTags([...dehydrationPrefix, ...matchContent.body]),
  }
}
