import { injectRouter } from './injectRouter'
import { injectStore } from './store/injectStore'

export function injectCanGoBack() {
  const router = injectRouter()

  return injectStore(
    router.stores.location,
    (location) => (location.state?.__TSR_index ?? 0) !== 0,
  )
}
