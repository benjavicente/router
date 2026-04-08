import { DOCUMENT } from '@angular/common'
import { EnvironmentInjector, afterNextRender, inject } from '@angular/core'
import { getScrollRestorationScriptForRouter } from '@benjavicente/router-core/scroll-restoration-script'
import { injectRouter } from './injectRouter'

const SSR_SCROLL_MARKER = 'data-tsr-scroll-restoration-inline'

/**
 * Injects the same inline scroll-restore script Solid/React emit on SSR
 * (`ScrollRestoration` + `ScriptOnce`), so hydration can align window scroll
 * with sessionStorage before the client router runs.
 */
export function injectSsrScrollRestorationScript(): void {
  const router = injectRouter()
  const doc = inject(DOCUMENT)
  const envInjector = inject(EnvironmentInjector)

  if (!router.isServer) {
    return
  }

  afterNextRender(() => {
      const enabled = router.options.scrollRestoration
      if (!enabled) return
      if (
        typeof enabled === 'function' &&
        !enabled({ location: router.latestLocation })
      ) {
        return
      }
      if (doc.querySelector(`script[${SSR_SCROLL_MARKER}]`)) {
        return
      }
      const script = getScrollRestorationScriptForRouter(router)
      if (!script) return
      const el = doc.createElement('script')
      el.setAttribute(SSR_SCROLL_MARKER, '')
      el.className = '$tsr'
      el.text = `${script};document.currentScript.remove()`
      const nonce = router.options.ssr?.nonce
      if (nonce) {
        el.setAttribute('nonce', nonce)
      }
      ;(doc.head ?? doc.body).appendChild(el)
    },
    { injector: envInjector },
  )
}
