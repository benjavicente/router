import { DOCUMENT } from '@angular/common'
import * as Angular from '@angular/core'
import { injectStore } from '../injectStore'
import { buildMatchManagedDocumentContent } from './build-match-managed-document'
import { TANSTACK_DOCUMENT_ROUTER } from './document-router-token'
import type { AnyRouter } from '@tanstack/router-core'

/** Sync `document.title` from the router (call from an injection context). */
export function installTanstackDocumentTitle(injectedRouter: AnyRouter) {
  const document = Angular.inject(DOCUMENT)
  const destroyRef = Angular.inject(Angular.DestroyRef)
  const activeMatches = injectStore(
    injectedRouter.stores.activeMatchesSnapshot,
    (matches) => matches,
  )

  const initialTitle = document.title
  let currentTitle: string | undefined = buildMatchManagedDocumentContent(
    injectedRouter,
  ).title

  const applyTitle = (next?: string) => {
    if (next !== undefined) {
      document.title = next
    } else {
      document.title = initialTitle
    }
  }

  applyTitle(currentTitle)

  const syncEffect = Angular.effect(() => {
    activeMatches()
    const nextTitle = buildMatchManagedDocumentContent(injectedRouter).title
    if (nextTitle === currentTitle) {
      return
    }
    currentTitle = nextTitle
    applyTitle(nextTitle)
  })

  destroyRef.onDestroy(() => {
    syncEffect.destroy()
    document.title = initialTitle
  })
}

export function tanstackDocumentTitleInitializer() {
  installTanstackDocumentTitle(Angular.inject(TANSTACK_DOCUMENT_ROUTER))
}

export function provideTanstackDocumentTitle(
  router: AnyRouter,
): Angular.EnvironmentProviders {
  return Angular.makeEnvironmentProviders([
    { provide: TANSTACK_DOCUMENT_ROUTER, useValue: router },
    Angular.provideEnvironmentInitializer(tanstackDocumentTitleInitializer),
  ])
}
