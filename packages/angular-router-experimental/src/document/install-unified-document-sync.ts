import { DOCUMENT } from '@angular/common'
import * as Angular from '@angular/core'
import { injectStore } from '../injectStore'
import { buildMatchManagedDocumentContent } from './build-match-managed-document'
import {
  collectDehydrationScriptManagedTags,
  mergeDehydrationPrefixIntoDocument,
} from './document-dehydration'
import { areManagedDocumentContentsEqual } from './document-equality'
import { createManagedTagCollection } from './managed-dom'
import type { AnyRouter } from '@tanstack/router-core'
import type { ManagedDocumentContent, ManagedTagCollection } from './managed-document-types'

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
  bodyCollection: ManagedTagCollection
  nextContent: ManagedDocumentContent
}) {
  if (nextContent.title !== undefined) {
    document.title = nextContent.title
  } else {
    document.title = initialTitle
  }

  headCollection.sync(nextContent.head)
  bodyCollection.sync(nextContent.body)
}

/**
 * One `activeMatches` subscription: title, head, and body stay in sync together.
 * Used by `provideTanstackDocument` when all features are enabled.
 */
export function installUnifiedTanstackDocumentSync(injectedRouter: AnyRouter) {
  const document = Angular.inject(DOCUMENT)
  const rendererFactory = Angular.inject(Angular.RendererFactory2, {
    optional: true,
  })
  const destroyRef = Angular.inject(Angular.DestroyRef)
  const activeMatches = injectStore(
    injectedRouter.stores.activeMatchesSnapshot,
    (matches) => matches,
  )

  const renderer = rendererFactory?.createRenderer(null, null) ?? null
  const initialTitle = document.title
  const headCollection = createManagedTagCollection({
    root: document.head,
    bucket: 'head',
    renderer,
  })
  const bodyCollection = createManagedTagCollection({
    root: document.body,
    bucket: 'body',
    renderer,
  })

  const dehydrationBodyPrefix =
    collectDehydrationScriptManagedTags(injectedRouter)

  const composeDocumentContent = (): ManagedDocumentContent =>
    mergeDehydrationPrefixIntoDocument(
      buildMatchManagedDocumentContent(injectedRouter),
      dehydrationBodyPrefix,
    )

  headCollection.mount()
  bodyCollection.mount()

  let currentContent = composeDocumentContent()
  applyManagedDocumentContent({
    document,
    initialTitle,
    headCollection,
    bodyCollection,
    nextContent: currentContent,
  })

  const syncEffect = Angular.effect(() => {
    activeMatches()
    const nextContent = composeDocumentContent()
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
    syncEffect.destroy()
    headCollection.destroy()
    bodyCollection.destroy()
    document.title = initialTitle
  })
}
