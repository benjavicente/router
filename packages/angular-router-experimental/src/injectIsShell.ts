import { computed } from '@angular/core'
import { injectRouter } from './injectRouter'

export function injectIsShell() {
  const router = injectRouter()
  return computed(() => router.isShell())
}
