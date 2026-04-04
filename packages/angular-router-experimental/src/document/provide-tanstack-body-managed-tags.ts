import { DOCUMENT } from '@angular/common'
import * as Angular from '@angular/core'
import { injectStore } from '../injectStore'
import { buildMatchManagedDocumentContent } from './build-match-managed-document'
import { collectDehydrationScriptManagedTags } from './document-dehydration'
import { areManagedTagArraysEqual } from './document-equality'
import { TANSTACK_DOCUMENT_ROUTER } from './document-router-token'
import { createManagedTagCollection, uniqManagedTags } from './managed-dom'
import type { AnyRouter } from '@tanstack/router-core'
import type { ManagedTag } from './managed-document-types'

/**
 * Managed body scripts from matches, with a single `takeBufferedScripts()` capture
 * on the server only (call from an injection context).
 */
export function installTanstackBodyManagedTags(injectedRouter: AnyRouter) {
  const document = Angular.inject(DOCUMENT)
  const rendererFactory = Angular.inject(Angular.RendererFactory2, {
    optional: true,
  })
  const destroyRef = Angular.inject(Angular.DestroyRef)
  const activeMatches = injectStore(
    injectedRouter.stores.activeMatchesSnapshot,
    (matches) => matches,
  )

  /** One read per bootstrap when `router.serverSsr` exists (SSR); otherwise empty. */
  const dehydrationBodyPrefix =
    collectDehydrationScriptManagedTags(injectedRouter)

  const composeBody = (): Array<ManagedTag> =>
    dehydrationBodyPrefix.length === 0
      ? buildMatchManagedDocumentContent(injectedRouter).body
      : uniqManagedTags([
          ...dehydrationBodyPrefix,
          ...buildMatchManagedDocumentContent(injectedRouter).body,
        ])

  const renderer = rendererFactory?.createRenderer(null, null) ?? null
  const bodyCollection = createManagedTagCollection({
    root: document.body,
    bucket: 'body',
    renderer,
  })

  bodyCollection.mount()

  let currentBody: Array<ManagedTag> = composeBody()
  bodyCollection.sync(currentBody)

  const syncEffect = Angular.effect(() => {
    activeMatches()
    const nextBody = composeBody()
    if (areManagedTagArraysEqual(currentBody, nextBody)) {
      return
    }
    currentBody = nextBody
    bodyCollection.sync(nextBody)
  })

  destroyRef.onDestroy(() => {
    syncEffect.destroy()
    bodyCollection.destroy()
  })
}

export function tanstackBodyManagedTagsInitializer() {
  installTanstackBodyManagedTags(Angular.inject(TANSTACK_DOCUMENT_ROUTER))
}

export function provideTanstackBodyManagedTags(
  router: AnyRouter,
): Angular.EnvironmentProviders {
  return Angular.makeEnvironmentProviders([
    { provide: TANSTACK_DOCUMENT_ROUTER, useValue: router },
    Angular.provideEnvironmentInitializer(tanstackBodyManagedTagsInitializer),
  ])
}
