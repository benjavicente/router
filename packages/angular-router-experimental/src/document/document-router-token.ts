import * as Angular from '@angular/core'
import type { AnyRouter } from '@benjavicente/router-core'

export const TANSTACK_DOCUMENT_ROUTER = new Angular.InjectionToken<AnyRouter>(
  'TANSTACK_DOCUMENT_ROUTER',
)
