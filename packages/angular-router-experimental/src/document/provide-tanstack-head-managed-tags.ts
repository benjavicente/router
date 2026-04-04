import { DOCUMENT } from '@angular/common'
import * as Angular from '@angular/core'
import { injectStore } from '../injectStore'
import { buildMatchManagedDocumentContent } from './build-match-managed-document'
import { areManagedTagArraysEqual } from './document-equality'
import { TANSTACK_DOCUMENT_ROUTER } from './document-router-token'
import { createManagedTagCollection } from './managed-dom'
import type { AnyRouter } from '@tanstack/router-core'
import type { ManagedTag } from './managed-document-types'

/** Managed `<head>` tags from active matches (call from an injection context). */
export function installTanstackHeadManagedTags(injectedRouter: AnyRouter) {
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
  const headCollection = createManagedTagCollection({
    root: document.head,
    bucket: 'head',
    renderer,
  })

  headCollection.mount()

  let currentHead: Array<ManagedTag> =
    buildMatchManagedDocumentContent(injectedRouter).head
  headCollection.sync(currentHead)

  const syncEffect = Angular.effect(() => {
    activeMatches()
    const nextHead = buildMatchManagedDocumentContent(injectedRouter).head
    if (areManagedTagArraysEqual(currentHead, nextHead)) {
      return
    }
    currentHead = nextHead
    headCollection.sync(nextHead)
  })

  destroyRef.onDestroy(() => {
    syncEffect.destroy()
    headCollection.destroy()
  })
}

export function tanstackHeadManagedTagsInitializer() {
  installTanstackHeadManagedTags(Angular.inject(TANSTACK_DOCUMENT_ROUTER))
}

export function provideTanstackHeadManagedTags(
  router: AnyRouter,
): Angular.EnvironmentProviders {
  return Angular.makeEnvironmentProviders([
    { provide: TANSTACK_DOCUMENT_ROUTER, useValue: router },
    Angular.provideEnvironmentInitializer(tanstackHeadManagedTagsInitializer),
  ])
}
