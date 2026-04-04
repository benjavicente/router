import * as Angular from '@angular/core'
import { TANSTACK_DOCUMENT_ROUTER } from './document-router-token'
import { installUnifiedTanstackDocumentSync } from './install-unified-document-sync'
import { installTanstackBodyManagedTags } from './provide-tanstack-body-managed-tags'
import { installTanstackDocumentTitle } from './provide-tanstack-document-title'
import { installTanstackHeadManagedTags } from './provide-tanstack-head-managed-tags'
import type { AnyRouter } from '@tanstack/router-core'

export type TanstackDocumentFeatures = {
  /** Sync `document.title` from route meta (default: true). */
  title?: boolean
  /** Managed `<head>` tags from matches (default: true). */
  headTags?: boolean
  /** Managed `<body>` scripts: route/manifest scripts plus one SSR `takeBufferedScripts()` read (default: true). */
  bodyScripts?: boolean
}

const defaultFeatures: Required<TanstackDocumentFeatures> = {
  title: true,
  headTags: true,
  bodyScripts: true,
}

/**
 * Composes document sync from route matches. When title, head, and body are all
 * enabled, uses a single `activeMatches` effect (same churn as legacy
 * `provideHeadContent`). Partial feature sets use separate installers each with
 * their own effect.
 */
export function provideTanstackDocument(
  router: AnyRouter,
  features: TanstackDocumentFeatures = {},
): Angular.EnvironmentProviders {
  const f = { ...defaultFeatures, ...features }
  const allOn = f.title && f.headTags && f.bodyScripts

  return Angular.makeEnvironmentProviders([
    { provide: TANSTACK_DOCUMENT_ROUTER, useValue: router },
    Angular.provideEnvironmentInitializer(() => {
      if (allOn) {
        installUnifiedTanstackDocumentSync(router)
        return
      }
      if (f.title) {
        installTanstackDocumentTitle(router)
      }
      if (f.headTags) {
        installTanstackHeadManagedTags(router)
      }
      if (f.bodyScripts) {
        installTanstackBodyManagedTags(router)
      }
    }),
  ])
}

/** Same as `provideTanstackDocument(router)` (all features enabled). */
export function provideHeadContent(
  router: AnyRouter,
): Angular.EnvironmentProviders {
  return provideTanstackDocument(router)
}
